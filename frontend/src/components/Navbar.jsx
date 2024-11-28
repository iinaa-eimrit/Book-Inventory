import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiMiniBars3CenterLeft, HiOutlineHeart, HiOutlineShoppingCart, HiOutlineUser } from "react-icons/hi2";
import { IoSearchOutline } from "react-icons/io5";
import avatarImg from "../assets/avatar.png";
import { useSelector } from "react-redux";
import { useAuth } from "../context/AuthContext";

const navigation = [
    { name: "Dashboard", href: "/user-dashboard" },
    { name: "Orders", href: "/orders" },
    { name: "Cart Page", href: "/cart" },
    { name: "Check Out", href: "/checkout" },
];

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const cartItems = useSelector(state => state.cart.cartItems);
    const { currentUser, logout } = useAuth();
    const token = localStorage.getItem('token');

    const handleLogOut = () => {
        logout();
    };

    return (
        <header className="bg-white shadow-md">
            <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                <div className="flex justify-between items-center">
                    {/* Left side */}
                    <div className="flex items-center space-x-4 md:space-x-8">
                        <Link to="/" className="text-gray-800 hover:text-indigo-600 transition duration-300">
                            <HiMiniBars3CenterLeft className="h-6 w-6" />
                        </Link>
                        <div className="relative">
                            <IoSearchOutline className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search here"
                                className="bg-gray-100 w-full sm:w-64 py-2 pl-10 pr-4 rounded-full focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:bg-white transition duration-300"
                            />
                        </div>
                    </div>

                    {/* Right side */}
                    <div className="flex items-center space-x-4">
                        {currentUser ? (
                            <div className="relative">
                                <button
                                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                    className="flex items-center space-x-2 focus:outline-none"
                                >
                                    <img src={avatarImg} alt="" className="h-8 w-8 rounded-full ring-2 ring-indigo-500" />
                                    <span className="hidden md:inline text-sm font-medium text-gray-700">{currentUser.name}</span>
                                </button>
                                {isDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                                        {navigation.map((item) => (
                                            <Link
                                                key={item.name}
                                                to={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300"
                                                onClick={() => setIsDropdownOpen(false)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                        <button
                                            onClick={handleLogOut}
                                            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-indigo-500 hover:text-white transition duration-300"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : token ? (
                            <Link to="/dashboard" className="text-indigo-600 hover:text-indigo-800 font-medium transition duration-300">Dashboard</Link>
                        ) : (
                            <Link to="/login" className="text-gray-600 hover:text-indigo-600 transition duration-300">
                                <HiOutlineUser className="h-6 w-6" />
                            </Link>
                        )}
                        <button className="hidden sm:block text-gray-600 hover:text-indigo-600 transition duration-300">
                            <HiOutlineHeart className="h-6 w-6" />
                        </button>
                        <Link to="/cart" className="bg-indigo-600 text-white px-3 py-2 rounded-full flex items-center space-x-1 hover:bg-indigo-700 transition duration-300">
                            <HiOutlineShoppingCart className="h-5 w-5" />
                            <span className="text-sm font-semibold">{cartItems.length || 0}</span>
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navbar;

