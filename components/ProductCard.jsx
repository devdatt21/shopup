
"use client"
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useDispatch } from 'react-redux'
import { setSelectedProduct } from '../redux/productSlice'
import { addToCart } from '../redux/cartSlice'
import CustomAlert from './CustomAlert'
import { useState } from 'react'


const ProductCard = ({product}) => {
    const dispatch = useDispatch();
    const [alert, setAlert] = useState(null);
    
    return (
        <div className="max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden transition-transform transform hover:scale-105">
            <Link href='/productDetails' onClick={()=>{dispatch(setSelectedProduct(product))}} >
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
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition" onClick={()=>{
                    dispatch(addToCart(product));
                    setAlert({ message: "Item added to cart!", type: "success" })}}
                >
                    Add to Cart
                </button>
                {alert && <CustomAlert message={alert.message} type={alert.type} onClose={() => setAlert(null)} />}

                </div>

            </div>
        </div>
    )
}

export default ProductCard;
