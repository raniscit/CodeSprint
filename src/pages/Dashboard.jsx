import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useLocation } from "react-router-dom";

export default function Dashboard() {
  const location = useLocation();

  // Show heading only on the root dashboard path
  const showHeading = location.pathname === "/dashboard";

  return (
    <div className="flex h-screen bg-white">
      <Sidebar />
      <div className="flex-1 p-8 overflow-y-auto">
        {showHeading && (
          <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">
            Welcome to CodeSprint Dashboard
          </h1>
        )}
        <Outlet />
      </div>
    </div>
  );
}
