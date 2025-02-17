"use client";
import { useSession } from "next-auth/react";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import {setCart} from "../redux/cartSlice";
import { useEffect} from "react";
import axios from "axios";

export default function Home() {
  
  const themeMode = useSelector((state) => state.theme.themeMode);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);
  const {data:session} = useSession();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const product_data = await response.json();
        dispatch(setProducts(product_data));
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    
    fetchProducts();
  }, []);


  return (
    <section className={`w-full flex-center flex-col ${themeMode === "dark" ? "bg-slate-900" : "bg-gray-200"}`}>
      <div className="mt-5 prompt_layout">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))
        ) : (
          <p className="text-center text-gray-500">No products available</p>
        )}
      </div>
    </section>
  );
}
