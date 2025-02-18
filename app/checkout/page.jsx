"use client"

import { useSession } from 'next-auth/react';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { setCart } from '@/ redux/cartSlice';
import CustomAlert from '@/ components/CustomAlert'
import axios from 'axios';

const CheckoutPage = (values) => {
  const [alert, setAlert] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();
  const {data : session} = useSession();
  const userId = session?.user?.id;

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    city:'',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  
  // getting cart details from DB
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!session?.user?.id) return;
  
        const response = await axios.get("/api/cart", {
          params: { uid: session.user.id },
        });
    
        const cartData = response.data;

        const products = cartData.products;

        dispatch(setCart(products));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();
  }, [session?.user?.id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Checkout details:", customerDetails);
  

    try {
      const response = await axios.post("/api/order", {customerDetails, totalPrice, cartItems, userId}, {
        headers: { "Content-Type": "application/json" },
      });

      console.log("order details : cart items : ",cartItems)
  
      console.log("Order created successfully:", response.data);
      window.alert("Order placed successfully!");
    } catch (error) {
      console.error("Error creating order:", error.response?.data || error);
      window.alert("Error creating order. Check the console for details.");
    }
  };
  

  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-2xl p-6 flex gap-8">

        {/* Order Summary */}
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-gray-100 mb-6">🛍️ Order Summary</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-600 dark:text-gray-300 text-lg">Your cart is empty.</p>
          ) : (
            <div>
              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {cartItems.map((item, index) => (
                  <li key={index} className="flex justify-between items-center py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">{item.name}</h2>
                        <p className="text-gray-600 dark:text-gray-300">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {totalPrice > 0 && (
                <div className="mt-6 border-t pt-4 text-right">
                  <p className="text-lg font-medium text-gray-800 dark:text-gray-300">Total Quantity: {totalQuantity}</p>
                  <p className="text-xl font-bold text-gray-800 dark:text-gray-100">Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Checkout Form */}
        <div className="w-96 flex-1">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-100 mb-6">Checkout</h2>
          <form onSubmit={handleSubmit}>
            {/* Full Name */}
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 dark:text-gray-300 font-medium">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerDetails.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            {/* City Dropdown */}
            <div className="mb-4">
              <label htmlFor="city" className='block text-gray-700 dark:text-gray-300 font-medium'>City</label>
              <select 
                id="city" 
                name="city" 
                onChange={handleChange}
                value={customerDetails.city}
                required
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="">Select</option>
                <option value="Surat">Surat</option>
                <option value="Jamnagar">Jamnagar</option>
                <option value="Gandhinagar">Gandhinagar</option>
                <option value="Vadodara">Vadodara</option>
              </select>
            </div>

            {/* Address */}
            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 dark:text-gray-300 font-medium">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={customerDetails.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            {/* Payment Details */}
            <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-100 mb-4">Payment Details</h3>

            {/* Card Number */}
            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 dark:text-gray-300 font-medium">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={customerDetails.cardNumber}
                onChange={handleChange}
                required
                placeholder="Enter your card number"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            {/* Card Expiry */}
            <div className="mb-4">
              <label htmlFor="cardExpiry" className="block text-gray-700 dark:text-gray-300 font-medium">Card Expiry Date:</label>
              <input
                type="text"
                id="cardExpiry"
                name="cardExpiry"
                value={customerDetails.cardExpiry}
                onChange={handleChange}
                required
                placeholder="MM/YY"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            {/* Card CVV */}
            <div className="mb-6">
              <label htmlFor="cardCVV" className="block text-gray-700 dark:text-gray-300 font-medium">CVV:</label>
              <input
                type="text"
                id="cardCVV"
                name="cardCVV"
                value={customerDetails.cardCVV}
                onChange={handleChange}
                required
                placeholder="Enter CVV"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-700 dark:text-gray-100"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setAlert({ message: "Order placed successfully!", type: "success" })}
            >
              Proceed to Payment
            </button>
          </form>

          {/* Alert */}
          {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </div>

      </div>
    </div>


  );
};

export default CheckoutPage;
