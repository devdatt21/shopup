"use client";

import { useSession } from "next-auth/react";
import { useSelector } from "react-redux";
import { addToCart, decreaseQuantity,setCart } from "../../redux/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import axios from "axios";
import { debounce} from "lodash";

const cartPage = () => {
  const {data : session} = useSession();
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const totalQuantity = useSelector((state) => state.cart.totalQuantity);
  const dispatch = useDispatch();

  // getting cart details from DB
  useEffect(() => {
    const fetchCart = async () => {
      try {
        if (!session?.user?.id) return;
  
        const response = await axios.get("/api/cart", {
          params: { uid: session.user.id },
        });
  
        console.log("Cart API Response:", response.data); 
  
        const cartData = response.data;
  
        const products = cartData.products;
        console.log("Cart Products :", products); 

        dispatch(setCart(products));
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
  
    fetchCart();
  }, [session?.user?.id]);

  
  const updateCart = debounce(async () => {
      if(session?.user?.id && cartItems.length>0)
      {
        try {
          await axios.post("/api/cart",
            {
              userId:session.user.id,
              cartItems,
            },
            
          )

          console.log("cart gone to server");

        } catch (error) {
          console.log("error in cart sending to server",error);
        }
      }
      else
      {
        console.warn("user not logged in");
      }
  },1000)
 
  useEffect(()=>{
    updateCart();
    return () => {updateCart.cancel()};

  },[cartItems,session?.user?.id]);

  

  return (
    <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
      <div className="w-full max-w-3xl bg-white shadow-lg rounded-2xl p-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">🛒 Your Cart</h1>

        {cartItems.length === 0 ? (
          <p className="text-gray-600 text-lg">Your cart is empty.</p>
        ) : (
          <div>
            <ul className="divide-y divide-gray-200">
              {cartItems.map((item) => (
                <li
                  key={item.id}
                  className="flex justify-between items-center py-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 rounded-lg object-cover"
                    />
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900">
                        {item.name}
                      </h2>
                      <p className="text-gray-600">
                        ${item.price} x {item.quantity}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => dispatch(decreaseQuantity(item))}
                      className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => dispatch(addToCart(item))}
                      className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      +
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            {totalPrice > 0 && (
              <div className="mt-6 border-t pt-4 text-right">
                <p className="text-lg font-medium">
                  Total Quantity: {totalQuantity}
                </p>
                <p className="text-xl font-bold text-gray-800">
                  Total Price: ${totalPrice.toFixed(2)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default cartPage;
