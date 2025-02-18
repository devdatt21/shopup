"use client";

import {useSession} from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { setSearchString } from "../redux/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { setThemeMode } from "../redux/themeSlice";
import ThemeToggle from "./ToggleTheme";


const Nav = () => {
  const {data:session} = useSession();
  const [search, setSearch] = useState("");
  const router = useRouter();
  const dispatch = useDispatch();

  const themeMode = useSelector((state) => state.theme.themeMode);

  const handleToggleTheme = () => {
    dispatch(setThemeMode());
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (e.target.value.length == 0) {
      dispatch(setSearchString(""));
      router.push(`/`);
    } else {
      setTimeout(() => {
        dispatch(setSearchString(search));
        router.push(`/search`);
      }, 10);
    }
  };

  return (
    <nav className="flex items-center bg-gray-200 dark:bg-gray-900 shadow-md dark:shadow-gray-700">
      <Link href="/" className="flex justify-start mx-3">
        <Image src="/images/logo.png" alt="logo" width={180} height={0} className="p-2" />
      </Link>

      <div className="flex items-center mx-3">
        <input
          type="text"
          placeholder="Search..."
          className="px-4 py-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-black dark:text-white rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-gray-500"
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e);
          }}
        />
      </div>

      <ThemeToggle />

      {session ? (
        <>
          <Link href="/cart" className="black_btn m-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Your Cart
          </Link>

          <Link href="/api/auth/signout" className="black_btn m-2 dark:bg-red-600 dark:text-white dark:hover:bg-red-500">
            Sign Out
          </Link>
        </>
      ) : (
        <>
          <Link href="/register" className="black_btn m-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Sign Up
          </Link>
          <Link href="/login" className="black_btn m-2 dark:bg-gray-700 dark:text-white dark:hover:bg-gray-600">
            Sign In
          </Link>
        </>
      )}
    </nav>

  );
};

export default Nav;