import React from "react";
import FloatingAnimate from "../Animations/FloatingAnimate";
import { useToast } from "../context/ToastContext";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import {
  LogIn,
  User,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Users,
  Shield,
  Sparkles,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const { setUser } = useAuth();
  const { showToast } = useToast();
  const [form, setForm] = useState({
    enrollmentNumber: "",
    password: "",
    role: "student",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log(form);
      let res = "";
      if (form.role === "teacher") {
        res = await fetch("http://localhost:3000/teacher/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        });
      } else if (form.role === "admin") {
        res = await fetch("http://localhost:3000/admin/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        });
      } else {
        res = await fetch("http://localhost:3000/user/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(form),
        });
      }

      const data = await res.json();
      console.log(data)

      if (data.messages?.length > 0) {
        const msg = data.messages[0];
        data.success ? showToast(msg, "success") : showToast(msg, "error");
      }
      if (data.success) {
        setUser(data.user);
        showToast(`Welcome back, ${data.user.name}!`, "success");
        navigate(`/${form.role}/dashboard`);
      }
    } catch (error) {
      showToast("An error occurred. Please try again.", "error");
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const roleIcons = {
    student: <GraduationCap className="w-5 h-5" />,
    teacher: <Users className="w-5 h-5" />,
    admin: <Shield className="w-5 h-5" />,
  };

  const roleColors = {
    student: "from-blue-500 to-cyan-500",
    teacher: "from-purple-500 to-pink-500",
    admin: "from-green-500 to-emerald-500",
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900">
      {/* Background Animation */}
      <FloatingAnimate />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-lg mx-4">
        <div className="relative">
          {/* Glow Effect */}
          <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>

          {/* Main Card */}
          <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/70 to-gray-900/50 backdrop-blur-2xl shadow-2xl overflow-hidden z-10">
            {/* Header Section with Gradient */}
            <div
              className={`relative p-8 bg-gradient-to-r ${
                roleColors[form.role]
              } text-white`}
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-sm mb-4">
                  <LogIn className="w-10 h-10" />
                </div>
                <h1 className="text-3xl font-bold">Welcome Back</h1>
                <p className="text-white/80 mt-2">Sign in to your account</p>
              </div>
            </div>

            <form onSubmit={submitHandler} className="p-8 space-y-6">
              {/* Role Selector */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-white/60 mb-3">
                  Login As
                </label>
                <div className="grid grid-cols-3 gap-3">
                  {Object.entries({
                    student: "Student",
                    teacher: "Teacher",
                    admin: "Admin",
                  }).map(([value, label]) => (
                    <button
                      key={value}
                      type="button"
                      onClick={() => setForm({ ...form, role: value })}
                      className={`
                        flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300
                        ${
                          form.role === value
                            ? `bg-gradient-to-r ${roleColors[value]} text-white border-transparent shadow-lg`
                            : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                        }
                      `}
                    >
                      <div
                        className={`p-2 rounded-lg ${
                          form.role === value ? "bg-white/20" : "bg-white/5"
                        }`}
                      >
                        {roleIcons[value]}
                      </div>
                      <span className="text-sm font-medium">{label}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Enrollment Number */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Enrollment ID
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Enter your enrollment number"
                    value={form.enrollmentNumber}
                    onChange={(e) =>
                      setForm({ ...form, enrollmentNumber: e.target.value })
                    }
                    className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={(e) =>
                      setForm({ ...form, password: e.target.value })
                    }
                    className="w-full px-4 py-3 pl-12 pr-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                    required
                  />
                  <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/40 hover:text-white transition-colors duration-200"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm text-purple-300 hover:text-purple-200 transition-colors duration-200"
                  >
                    Forgot Password?
                  </button>
                </div>
              </div>

              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`
                  w-full group relative px-8 py-4 rounded-xl text-lg font-semibold
                  bg-gradient-to-r ${roleColors[form.role]} text-white
                  hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                <span className="flex items-center justify-center gap-3">
                  {isLoading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Signing In...
                    </>
                  ) : (
                    <>
                      Sign In
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </span>
                <div
                  className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                    roleColors[form.role]
                  } blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
                ></div>
              </button>

              {/* Divider */}
              <div className="relative my-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-gray-900/50 text-white/40">
                    New to SmartEval?
                  </span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <button
                  type="button"
                  onClick={() => navigate("/register")}
                  className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300 hover:border-white/20"
                >
                  <Sparkles className="w-4 h-4" />
                  Create an account
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </div>
            </form>

            {/* Footer */}
            <div className="px-8 py-6 border-t border-white/10 bg-white/2">
              <p className="text-center text-sm text-white/40">
                By signing in, you agree to our{" "}
                <button className="text-purple-300 hover:text-purple-200 transition-colors duration-200">
                  Terms of Service
                </button>{" "}
                and{" "}
                <button className="text-purple-300 hover:text-purple-200 transition-colors duration-200">
                  Privacy Policy
                </button>
              </p>
            </div>
          </div>
        </div>

        {/* Stats Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/10 backdrop-blur-sm">
            <span className="text-sm text-white/80 flex items-center gap-2">
              <Shield className="w-3 h-3" />
              Secure Login
            </span>
          </div>
          <div className="px-4 py-2 rounded-full bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-white/10 backdrop-blur-sm">
            <span className="text-sm text-white/80 flex items-center gap-2">
              <Users className="w-3 h-3" />
              50K+ Users
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
