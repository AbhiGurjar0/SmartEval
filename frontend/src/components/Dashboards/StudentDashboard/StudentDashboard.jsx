import React from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  User,
  ArrowRight,
  GraduationCap,
  Calendar,
  Bell,
  Settings,
  LogOut,
  Search,
  Filter,
  Home,
  FileText,
  BarChart3,
  Clock,
  CheckCircle,
  ChevronRight,
  Star,
  Crown,
  Award,
  TrendingUp,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import { useUser } from "../../../context/UserContext";
import { useAuth } from "../../../context/AuthContext";
import { useContext } from "react";
import { useState, useEffect } from "react";

const StudentDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { subjects, setSubjects, logout } = useUser(); // Assuming logout function exists
  const [enrolledSubjects, setEnrolledSubjects] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    if (subjects) {
      setEnrolledSubjects(subjects);
      console.log("user panel ", subjects);
    }
  }, [subjects]);

  const handleSubjectClick = (subjectId) => {
    navigate(`/student/subject/${subjectId}`);
  };

  const handleLogout = () => {
    logout?.();
    navigate("/login");
  };

  const filteredSubjects = enrolledSubjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.courseCode.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && subject.pending > 0) ||
      (filter === "completed" && subject.pending === 0);
    return matchesSearch && matchesFilter;
  });

  const totalPending = enrolledSubjects.reduce(
    (sum, sub) => sum + sub.pending,
    0
  );
  const completedSubjects = enrolledSubjects.filter(
    (sub) => sub.pending === 0
  ).length;

  return (
    <div className="w-full relative z-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 text-white font-sans">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-xl">
        <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-md opacity-70"></div>
                <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                  <GraduationCap className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                  SmartEval
                </h1>
                <span className="text-xs text-white/60 -mt-1">
                  Student Portal
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search subjects, assignments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
              {/* Notifications */}
              <button className="relative p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                <Bell className="w-5 h-5 text-white/80" />
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-xs flex items-center justify-center">
                  3
                </span>
              </button>

              {/* Profile Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowProfileMenu(!showProfileMenu)}
                  className="flex items-center gap-3 px-3 py-2 rounded-full bg-gradient-to-r from-white/5 to-white/10 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-all duration-200 group"
                >
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                      <span className="text-sm font-bold text-white">
                        {user?.name?.charAt(0).toUpperCase() || "S"}
                      </span>
                    </div>
                  </div>
                  <div className="w-[10vh] hidden md:block text-left">
                    <span className="text-sm font-medium text-white block">
                      {user?.name || "Student"}
                    </span>
                    <span className="text-xs text-white/60">
                      {user?.enrollmentNumber || "EN123456"}
                    </span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-white/60 transition-transform duration-200 ${
                      showProfileMenu ? "rotate-90" : ""
                    }`}
                  />
                </button>

                {/* Dropdown Menu */}
                {showProfileMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowProfileMenu(false)}
                    />
                    <div className="absolute right-0 top-full mt-2 w-64 rounded-xl border border-white/10 bg-gray-900/95 backdrop-blur-xl shadow-2xl shadow-purple-500/10 z-50 overflow-hidden animate-fade-in">
                      <div className="p-4 border-b border-white/10">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center">
                            <span className="text-lg font-bold text-white">
                              {user?.name?.charAt(0).toUpperCase() || "S"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user?.name || "Student"}
                            </p>
                            <p className="text-xs text-white/60">
                              {user?.email || "student@email.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button
                          onClick={() => navigate("/student/profile")}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm">My Profile</span>
                        </button>
                        <button
                          onClick={() => navigate("/student/settings")}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-sm">Settings</span>
                        </button>
                        <button
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 mt-2"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm">Sign Out</span>
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Navigation */}
      <div className="max-w-9xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="lg:w-64 space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Quick Stats
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Total Subjects</span>
                  <span className="text-white font-bold">
                    {enrolledSubjects.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">
                    Pending Assignments
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {totalPending}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Completed</span>
                  <span className="text-green-400 font-bold">
                    {completedSubjects}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Attendance</span>
                  <span className="text-blue-400 font-bold">92%</span>
                </div>
              </div>
            </div>

            {/* Upcoming Deadlines */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5 text-orange-400" />
                Upcoming Deadlines
              </h3>
              <div className="space-y-3">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200 cursor-pointer"
                  >
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-medium text-white">
                        Assignment {i}
                      </span>
                      <span className="text-xs text-yellow-400">2 days</span>
                    </div>
                    <p className="text-xs text-white/60 mt-1">
                      Data Structures
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Achievements */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-400" />
                Achievements
              </h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10">
                  <Star className="w-8 h-8 text-yellow-400" />
                  <div>
                    <p className="text-sm font-medium text-white">
                      Perfect Score
                    </p>
                    <p className="text-xs text-white/60">5 assignments</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-green-600/10 to-emerald-600/10">
                  <CheckCircle className="w-8 h-8 text-green-400" />
                  <div>
                    <p className="text-sm font-medium text-white">On Time</p>
                    <p className="text-xs text-white/60">10 submissions</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 flex items-center">
                    <GraduationCap className="h-8 w-8 mr-3 text-purple-500" />
                    My Classroom
                  </h1>
                  <p className="text-white/60">
                    Select a subject to view assignments and submit work.
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-sm text-white/60 uppercase tracking-wider">
                      Current Session
                    </p>
                    <p className="text-xl font-bold text-white">2025-26</p>
                  </div>
                  <div className="px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10">
                    <span className="text-sm text-white/80">Semester 6</span>
                  </div>
                </div>
              </div>

              {/* Filter Bar */}
              <div className="flex flex-wrap items-center gap-4 mt-6">
                <div className="flex items-center gap-2">
                  <Filter className="w-5 h-5 text-white/60" />
                  <div className="flex flex-wrap gap-2">
                    {["all", "pending", "completed"].map((f) => (
                      <button
                        key={f}
                        onClick={() => setFilter(f)}
                        className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          filter === f
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="text-sm text-white/40 ml-auto">
                  Showing {filteredSubjects.length} of {enrolledSubjects.length}{" "}
                  subjects
                </div>
              </div>
            </div>

            {/* Subject Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredSubjects.map((subject) => (
                <div
                  key={subject._id}
                  onClick={() => handleSubjectClick(subject._id)}
                  className="group relative bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
                >
                  {/* Decorative Background Glow */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 rounded-full blur-3xl -mr-16 -mt-16 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                  {/* Card Content */}
                  <div className="relative z-10 p-6">
                    {/* Top Row */}
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/10">
                          <BookOpen className="h-6 w-6 text-purple-400" />
                        </div>
                        <div>
                          <span className="px-3 py-1 rounded-full text-xs font-semibold text-white/60 bg-white/5 border border-white/10">
                            {subject.courseCode}
                          </span>
                        </div>
                      </div>
                      {subject.pending > 0 && (
                        <span className="px-3 py-1 rounded-full text-xs font-semibold bg-gradient-to-r from-yellow-600/20 to-orange-600/20 text-yellow-400 border border-yellow-500/20">
                          {subject.pending} pending
                        </span>
                      )}
                    </div>

                    {/* Subject Name */}
                    <h3 className="text-xl font-bold text-white mb-2 group-hover:text-purple-300 transition-colors truncate">
                      {subject.name}
                    </h3>

                    {/* Teacher Info */}
                    <div className="flex items-center text-sm text-white/60 mb-6">
                      <User className="h-4 w-4 mr-2" />
                      <span>
                        {subject.allotedTeacher
                          ? subject.allotedTeacher.name
                          : "Not Alloted Yet"}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-6">
                      {(() => {
                        const submittedCount = subject.assignments.filter(
                          (assign) =>
                            assign.submissions?.some(
                              (sub) => sub.studentId._id === user._id
                            )
                        ).length;

                        const percentage = subject.assignments.length
                          ? Math.round(
                              (submittedCount / subject.assignments.length) *
                                100
                            )
                          : 0;

                        return (
                          <>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-white/60">Progress</span>
                              <span className="text-white">{percentage}%</span>
                            </div>

                            <div className="h-1 rounded-full bg-white/10 overflow-hidden">
                              <div
                                className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                                style={{
                                  width: `${percentage}%`,
                                }}
                              ></div>
                            </div>
                          </>
                        );
                      })()}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <FileText className="h-4 w-4 text-white/40" />
                          <span className="text-sm text-white/60">
                            {subject.assignments.length || 0} assignments
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 text-white/40" />
                          <span
                            className={`text-sm ${
                              subject.pending > 0
                                ? "text-yellow-400"
                                : "text-green-400"
                            }`}
                          >
                            {subject.pending > 0
                              ? `${subject.pending} pending`
                              : "All caught up"}
                          </span>
                        </div>
                      </div>
                      <div className="p-2 rounded-full bg-gradient-to-r from-white/5 to-white/10 border border-white/10 group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-blue-600 group-hover:border-transparent transition-all duration-300">
                        <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredSubjects.length === 0 && (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/10 flex items-center justify-center">
                  <BookOpen className="w-12 h-12 text-white/40" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  No subjects found
                </h3>
                <p className="text-white/60 max-w-md mx-auto">
                  {searchTerm
                    ? `No subjects match "${searchTerm}"`
                    : "You are not enrolled in any subjects yet."}
                </p>
              </div>
            )}
          </div>
        </div>
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
    </div>
  );
};

export default StudentDashboard;
