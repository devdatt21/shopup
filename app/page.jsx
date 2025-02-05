"use client";
import ProductCard from "../components/ProductCard";
import { useDispatch } from "react-redux";
import { setProducts } from "../redux/productSlice";
import { useSelector } from "react-redux";


export default function Home() {

  const themeMode = useSelector((state) => state.theme.themeMode);
  const dispatch = useDispatch();

  const products = [
    {
      id: 1,
      name: "Supra",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/2.jpeg", 
    },
    {
      id: 2,
      name: "Mercedes",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/1.jpeg",
    },
    {
      id: 3,
      name: "Porsche",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/3.jpeg", 
    },
    {
      id: 4,
      name: "Hyundai",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/4.jpeg",
    },
    {
      id: 5,
      name: "Jeep",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/5.jpeg",
    },
    {
      id: 6,
      name: "Retro Mercedes",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/6.jpeg",
    },
    {
      id: 7,
      name: "Mahindra",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/7.jpeg",
    },
    {
      id: 8,
      name: "Mercedes SUV",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/8.jpeg",
    },
    {
      id: 9,
      name: "Mercedes S Class",
      description: "A premium quality stylish jacket for all seasons.",
      price: 79.99,
      image: "/images/9.jpeg",
    },
  ]

  dispatch(setProducts(products));

  return (
    <section className={`w-full flex-center flex-col ${themeMode === "dark" ? "bg-slate-900" : "bg-gray-200"}`}>

        <div className="mt-5 prompt_layout">
            {products.map((product, index) => (
                <ProductCard key={index} product={product} />
            ))}
        </div>

    </section>
  );
}
