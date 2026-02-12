import React, { useState, useContext } from "react";
import { FaUserCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import useScrollDirection from "../../../Hooks/useScrollDirection";
import { AuthContext } from "../../../context/AuthContext";
import {
  Home,
  LayoutDashboard,
  Sparkles,
  ChevronDown,
  LogOut,
  Settings,
  User,
} from "lucide-react";
import axios from "axios";

const LoginHeader = () => {
  const scrollDirection = useScrollDirection();
  const { user } = useContext(AuthContext); // Assuming you have logout function
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

  const scrollClass =
    scrollDirection === "down" ? "-translate-y-full" : "translate-y-0";

  const handleLogout = () => {
    // Call your logout function
    if (user.role === "Admin") {
      axios.post("http://localhost:3000/admin/logout");
    } else if (user.role === "teacher") {
      axios.post("http://localhost:3000/teacher/logout");
    } else if (user.role === "student") {
      axios.post("http://localhost:3000/user/logout");
    }
    navigate("/login");
    setShowDropdown(false);
  };

  return (
    <header
      className={`
        fixed top-0 left-0 w-full z-50
        bg-gradient-to-b from-black/90 via-black/80 to-transparent
        backdrop-blur-xl border-b border-white/10
        flex items-center justify-between
        px-6 sm:px-8 lg:px-12 py-4
        transition-all duration-500 ease-in-out  
        ${scrollClass}
        hover:bg-black/95
      `}
    >
      {/* Logo with Gradient */}
      <Link to="/" className="flex items-center gap-3 group">
        <div className="relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 group-hover:scale-105 transition-transform duration-300">
            <Sparkles className="w-5 h-5 text-white" />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
            SmartEval
          </h1>
          <span className="text-xs text-white/60 -mt-1">
            AI-Powered Evaluation
          </span>
        </div>
      </Link>

      {/* Navigation Menu */}
      <nav className="hidden md:flex items-center gap-1 px-6 py-3 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl shadow-lg">
        <Link
          to="/"
          className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group"
        >
          <Home className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
          <span className="text-sm font-medium">Home</span>
        </Link>

        {user && (
          <Link
            to={`/${user.role}/Dashboard`}
            className="flex items-center gap-2 px-4 py-2 rounded-full text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200 group ml-2"
          >
            <LayoutDashboard className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>
        )}
      </nav>

      {/* User/Auth Section */}
      <div className="flex items-center gap-4">
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                {user.profileImage ? (
                  <img
                    src={user.profileImage}
                    alt={user.name}
                    className="relative w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <FaUserCircle
                    size={24}
                    className="text-white/80 group-hover:text-white transition-colors duration-200"
                  />
                )}
              </div>
              <div className="hidden sm:block text-left">
                <span className="text-sm font-medium text-white block">
                  {user.name}
                </span>
                <span className="text-xs text-white/60 capitalize">
                  {user.role}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-white/60 transition-transform duration-200 ${showDropdown ? "rotate-180" : ""}`}
              />
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowDropdown(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl shadow-2xl shadow-purple-500/10 z-50 overflow-hidden animate-fade-in">
                  <div className="p-4 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                        <User className="w-5 h-5 text-white/80" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white">
                          {user.name}
                        </p>
                        <p className="text-xs text-white/60">{user.email}</p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <Link
                      to="/profile"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                      onClick={() => setShowDropdown(false)}
                    >
                      <User className="w-4 h-4" />
                      <span className="text-sm">Profile</span>
                    </Link>
                    <Link
                      to="/settings"
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                      onClick={() => setShowDropdown(false)}
                    >
                      <Settings className="w-4 h-4" />
                      <span className="text-sm">Settings</span>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full transition-all duration-200 mt-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Link
              to="/login"
              className="px-4 py-2 rounded-full text-white/80 hover:text-white transition-colors duration-200 text-sm font-medium hidden sm:block"
            >
              Sign In
            </Link>
            <button
              onClick={() => navigate("/login")}
              className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
            >
              <span className="flex items-center gap-2">
                GET STARTED
                <Sparkles className="w-4 h-4 transition-transform group-hover:rotate-45 duration-300" />
              </span>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            </button>
          </div>
        )}
      </div>
      {/* Custom Animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.2s ease-out forwards;
        }
      `}</style>
    </header>
  );
};

export default LoginHeader;
