"use client";   
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


const RegisterPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post("/api/users/register", {email, password})
            router.push("/login")
        } catch (error) {
            alert(error.response?.data?.message || "Register failed");
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 p-6 flex justify-center">
          <div className="w-full max-w-7xl bg-white shadow-lg rounded-2xl p-6 flex justify-center">

            <div className="w-96">
              
              <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                
                <div>
                  <label htmlFor="email" className="block text-gray-700 font-medium">Email:</label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="Enter your email"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
    
                <div>
                  <label htmlFor="password" className="block text-gray-700 font-medium">Password:</label>
                  <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="Enter your password"
                    className="w-full p-3 mt-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </div>
    
                <button
                  type="submit"
                  className="w-full p-3 bg-indigo-600 text-white font-semibold rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
    );

}

export default RegisterPage;