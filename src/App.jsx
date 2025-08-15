import React, { useState } from "react";
import { Routes, Route, NavLink, useLocation } from "react-router-dom";
import Home from "./Component/Home"; 
import Contact from "./Component/Contact";
import Pricing from "./Component/Pricing";
import Category from "./Component/Category";
import About from "./Component/About";
import AboutContent from "./Component/AboutContent";
import SliderUpload from "./Component/SliderUpload";
import AllsliderImage from "./Component/AllsliderImage";
import Login from "./Component/Login";
import ProtectedRoute from "./Component/ProtectedRoute";

function App() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation(); // current URL path lene ke liye
  const isLoggedIn = !!localStorage.getItem("adminToken"); // true/false
  const linkClass = ({ isActive }) =>
    isActive
      ? "bg-gray-900 text-white p-3 rounded"
      : "text-gray-300 hover:bg-gray-700 p-3 rounded";

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/login";
  };

  return (
    <div className="flex h-auto">
      {/* Sidebar sirf jab login ho */}
      {isLoggedIn && location.pathname !== "/login" && (
        <div
          className={`bg-gray-800 text-white w-60 p-5 space-y-6 absolute md:relative h-auto md:translate-x-0 transform ${
            isOpen ? "translate-x-0" : "-translate-x-full"
          } transition-transform duration-300`}
        >
          <h2 className="text-3xl font-extrabold text-center mb-6">
            Admin Panel
          </h2>

          <nav className="flex flex-col space-y-2">
            <NavLink to="/" className={linkClass} onClick={() => setIsOpen(false)}>Home</NavLink>
            <NavLink to="/contact" className={linkClass} onClick={() => setIsOpen(false)}>Contact</NavLink>
            <NavLink to="/pricing" className={linkClass} onClick={() => setIsOpen(false)}>Pricing</NavLink>
            <NavLink to="/our_vision" className={linkClass} onClick={() => setIsOpen(false)}>Our Vision</NavLink>
            <NavLink to="/about/content" className={linkClass} onClick={() => setIsOpen(false)}>About</NavLink>
            <NavLink to="/slider/upload" className={linkClass} onClick={() => setIsOpen(false)}>Gallery image Upload</NavLink>
            <NavLink to="/all-images" className={linkClass} onClick={() => setIsOpen(false)}>All Images</NavLink>
            <button 
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 p-3 rounded text-white"
            >
              Logout
            </button>
          </nav>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        {isLoggedIn && location.pathname !== "/login" && (
          <button
            className="md:hidden mb-4 bg-gray-800 text-white px-4 py-2 rounded"
            onClick={() => setIsOpen(!isOpen)}
          >
            ☰ Menu
          </button>
        )}

        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected Routes */}
          <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path="/contact" element={<ProtectedRoute><Contact /></ProtectedRoute>} />
          <Route path="/pricing" element={<ProtectedRoute><Pricing /></ProtectedRoute>} />
          <Route path="/categories" element={<ProtectedRoute><Category /></ProtectedRoute>} />
          <Route path="/our_vision" element={<ProtectedRoute><About /></ProtectedRoute>} />
          <Route path="/about/content" element={<ProtectedRoute><AboutContent /></ProtectedRoute>} />
          <Route path="/slider/upload" element={<ProtectedRoute><SliderUpload /></ProtectedRoute>} />
          <Route path="/all-images" element={<ProtectedRoute><AllsliderImage /></ProtectedRoute>} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
