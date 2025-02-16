"use client"
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import CustomAlert from '../../components/CustomAlert'

const CheckoutPage = (values) => {
  const [alert, setAlert] = useState(null);
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);

  const [customerDetails, setCustomerDetails] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVV: '',
  });

  
  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerDetails({ ...customerDetails, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Checkout details:', customerDetails);
  };

  
  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-6 flex gap-8">

        <div className="flex-1">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">🛍️ Order Summary</h1>

          {cartItems.length === 0 ? (
            <p className="text-gray-600 text-lg">Your cart is empty.</p>
          ) : (
            <div>
              <ul className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <li key={item.id} className="flex justify-between items-center py-4">
                    <div className="flex items-center gap-4">
                      <img src={item.image} alt={item.name} className="w-16 h-16 rounded-lg object-cover" />
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">{item.name}</h2>
                        <p className="text-gray-600">${item.price} x {item.quantity}</p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              {totalPrice > 0 && (
                <div className="mt-6 border-t pt-4 text-right">
                  <p className="text-lg font-medium">Total Quantity: {totalQuantity}</p>
                  <p className="text-xl font-bold text-gray-800">Total Price: ${totalPrice.toFixed(2)}</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="w-96 flex-1">
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Checkout</h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 font-medium">Full Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={customerDetails.name}
                onChange={handleChange}
                required
                placeholder="Enter your full name"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={customerDetails.email}
                onChange={handleChange}
                required
                placeholder="Enter your email address"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            
            <div className="mb-4">
              <label htmlFor="city" className='block text-gray-700 font-medium'>City</label>
              <select 
                type="select" 
                id="city" 
                name="city" 
                onChange={values.handleChange}
                required
                style={{
                            width:"100%", 
                            padding:"0.75rem", 
                            marginTop:"0.5rem", 
                            border:"1px solid #d1d5db", 
                            borderRadius:"0.375rem",
                            boxShadow:"0 1px 2px rgba(0,0,0,0,0.5)",
                            outline:"none",
                        }}>
                
                
                <option value="">Select</option>
                <option value="surat">surat</option>
                <option value="amdavad">amdavasd</option>
                <option value="gandhinagar">gandhinagar</option>
            </select>
            </div>


            <div className="mb-4">
              <label htmlFor="address" className="block text-gray-700 font-medium">Address:</label>
              <input
                type="text"
                id="address"
                name="address"
                value={customerDetails.address}
                onChange={handleChange}
                required
                placeholder="Enter your address"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <h3 className="text-xl font-semibold text-gray-800 mb-4">Payment Details</h3>

            <div className="mb-4">
              <label htmlFor="cardNumber" className="block text-gray-700 font-medium">Card Number:</label>
              <input
                type="text"
                id="cardNumber"
                name="cardNumber"
                value={customerDetails.cardNumber}
                onChange={handleChange}
                required
                placeholder="Enter your card number"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-4">
              <label htmlFor="cardExpiry" className="block text-gray-700 font-medium">Card Expiry Date:</label>
              <input
                type="text"
                id="cardExpiry"
                name="cardExpiry"
                value={customerDetails.cardExpiry}
                onChange={handleChange}
                required
                placeholder="MM/YY"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="mb-6">
              <label htmlFor="cardCVV" className="block text-gray-700 font-medium">CVV:</label>
              <input
                type="text"
                id="cardCVV"
                name="cardCVV"
                value={customerDetails.cardCVV}
                onChange={handleChange}
                required
                placeholder="Enter CVV"
                className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onClick={() => setAlert({ message: "Order placed successfully!", type: "success" })}
            >
              Proceed to Payment
            </button>
          </form>
          {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
        </div>
      </div>
    </div>

  );
};

export default CheckoutPage;
