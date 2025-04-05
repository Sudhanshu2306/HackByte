import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import AboutUs from "./ABOUTUS/AboutUs";
import { useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Profile from "./pages/Profile";
import MyFam from "./pages/MyFam";
import LoadingScreen from "./Components/LoadingScreen.jsx"; // Import loading screen

// Private Route Component
const PrivateRoute = ({ element }) => {
  const { user, isLoggedIn } = useAuth();
  return user && isLoggedIn ? element : <Navigate to="/signin" />;
};

import Report from "./pages/Report";
import ResolvedPage from "./pages/ResolvedPage";
import Missing from "./pages/Missing.jsx";
const App = () => {
  const { user, loading } = useAuth();
  const [isPageLoading, setIsPageLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsPageLoading(false), 2000); // Show loading screen for 2 seconds
    return () => clearTimeout(timer);
  }, []);

  if (loading || isPageLoading) {
    return <LoadingScreen />; // ✅ Show loading screen before any page
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="/signin" element={<SignIn />} />
        {/* <Route path="/lost" element={<Lost/>}/> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/report" element={<Report />} />
        <Route path="/resolved" element={<ResolvedPage />} />
        {/* Protected Routes - Only accessible if user is logged in */}
        <Route path="/missing" element={<PrivateRoute element={<Missing />} />} />
        <Route path="/myfam" element={<PrivateRoute element={<MyFam />} />} />
      </Routes>
    </Router>
  );
};

export default App;