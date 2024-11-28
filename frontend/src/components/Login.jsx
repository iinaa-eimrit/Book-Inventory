import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaGoogle } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { useAuth } from '../context/AuthContext';

const Login = () => {
    const [message, setMessage] = useState("");
    const { loginUser, signInWithGoogle } = useAuth();
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        try {
            await loginUser(data.email, data.password);
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            setMessage("Please provide a valid email and password");
            console.error(error);
        }
    };

    const handleGoogleSignIn = async () => {
        try {
            await signInWithGoogle();
            alert("Login successful!");
            navigate("/");
        } catch (error) {
            alert("Google sign in failed!");
            console.error(error);
        }
    };

    return (
        <div className='min-h-screen flex justify-center items-center bg-gray-100'>
            <div className='w-full max-w-md mx-auto bg-white shadow-lg rounded-lg px-8 pt-6 pb-8 mb-4 transition-all duration-300 ease-in-out hover:shadow-xl'>
                <h2 className='text-2xl font-bold mb-6 text-gray-800 text-center'>Login</h2>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
                    <div>
                        <label className='block text-gray-700 text-sm font-semibold mb-2' htmlFor="email">Email</label>
                        <input 
                            {...register("email", { required: true })} 
                            type="email" 
                            id="email" 
                            placeholder='Email Address'
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
                <p className='text-center font-medium mt-4 text-sm'>
                    Don't have an account? <Link to="/register" className='text-indigo-600 hover:text-indigo-800 transition duration-300 ease-in-out'>Register</Link>
                </p>
                <div className='mt-6'>
                    <button 
                        onClick={handleGoogleSignIn}
                        className='w-full flex items-center justify-center bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105 focus:outline-none focus:shadow-outline'
                    >
                        <FaGoogle className='mr-2' />
                        Sign in with Google
                    </button>
                </div>
                <p className='mt-8 text-center text-gray-600 text-sm'>©2025 Book Store. All rights reserved.</p>
            </div>
        </div>
    );
};

export default Login;

