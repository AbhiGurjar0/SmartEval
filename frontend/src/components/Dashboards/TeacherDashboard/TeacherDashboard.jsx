import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Users,
  BarChart3,
  TrendingUp,
  Filter,
  Search,
  ChevronRight,
  Clock,
  Award,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  LogOut,
  User,
  Home,
  Sparkles,
  Target,
  Zap,
  Bookmark,
  Star,
  Crown,
  Brain,
  GraduationCap,
  Layers,
  ExternalLink,
  PlusCircle,
  Edit3,
  Upload,
  MoreVertical,
} from "lucide-react";
import { useTeacher } from "../../../context/TeacherContext";
import { useAuth } from "../../../context/AuthContext";

const TeacherDashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { subjects } = useTeacher();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showStats, setShowStats] = useState(true);
  // const [activeSubject, setActiveSubject] = useState(null);

  // // Mock data - Replace with actual data
  const teacherStats = {
    totalStudents: 145,
    averageScore: 82,
    completionRate: "78%",
    pendingEvaluations: 23,
    totalAssignments: 15,
    activeSubmissions: 89,
  };

  const recentActivity = [
    {
      id: 1,
      subject: "Data Structures",
      action: "Graded 15 assignments",
      time: "2 hours ago",
      type: "grading",
    },
    {
      id: 2,
      subject: "Algorithms",
      action: "Created new assignment",
      time: "Yesterday",
      type: "create",
    },
    {
      id: 3,
      subject: "Calculus",
      action: "12 new submissions",
      time: "2 days ago",
      type: "submission",
    },
    {
      id: 4,
      subject: "Physics",
      action: "Student query resolved",
      time: "3 days ago",
      type: "support",
    },
  ];
  const filteredSubjects = subjects || [];

  const getSubjectStats = (subject) => {
    return {
      totalStudents: subject?.Student?.length || 0,
      assignments: subject?.assignments?.length || 0,
      pending: subject?.pending || 0,
      completion:
        subject?.totalAssignment > 0
          ? Math.round(
              ((subject.totalAssignment - subject.pending) /
                subject.totalAssignment) *
                100
            )
          : 0,
      avgScore: 85, // TODO: Calculate from actual grades
    };
  };

  const handleSubjectClick = (subjectId) => {
    navigate(`/teacher/subject/${subjectId}`); // Added parentheses
  };
  const getSubjectColor = (index) => {
    const colors = [
      "from-purple-600 to-pink-600",
      "from-blue-600 to-cyan-600",
      "from-green-600 to-emerald-600",
      "from-orange-600 to-red-600",
      "from-indigo-600 to-purple-600",
      "from-teal-600 to-blue-600",
    ];
    return colors[index % colors.length];
  };

  const getSubjectIcon = (subjectName) => {
    if (!subjectName) return <BookOpen className="w-6 h-6" />;

    const name = subjectName.toLowerCase();

    if (name.includes("data structure")) return <Brain className="w-6 h-6" />;
    if (name.includes("algorithm")) return <Zap className="w-6 h-6" />;
    if (name.includes("math") || name.includes("calculus"))
      return <Target className="w-6 h-6" />;
    if (name.includes("physic")) return <Sparkles className="w-6 h-6" />;
    if (name.includes("computer")) return <Crown className="w-6 h-6" />;

    return <BookOpen className="w-6 h-6" />;
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 text-white font-sans">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHYtNHptLTQtNGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6bTQgMGg0djRoLTR2LTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-10"></div>
      </div>

      {/* Top Navigation */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                  Teacher Portal
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search subjects, students..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-full bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                />
              </div>
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center gap-4">
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
                        {user?.name?.charAt(0).toUpperCase() || "T"}
                      </span>
                    </div>
                  </div>
                  <div className="hidden md:block text-left">
                    <span className="text-sm font-medium text-white block">
                      {user?.name || "Teacher"}
                    </span>
                    <span className="text-xs text-white/60">Professor</span>
                  </div>
                  <ChevronRight
                    className={`w-4 h-4 text-white/60 transition-transform duration-200 ${
                      showProfileMenu ? "rotate-90" : ""
                    }`}
                  />
                </button>

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
                              {user?.name?.charAt(0).toUpperCase() || "T"}
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {user?.name || "Teacher"}
                            </p>
                            <p className="text-xs text-white/60">
                              {user?.email || "teacher@email.com"}
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
                          <User className="w-4 h-4" />
                          <span className="text-sm">My Profile</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px=3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
                          <Settings className="w-4 h-4" />
                          <span className="text-sm">Settings</span>
                        </button>
                        <button
                          onClick={() => navigate("/login")}
                          className="w-full flex items-center gap-3 px=3 py=2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200 mt-2"
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
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                My Subjects
              </h1>
              <p className="text-white/60">
                Manage all your assigned courses and track student progress
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("/teacher/dashboard")}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                <span>Dashboard</span>
              </button>
              <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-200 flex items-center gap-2">
                <PlusCircle className="w-4 h-4" />
                <span>Create Assignment</span>
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          {showStats && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Total Subjects</p>
                    <p className="text-2xl font-bold text-white">
                      {/* {filteredSubjects?.length} */}
                    </p>
                  </div>
                  <BookOpen className="w-8 h-8 text-purple-400/60" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Total Students</p>
                    <p className="text-2xl font-bold text-white">
                      {teacherStats?.totalStudents}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-400/60" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Avg Score</p>
                    <p className="text-2xl font-bold text-white">
                      {teacherStats?.averageScore}%
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-green-400/60" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Completion</p>
                    <p className="text-2xl font-bold text-white">
                      {teacherStats?.completionRate}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-orange-400/60" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Pending</p>
                    <p className="text-2xl font-bold text-white">
                      {teacherStats?.pendingEvaluations}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-yellow-400/60" />
                </div>
              </div>
              <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-white/60">Assignments</p>
                    <p className="text-2xl font-bold text-white">
                      {teacherStats?.totalAssignments}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-cyan-400/60" />
                </div>
              </div>
            </div>
          )}

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-white/60" />
              <div className="flex flex-wrap gap-2">
                {["all", "active", "completed"].map((f) => (
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
              {/* Showing {filteredSubjects?.length} of {subjects?.length || 0}{" "} */}
              subjects
            </div>
          </div>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Subjects List - Left Column */}
          <div className="lg:col-span-2">
            <div className="space-y-6">
              {filteredSubjects?.map((subject, index) => {
                const stats = getSubjectStats(subject);
                const color = getSubjectColor(index);

                return (
                  <div
                    key={subject?._id}
                    onClick={() => handleSubjectClick(subject?._id)}
                    className="group relative bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
                  >
                    {/* Gradient Accent */}
                    <div
                      className={`absolute top-0 left-0 w-2 h-full bg-gradient-to-b ${color} opacity-60`}
                    ></div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-4">
                          <div
                            className={`p-3 rounded-xl bg-gradient-to-r ${color} bg-opacity-20 border border-white/10`}
                          >
                            {getSubjectIcon(subject?.name)}
                          </div>
                          <div>
                            <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors">
                              {subject?.name}
                            </h3>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-sm text-white/60">
                                {subject?.courseCode}
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-white/5 text-white/40">
                                {subject?.credit || 3} Credits
                              </span>
                              <span className="text-xs px-2 py-1 rounded-full bg-gradient-to-r from-green-600/10 to-emerald-600/10 text-green-400">
                                {stats?.completion}% Complete
                              </span>
                            </div>
                          </div>
                        </div>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200">
                          <MoreVertical className="w-5 h-5 text-white/60" />
                        </button>
                      </div>

                      {/* Progress Stats */}
                      <div className="grid grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 rounded-lg bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {stats?.totalStudents}
                          </div>
                          <div className="text-xs text-white/60 mt-1">
                            Students
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/5">
                          <div className="text-lg font-bold text-white">
                            {stats?.assignments}
                          </div>
                          <div className="text-xs text-white/60 mt-1">
                            Assignments
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/5">
                          <div className="text-lg font-bold text-yellow-400">
                            {stats?.pending}
                          </div>
                          <div className="text-xs text-white/60 mt-1">
                            Pending
                          </div>
                        </div>
                        <div className="text-center p-3 rounded-lg bg-white/5">
                          <div className="text-lg font-bold text-green-400">
                            {stats?.avgScore}%
                          </div>
                          <div className="text-xs text-white/60 mt-1">
                            Avg Score
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      <div className="mb-4">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-white/60">
                            Overall Progress
                          </span>
                          <span className="text-white">
                            {stats?.completion}%
                          </span>
                        </div>
                        <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                          <div
                            className={`h-full rounded-full bg-gradient-to-r ${color} transition-all duration-500`}
                            style={{ width: `${stats?.completion}%` }}
                          ></div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex items-center justify-between pt-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Calendar className="w-4 h-4" />
                          <span>
                            Last updated: {new Date().toLocaleDateString()}
                          </span>
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border border-white/10 text-purple-300 hover:text-white transition-all duration-200">
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Empty State */}
              {filteredSubjects?.length === 0 && (
                <div className="text-center py-16 rounded-2xl border-2 border-dashed border-white/10 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/10 flex items-center justify-center">
                    <BookOpen className="w-12 h-12 text-white/40" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    No subjects found
                  </h3>
                  <p className="text-white/60 max-w-md mx-auto">
                    {searchTerm
                      ? `No subjects match "${searchTerm}"`
                      : "You are not assigned to any subjects yet."}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Recent Activity */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-orange-400" />
                  Recent Activity
                </h3>
                <button className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                  View All
                </button>
              </div>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-all duration-200"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`p-2 rounded-lg ${
                          activity.type === "grading"
                            ? "bg-green-500/10"
                            : activity.type === "create"
                            ? "bg-blue-500/10"
                            : activity.type === "submission"
                            ? "bg-purple-500/10"
                            : "bg-orange-500/10"
                        }`}
                      >
                        {activity.type === "grading" && (
                          <Award className="w-4 h-4 text-green-400" />
                        )}
                        {activity.type === "create" && (
                          <FileText className="w-4 h-4 text-blue-400" />
                        )}
                        {activity.type === "submission" && (
                          <Upload className="w-4 h-4 text-purple-400" />
                        )}
                        {activity.type === "support" && (
                          <MessageSquare className="w-4 h-4 text-orange-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {activity.action}
                        </p>
                        <p className="text-xs text-white/60 mt-1">
                          {activity.subject} • {activity.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Insights */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-green-400" />
                Performance Insights
              </h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20">
                  <div className="text-sm font-medium text-white mb-1">
                    Top Performing Subject
                  </div>
                  <div className="text-2xl font-bold text-green-400">
                    Data Structures
                  </div>
                  <div className="text-xs text-green-400/80 mt-1">
                    Avg Score: 89%
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-600/10 border border-blue-500/20">
                  <div className="text-sm font-medium text-white mb-1">
                    Most Engaged
                  </div>
                  <div className="text-2xl font-bold text-blue-400">
                    Algorithms
                  </div>
                  <div className="text-xs text-blue-400/80 mt-1">
                    95% Submission Rate
                  </div>
                </div>
                <div className="p-4 rounded-lg bg-gradient-to-r from-purple-600/10 to-pink-600/10 border border-purple-500/20">
                  <div className="text-sm font-medium text-white mb-1">
                    Quick Actions
                  </div>
                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-all duration-200">
                      Generate Report
                    </button>
                    <button className="flex-1 px-3 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-sm transition-all duration-200">
                      Schedule Class
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
