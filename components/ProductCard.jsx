
"use client"
import React, { useEffect } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch, useSelector } from 'react-redux'
import { setSelectedProduct } from '../redux/productSlice'
import { addToCart } from '../redux/cartSlice'
import CustomAlert from './CustomAlert'
import { useState } from 'react'
import { useSession } from 'next-auth/react'
import { syncCartToDB } from '../redux/cartSlice'

const ProductCard = ({product}) => {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);
    const {data : session} = useSession();

    
    useEffect(()=>{
        if(session?.user?.id){
            dispatch(syncCartToDB(session.user.id));
        }
    },[cartItems,session?.user?.id, dispatch])

    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <Link href={`${session?.user?.id ? "/productDetails" : "/login"}`} onClick={()=>{dispatch(setSelectedProduct(product))}} >
                <Image
                    src={product.image}
                    alt="product image"
                    className="w-full h-48 object-cover"
                    width={100}
                    height={100}
                />
            </Link>
            <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800">{product.name}</h2>
                <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-green-600">${product.price}</span>
                {session?.user?.id ? (<button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={()=>{
                    // console.log("this is from product card -> product : ", product)
                    dispatch(addToCart(product));
                    setAlert({ message: "Item added to cart!", type: "success" })}}
                >
                    Add to Cart
                </button>) : (<div></div>)}
                {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

                </div>

            </div>
        </div>
    )
}

export default ProductCard;
