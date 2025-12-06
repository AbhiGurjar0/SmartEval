import React, { useState } from "react";
import {
  Eye,
  EyeOff,
  Lock,
  User,
  ArrowRight,
  Mail,
  Shield,
  GraduationCap,
  Users,
  Sparkles,
} from "lucide-react";
import { useToast } from "../context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const navigate = useNavigate();
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    enrollmentNumber: "",
    password: "",
    confirmPassword: "",
    role: "student",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      showToast("Passwords do not match", "error");
      return;
    }

    setIsLoading(true);

    try {
      let res = "";
      console.log(formData)
      if (formData.role === "teacher") {
        res = await fetch("http://localhost:3000/teacher/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      } else if (formData.role === "admin") {
        res = await fetch("http://localhost:3000/admin/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      } else {
        res = await fetch("http://localhost:3000/user/register", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(formData),
        });
      }

      const data = await res.json();
      console.log(data)

      if (data.messages?.length > 0) {
        const msg = data.messages[0];
        data.success ? showToast(msg, "success") : showToast(msg, "error");
      }

      if (data.success) {
        showToast(
          "Account created successfully! Redirecting to login...",
          "success"
        );
        setTimeout(() => navigate("/login"), 1500);
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
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-purple-900/30 to-gray-900 p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHYtNHptLTQtNGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      </div>

      {/* Floating Particles */}
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute h-[1px] w-[1px] rounded-full bg-gradient-to-r from-purple-400 to-blue-400"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 5}s`,
            boxShadow: "0 0 10px 2px rgba(168, 85, 247, 0.5)",
          }}
        />
      ))}

      {/* Main Card */}
      <div className="relative w-full max-w-lg mx-auto">
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>

        {/* Card Container */}
        <div className="relative rounded-2xl border border-white/10 bg-gradient-to-br from-gray-900/70 to-gray-900/50 backdrop-blur-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div
            className={`relative p-8 bg-gradient-to-r ${
              roleColors[formData.role]
            } text-white`}
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16 blur-2xl"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full bg-white/10 border-2 border-white/20 backdrop-blur-sm mb-4">
                <Sparkles className="w-10 h-10" />
              </div>
              <h1 className="text-3xl font-bold">Join SmartEval</h1>
              <p className="text-white/80 mt-2">
                Create your account in seconds
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-8 space-y-6">
            {/* Role Selector */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-white/60 mb-3">
                Register As
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
                    onClick={() => setFormData({ ...formData, role: value })}
                    className={`
                      flex flex-col items-center gap-2 p-4 rounded-xl border transition-all duration-300
                      ${
                        formData.role === value
                          ? `bg-gradient-to-r ${roleColors[value]} text-white border-transparent shadow-lg`
                          : "bg-white/5 border-white/10 text-white/60 hover:bg-white/10"
                      }
                    `}
                  >
                    <div
                      className={`p-2 rounded-lg ${
                        formData.role === value ? "bg-white/20" : "bg-white/5"
                      }`}
                    >
                      {roleIcons[value]}
                    </div>
                    <span className="text-sm font-medium">{label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Name Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  required
                />
                <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>
            </div>

            {/* Enrollment Number */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Enrollment Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="enrollmentNumber"
                  value={formData.enrollmentNumber}
                  onChange={handleChange}
                  placeholder="Enter your enrollment number"
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  required
                />
                <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
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
            </div>

            {/* Confirm Password */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-white/60 flex items-center gap-2">
                <Lock className="w-4 h-4" />
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                  required
                />
                <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
              </div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-white/60">Password strength:</span>
                  <span
                    className={`font-medium ${
                      formData.password.length >= 8
                        ? "text-green-400"
                        : "text-yellow-400"
                    }`}
                  >
                    {formData.password.length >= 8 ? "Strong" : "Weak"}
                  </span>
                </div>
                <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-300 ${
                      formData.password.length >= 8
                        ? "w-full bg-gradient-to-r from-green-500 to-emerald-500"
                        : "w-1/3 bg-gradient-to-r from-yellow-500 to-orange-500"
                    }`}
                  ></div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`
                w-full group relative px-8 py-4 rounded-xl text-lg font-semibold
                bg-gradient-to-r ${roleColors[formData.role]} text-white
                hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <span className="flex items-center justify-center gap-3">
                {isLoading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}
              </span>
              <div
                className={`absolute inset-0 rounded-xl bg-gradient-to-r ${
                  roleColors[formData.role]
                } blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300`}
              ></div>
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-gray-900/50 text-white/40">
                  Already have an account?
                </span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-full border-2 border-white/10 bg-white/5 hover:bg-white/10 text-white font-medium transition-all duration-300 hover:border-white/20"
              >
                Sign in to existing account
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </form>

          {/* Footer */}
          <div className="px-8 py-6 border-t border-white/10 bg-white/2">
            <p className="text-center text-sm text-white/40">
              By creating an account, you agree to our{" "}
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

      {/* Custom Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) translateX(0px);
          }
          33% {
            transform: translateY(-20px) translateX(10px);
          }
          66% {
            transform: translateY(10px) translateX(-10px);
          }
        }
      `}</style>
    </div>
  );
}
