import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import {
  FiHome,
  FiCpu,
  FiMap,
  FiFileText,
  FiBookOpen,
  FiCode,
  FiTrendingUp,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

export default function Sidebar() {
  const { logout } = useAuth0();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleSidebar = () => setIsOpen(!isOpen);

  const navLinks = [
    // { name: "Dashboard", path: "/dashboard", icon: <FiHome /> },
    { name: "AI Interview", path: "/ai-interview", icon: <FiCpu /> },
    { name: "Roadmap", path: "/roadmap", icon: <FiMap /> },
    { name: "Resume Builder", path: "/templates", icon: <FiFileText /> },
    { name: "Aptitude", path: "/aptitude", icon: <FiBookOpen /> },
    { name: "DSA & CP", path: "/dsaAndcp", icon: <FiCode /> },
    { name: "Skill Level", path: "/skillgap", icon: <FiTrendingUp /> },
  ];

  return (
    <div className="flex">
      {/* Sidebar */}
      <aside
        className={`${
          isOpen ? "w-64" : "w-20"
        } h-screen bg-[#22223b] text-gray-200 flex flex-col justify-between p-4 border-r border-gray-700 transition-all duration-300`}
      >
        {/* Top Section */}
        <div>
          {/* Header with toggle button */}
          <div className="flex items-center justify-between mb-8">
            <h1
              className={`text-2xl font-bold text-white tracking-wide transition-all duration-300 ${
                isOpen ? "opacity-100" : "opacity-0 hidden"
              }`}
            >
              <span className="text-[#c9ada7]">Dashboard</span>
            </h1>
            <button
              onClick={toggleSidebar}
              className="text-gray-300 hover:text-black p-2 rounded-lg hover:bg-[#e3d3cf]"
            >
              {isOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>

          {/* Nav Links */}
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-3 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-[#a68580] text-white"
                      : "hover:bg-[#e3d3cf] hover:text-black"
                  }`}
                >
                  <span className="text-lg">{link.icon}</span>
                  {isOpen && <span>{link.name}</span>}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 pt-4">
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="w-full flex items-center justify-center gap-2 bg-gray-800 hover:bg-red-600 text-gray-300 hover:text-white px-4 py-2 rounded-lg transition-all"
          >
            <FiLogOut className="text-lg" />
            {isOpen && "Logout"}
          </button>
          {isOpen && (
            <p className="text-xs text-center text-gray-500 mt-3">
              © {new Date().getFullYear()} CodeSprint
            </p>
          )}
        </div>
      </aside>
    </div>
  );
}
