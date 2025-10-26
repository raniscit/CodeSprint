import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";

export default function Profile() {
  const { user, logout, isAuthenticated, isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        Loading your profile...
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-screen text-gray-600">
        You need to log in to view this page.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white shadow-xl rounded-2xl p-8 w-full max-w-md"
      >
        {/* Profile Picture */}
        <div className="flex flex-col items-center">
          <img
            src={user.picture}
            alt={user.name}
            className="w-28 h-28 rounded-full border-4 border-amber-500 shadow-md"
          />
          <h1 className="text-2xl font-bold text-gray-800 mt-4">{user.name}</h1>
          <p className="text-gray-500 text-sm">{user.email}</p>
        </div>

        {/* Profile Info */}
        <div className="mt-6 space-y-3 text-gray-700">
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Username</span>
            <span>{user.nickname || "N/A"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Email </span>
            <span>{user.email_verified ? "Verified" : "Not Verified"}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Auth Provider</span>
            <span>{user.sub?.split("|")[0].toUpperCase()}</span>
          </div>
          <div className="flex justify-between border-b pb-2">
            <span className="font-semibold">Joined</span>
            <span>
              {new Date().toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
        </div>

        {/* Buttons */}
        <div className="mt-8 flex flex-col gap-3">
          <button
            onClick={() => logout({ returnTo: window.location.origin })}
            className="w-full bg-red-500 hover:bg-red-600 text-white font-semibold py-2 rounded-lg transition"
          >
            Logout
          </button>
          <button className="w-full border border-gray-300 hover:bg-gray-100 text-gray-700 font-semibold py-2 rounded-lg transition">
            Edit Profile (coming soon)
          </button>
        </div>
      </motion.div>
    </div>
  );
}
