"use client";

import Image from "@/ node_modules/next/image";
import Link from "next/link";
import { setSearchString } from "../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setThemeMode } from "../redux/themeSlice";




const Nav = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();
    const dispatch = useDispatch();

    const themeMode = useSelector((state) => state.theme.themeMode);

    const handleToggleTheme = () => {
        dispatch(setThemeMode());

    }


    const handleSearch = (e) => {
        e.preventDefault();
        if(e.target.value.length == 0){
            dispatch(setSearchString(""));
            router.push(`/`);
        }
        else{
            setTimeout(() => {
                dispatch(setSearchString(search));
                router.push(`/search`);
            }, 10);
        }

    }


    return (


        <nav className="flex items-center">
            <Link href="/" className="flex justify-start mx-3">
                <Image src="/images/ford.svg" alt="logo" width={100} height={40} />
            </Link>

            <div className="flex items-center mx-3">
                <input
                type="text"
                placeholder="Search..."
                className="px-4 py-2 border border-black-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                onChange={(e) => {
                    setSearch(e.target.value);
                    handleSearch(e);
                }}

                />

            </div>


                
                
            <button onClick={handleToggleTheme} className="black_btn ml-auto mr-5">
                {themeMode === "light" ? "Dark" : "Light"}
            </button>


            <Link href="/cart" className="black_btn m-2">
                Your Cart
            </Link>


            <Link href="/checkout" className="black_btn m-2">
                Checkout
            </Link>
        </nav>

    )
}

export default Nav;