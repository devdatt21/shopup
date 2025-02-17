"use client";
import ProductCard from "../components/ProductCard";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { useEffect} from "react";

export default function Home() {
  
  const themeMode = useSelector((state) => state.theme.themeMode);
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.products);

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
    <section className={`w-full flex-center flex-col ${
      themeMode === "dark" 
        ? "bg-slate-900 text-white" 
        : "bg-gray-200 text-gray-900"
    }`}>
      <div className="mt-5 prompt_layout">
        {products && products.length > 0 ? (
          products.map((product, index) => (
            <ProductCard key={product.id || index} product={product} />
          ))
        ) : (
          <p className={`text-center ${
            themeMode === "dark" 
              ? "text-gray-400" 
              : "text-gray-500"
          }`}>No products available</p>
        )}
      </div>
    </section>
  );
}
