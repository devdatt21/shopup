"use client";

import React from 'react'
import ProductCard from '@/ components/ProductCard'
import { useSelector, } from 'react-redux'



const SearchPage = () => {
    const searchString = useSelector((state) => state.search.searchString);
    const products = useSelector((state) => state.product.products);


    const filteredProducts = products.filter((product) => 
        product.name.toLowerCase().includes(searchString.toLowerCase())
    );



  return (
    <section className="w-full flex-center flex-col">

        <div className="mt-5 prompt_layout">
            {filteredProducts.length === 0 ? (
                <p className="text-gray-600 text-lg">No products found</p>
            ) : (
                filteredProducts.map((product, index) => (
                    <ProductCard key={index} product={product} />
                ))
            )}

        </div>


    </section>
  )
}

export default SearchPage;