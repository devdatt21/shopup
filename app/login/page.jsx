"use client";

import { useState } from "react";
import {signIn} from "next-auth/react";
import {useRouter} from "next/navigation";


const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async(e) => {  
        e.preventDefault();
        const res = await signIn("credentials", {
            redirect:false,
            email,
            password,
            // callbackUrl:"/"
        });

        if(res.error)
        {
            alert("Login Failed" + res.error);
        }
        else
        {
            router.push("/");
        }
    };

    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 flex justify-center">
      <div className="w-full max-w-7xl bg-white dark:bg-gray-800 shadow-lg dark:shadow-gray-700 rounded-2xl p-6 flex justify-center">
        <div className="w-96">
          <h2 className="text-3xl font-bold text-center text-gray-800 dark:text-gray-100 mb-6">Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div>
              <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 font-medium">Email:</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="Enter your email"
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
                placeholder="Enter your password"
                className="w-full p-3 mt-2 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-black dark:text-white rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
              />
            </div>
    
            <button
              type="submit"
              className="w-full p-3 bg-indigo-600 dark:bg-indigo-500 text-white font-semibold rounded-md hover:bg-indigo-700 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:focus:ring-indigo-400"
            >
              Login
            </button>
          </form>
        </div>
      </div>
      </div>
    
      );

}

export default LoginPage;