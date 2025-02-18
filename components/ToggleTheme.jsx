import React from "react";
import {Sun, Moon} from 'lucide-react'
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setThemeMode } from "@/ redux/themeSlice";

const ThemeToggle = () => {

    const theme = useSelector((state) => state.theme.themeMode);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(theme==="dark")
        {
            document.documentElement.classList.add('dark');
        }
        else
        {
            document.documentElement.classList.remove('dark');
        }
    },[])

    const toggleTheme = () => {
        console.log("theme : " , theme);

        if(theme=="light")
        {
            dispatch(setThemeMode("dark"));
            document.documentElement.classList.add('dark');
        }
        else 
        {
            dispatch(setThemeMode("light"));
            document.documentElement.classList.remove('dark');
        }
    }

    return (
        <button
          onClick={toggleTheme}
          className="ml-auto p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === "light" ? (
            <Moon className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          ) : (
            <Sun className="w-5 h-5 text-gray-800 dark:text-gray-200" />
          )}
        </button>
      );

}

export default ThemeToggle;