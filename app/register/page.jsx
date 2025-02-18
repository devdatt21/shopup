"use client";   
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import CustomAlert from "@/ components/CustomAlert";


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [cpassword, setCpassword] = useState("");
    const [alert, setAlert] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(cpassword!==password)
        { 
          setAlert({message:"Password is not matching", type:"error"})
        }
        else
        {
          try {
            await axios.post("/api/users/register", {email, password, cpassword})
            router.push("/login")
          } catch (error) {
              alert(error.response?.data?.message || "Register failed");
          }
        }

        
    };
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-2xl p-6 flex justify-center">
        <div className="w-96">
          
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Register</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter Your Email"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
    
            <div>
              <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 font-medium">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter New Password"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
            
            <div>
              <label htmlFor="cpassword" className="block text-gray-700 dark:text-gray-300 font-medium">Password:</label>
              <input
                type="password"
                id="cpassword"
                value={cpassword}
                onChange={(e) => setCpassword(e.target.value)}
                required
                placeholder="Confirm Password"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
    
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              Register
            </button>
          </form>
          {alert && <CustomAlert message={alert.message} type={alert.type}></CustomAlert>}
        </div>
      </div>
      </div>
    
    );

}

export default RegisterPage;