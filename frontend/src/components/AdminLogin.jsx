import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import axios from "axios";
import getBaseUrl from '../utils/baseURL';
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [message, setMessage] = useState("");
    const { register, handleSubmit, formState: { errors } } = useForm();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${getBaseUrl()}/api/auth/admin`, data, {
                headers: { 'Content-Type': 'application/json' }
            });
            const auth = response.data;
            if (auth.token) {
                localStorage.setItem('token', auth.token);
                setTimeout(() => {
                    localStorage.removeItem('token');
                    alert('Token has expired! Please login again.');
                    navigate("/");
                }, 3600 * 1000);
            }
            alert("Admin Login successful!");
            navigate("/dashboard");
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100'>
            <div className='w-full max-w-md mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-all duration-300 ease-in-out hover:shadow-xl'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Admin Dashboard Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div>
                        <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor="username">Username</label>
                        <input 
                            {...register("username", { required: true })} 
                            type="text" 
                            id="username" 
                            placeholder='Username'
                            className='w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                        />
                    </div>
                    <div>
                        <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor="password">Password</label>
                        <input 
                            {...register("password", { required: true })} 
                            type="password" 
                            id="password" 
                            placeholder='Password'
                            className='w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-indigo-100 focus:border-indigo-300'
                        />
                    </div>
                    {message && <p className='text-red-500 text-sm italic'>{message}</p>}
                    <div>
                        <button className='w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:shadow-outline'>
                            Login
                        </button>
                    </div>
                </form>
                <p className='mt-8 text-center text-gray-600 text-sm'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default AdminLogin;

