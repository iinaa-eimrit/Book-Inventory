import React from 'react';
import footerLogo from "../assets/footer-logo.png";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-12 px-4">
            <div className="container mx-auto">
                <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
                    <div className="md:w-1/2 w-full">
                        <img src={footerLogo} alt="Logo" className="mb-6 w-36" />
                        <ul className="flex flex-col md:flex-row gap-6 text-sm">
                            {['Home', 'Services', 'About Us', 'Contact'].map((item) => (
                                <li key={item}>
                                    <a href={`#${item.toLowerCase().replace(' ', '-')}`} className="hover:text-indigo-400 transition duration-300 ease-in-out">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="md:w-1/2 w-full">
                        <p className="mb-4 text-gray-300">
                            Subscribe to our newsletter for the latest updates and offers!
                        </p>
                        <div className="flex">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="w-full px-4 py-2 rounded-l-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                            <button className="bg-indigo-600 px-6 py-2 rounded-r-md hover:bg-indigo-700 transition duration-300 ease-in-out">
                                Subscribe
                            </button>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-gray-700">
                    <ul className="flex gap-6 mb-4 md:mb-0 text-sm">
                        <li><a href="#privacy" className="hover:text-indigo-400 transition duration-300 ease-in-out">Privacy Policy</a></li>
                        <li><a href="#terms" className="hover:text-indigo-400 transition duration-300 ease-in-out">Terms of Service</a></li>
                    </ul>
                    <div className="flex gap-6">
                        {[FaFacebook, FaTwitter, FaInstagram].map((Icon, index) => (
                            <a key={index} href="#" className="hover:text-indigo-400 transition duration-300 ease-in-out transform hover:scale-110">
                                <Icon size={24} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

