// ProtectedRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isAuthenticated, children }) => {
  if (!isAuthenticated) {
    // Redirect to login if not logged in
    return <Navigate to="/" replace />;
  }
  return children;
};

export default ProtectedRoute;
