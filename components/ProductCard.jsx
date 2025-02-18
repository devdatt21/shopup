
"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedProduct } from '../redux/productSlice'
import { addToCart } from '../redux/cartSlice'
import CustomAlert from './CustomAlert'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { syncCartToDB } from '../redux/cartSlice'
import axios from 'axios'
import { useRouter } from 'next/navigation'


const ProductCard = ({product}) => {
    const cartItems = useSelector((state) => state.cart.items);
    const products = useSelector((state)=> state.product.products)
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);
    const {data : session} = useSession();
    const router = useRouter();

    const productDetailHandler = async (e) => {
        console.log("here is cart Items from product Card", product);
        router.push(`/productDetails?pid=${product._id}`);
        // console.log(selectedProduct);
        
    }
    
    useEffect(()=>{
        if(session?.user?.id){
            dispatch(syncCartToDB(session.user.id));
        }
    },[cartItems,session?.user?.id, dispatch])

    return (
        <div className="max-w-sm bg-white dark:bg-gray-800 rounded-2xl shadow-lg dark:shadow-gray-700 overflow-hidden transition-transform transform hover:scale-105">
            {/* <Link onClick={productDetailHandler} > */}
                <Image
                    src={product.image}
                    alt="product image"
                    className="w-full h-48 object-cover"
                    width={100}
                    height={100}
                    onClick={productDetailHandler}
                />
            {/* </Link> */}
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-100">{product.name}</h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                    <span className="text-lg font-bold text-green-600 dark:text-green-400">${product.price}</span>
                    {session?.user?.id ? (
                        <button className="bg-blue-600 dark:bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition" 
                            onClick={()=>{
                                dispatch(addToCart(product));
                                setAlert({ message: "Item added to cart!", type: "success" })
                            }}
                        >
                            Add to Cart
                        </button>
                    ) : (<div></div>)}
                    {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}
                </div>
            </div>
        </div>
    )
}

export default ProductCard;
