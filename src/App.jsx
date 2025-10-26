import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Resume from "./pages/Resume";
import CompanyPrep from "./pages/CompanyPrep";
import Progress from "./pages/Progress";
import Community from "./pages/Community";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";


function App() {
  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="text-center text-xl mt-20">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Sidebar loginWithRedirect={loginWithRedirect} isAuthenticated={isAuthenticated} logout={logout} user={user} />
      <Routes>

        <Route path="/" element={<Dashboard />} />
        <Route path="/companyprep" element={<CompanyPrep />} />
        <Route path="/community" element={<Community />} />

        <Route path="/skillgap" element={<ProtectedRoute isAuthenticated={isAuthenticated}><SkillGap /></ProtectedRoute>} />
        <Route path="/roadmap" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Roadmap /></ProtectedRoute>} />
        <Route path="/resume" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Resume /></ProtectedRoute>} />
        <Route path="/progress" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Progress /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute isAuthenticated={isAuthenticated}><Profile /></ProtectedRoute>} />



      </Routes>
    </BrowserRouter>
  );
}

export default App;
