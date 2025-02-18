"use client"

import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import { useSelector, useDispatch } from 'react-redux'
import { addToCart } from '@/ redux/cartSlice'
import { useRouter } from 'next/navigation'
import { SP } from '@/ node_modules/next/dist/shared/lib/utils'
import { useSearchParams } from 'next/navigation'

const ProductDetailsPage = () => {


    const searchParams = useSearchParams();
    const [selectedProduct, setSelectedProduct] = useState(null);
    const dispatch = useDispatch();
    const router = useRouter();

    useEffect(()=>{
      const getProductDetails = async () => {
        const pid = searchParams.get("pid");

        const data = await fetch(`/api/products?productId=${pid}`);
        const sProduct = await data.json();
        setSelectedProduct(sProduct);
      }

      getProductDetails();
    },[]);
 

    if (!selectedProduct) {
        return (
          <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
            <p className="text-gray-700 text-xl">No product selected.</p>
          </div>
        );
    }
  
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <div className="w-full max-w-lg bg-white dark:bg-gray-800 shadow-lg rounded-2xl overflow-hidden">
        <Image 
          src={selectedProduct.image || "../../public/images/1.jpeg"} 
          alt="product image" 
          className="w-full h-64 object-cover" 
          width={100} 
          height={100} 
        />
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{selectedProduct.name}</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">{selectedProduct.description}</p>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xl font-semibold text-gray-800 dark:text-gray-200">${selectedProduct.price}</span>
          </div>

          <button 
            onClick={() => {
              dispatch(addToCart(selectedProduct));
              router.push('/cart');
            }} 
            className="w-full flex items-center justify-center gap-2 p-3 bg-blue-500 text-white text-lg font-semibold rounded-lg hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>

  )
}

export default ProductDetailsPage;