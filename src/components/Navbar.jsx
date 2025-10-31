import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar({ loginWithRedirect, isAuthenticated, logout, user }) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => setIsOpen(!isOpen);
    const closeDropdown = () => setIsOpen(false);

    return (
        <div className="flex justify-between items-center bg-white px-10 py-4 relative">
            {/* Left - Logo */}
            <h1 className="text-3xl font-bold text-[#22223b] underline">CodeSprint</h1>

            {/* Middle + Right */}
            <div className="flex items-center gap-6 relative">
                {/* Navigation Links */}
                <nav className="flex gap-8 text-gray-700 font-bold">

                    <Link to="/" className="hover:text-[#9a8c98] transition pt-2">Home</Link>
                    <Link to="/dashboard" className="hover:text-[#9a8c98] transition pt-2">Dashboard</Link>
                    <Link to="/jobs" className="hover:text-[#9a8c98] transition pt-2">Jobs</Link>
                    <Link to="/community" className="hover:text-[#9a8c98] transition pt-2">Community</Link>

                </nav>

                {/* Profile Picture + Dropdown */}
                {isAuthenticated && user && (
                    <div className="relative">
                        <img
                            src={user.picture}
                            alt={user.name}
                            onClick={toggleDropdown}
                            className="w-10 h-10 rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition"
                        />

                        <AnimatePresence>
                            {isOpen && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2 }}
                                    className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden z-50"
                                >
                                    <div className="p-4 border-b border-gray-200">
                                        <h2 className="font-semibold text-gray-800">{user.name}</h2>
                                        <p className="text-gray-500 text-sm">{user.email}</p>
                                    </div>
                                    <div className="flex flex-col">
                                        <Link
                                            to="/profile"
                                            onClick={closeDropdown}
                                            className="px-4 py-2 hover:bg-gray-100 text-left text-gray-700"
                                        >
                                            View Profile
                                        </Link>
                                        <button
                                            onClick={() => {
                                                logout({ returnTo: window.location.origin });
                                                closeDropdown();
                                            }}
                                            className="px-4 py-2 text-left hover:bg-red-100 text-red-600 font-medium"
                                        >
                                            Logout
                                        </button>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                )}

                {/* Conditional Buttons */}
                {!isAuthenticated ? (
                    <button
                        className="bg-[#22223b] text-white text-lg px-5 py-2  rounded-xl hover:bg-[#c9ada7] hover:text-[#22223b]  transition-all"
                        onClick={() => loginWithRedirect({ appState: { returnTo: "/dashboard" } })}
                    >
                        Start Learning for Free
                    </button>
                ) : (
                    <></>
                )}

                {/* Always visible */}
                <button className="bg-[#22223b] text-white text-lg px-5 py-2 rounded-xl hover:bg-[#c9ada7] hover:text-[#22223b]  transition-all"
                >
                    Join Premium
                </button>
            </div>
        </div>
    );
}
