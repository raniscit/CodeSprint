import React from "react";
import { BrowserRouter, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";
import LandingPage from "./pages/LandingPage";
import SkillGap from "./pages/SkillGap";
import Roadmap from "./pages/Roadmap";
import Resume from "./pages/Resume";
import Jobs from "./pages/Jobs";
import Aptitude from "./pages/Aptitude";
import Community from "./pages/Community";
import Profile from "./pages/Profile";
import AiInterview from "./pages/AiInterview";
import DSAandCPP from "./pages/DSAandCPP";
import Dashboard from "./pages/Dashboard";
import TemplateSelect from "./pages/TemplateSelect";



// ✅ ProtectedRoute Component (moved outside main App)
function ProtectedRoute({ children }) {
  const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0();
  const location = useLocation();

  React.useEffect(() => {
    if (!isAuthenticated) {
      loginWithRedirect({ appState: { returnTo: location.pathname } });
    }
  }, [isAuthenticated, loginWithRedirect, location.pathname]);

  // prevent rendering until redirect happens
  if (isLoading) return <div className="text-center text-xl mt-20">Loading...</div>;
  if (!isAuthenticated) return <div className="text-center text-xl mt-20">Redirecting to login...</div>;

  return children;
}

function App() {
  const { user, loginWithRedirect, isAuthenticated, logout, isLoading } = useAuth0();

  if (isLoading) {
    return <div className="text-center text-xl mt-20">Loading...</div>;
  }

  return (
    <BrowserRouter>
      <Navbar
        loginWithRedirect={loginWithRedirect}
        isAuthenticated={isAuthenticated}
        logout={logout}
        user={user}
      />

      <Routes>
        {/* 🌍 Public Routes */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/community" element={<Community />} />

        {/* 🔒 Protected Dashboard Section (Sidebar persistent inside DashboardLayout) */}
        <Route
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        >
          {/* All routes below will render inside DashboardLayout's <Outlet /> */}
          <Route path="/skillgap" element={<SkillGap />} />
          <Route path="/roadmap" element={<Roadmap />} />
          <Route path="/builder/:templateId" element={<Resume />} />
          <Route path="/templates" element={<TemplateSelect />} />
          <Route path="/aptitude" element={<Aptitude />} />
          <Route path="/ai-interview" element={<AiInterview />} />
          <Route path="/dsaAndcp" element={<DSAandCPP />} />
          
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        
      


        {/* Fallback route */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}



export default App;
