import React, { useState, useEffect } from "react";
import {
  Users,
  User,
  Clock,
  Settings,
  Bell,
  Lock,
  RefreshCw,
  Layers,
  BookOpen,
  Plus,
  Trash2,
  Edit3,
  Search,
  Filter,
  BarChart3,
  Download,
  Eye,
  Shield,
  Award,
  TrendingUp,
  AlertCircle,
  Mail,
  Phone,
  Calendar,
  ChevronRight,
  ChevronLeft,
  LogOut,
  Home,
  FileText,
  Database,
  Cpu,
  Server,
  Activity,
  CheckCircle,
  XCircle,
  AlertTriangle,
  UserPlus,
  UserCheck,
  UserX,
} from "lucide-react";
import Card from "../Shared/Card";
import { useAdmin } from "../../../context/AdminContext";

const AdminDashboard = () => {
  // Context data
  const { subjects, teachers, students } = useAdmin();

  // Local State
  const [subjectsData, setsubjectsData] = useState([]);
  const [teacherData, setTeachersData] = useState([]);
  const [allocations, setAllocations] = useState([]);
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({
    totalStudents: 0,
    totalTeachers: 0,
    pendingEnrollments: 0,
    systemStatus: "Operational",
    activeUsers: 0,
    storageUsed: "45%",
    avgResponseTime: "120ms",
  });

  const [announcementText, setAnnouncementText] = useState("");
  const [userToBlock, setUserToBlock] = useState("");
  const [announcements, setAnnouncements] = useState([]);
  const [newSubject, setNewSubject] = useState({
    name: "",
    code: "",
    credits: "",
  });
  const [newAllocation, setNewAllocation] = useState({
    teacherId: "",
    subjectId: "",
  });
  const [activeTab, setActiveTab] = useState("users");
  const [searchTerm, setSearchTerm] = useState("");
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    role: "student",
    enrollmentNumber: "",
  });
  const [filter, setFilter] = useState("all");

  // Main Effect: Process Data when Context loads
  useEffect(() => {
    if (subjects) {
      setsubjectsData(subjects);
      const newAllocations = [];
      subjects.forEach((subject) => {
        if (subject.allotedTeacher) {
          const teacherObj = Array.isArray(subject.allotedTeacher)
            ? subject.allotedTeacher[0]
            : subject.allotedTeacher;

          if (teacherObj) {
            newAllocations.push({
              id: subject._id,
              teacherId: teacherObj._id,
              teacherName: teacherObj.name,
              subjectId: subject.courseCode,
              subjectName: subject.name,
            });
          }
        }
      });
      setAllocations(newAllocations);
    }

    if (teachers) {
      setTeachersData(teachers);
    }

    if (teachers || students) {
      const formattedTeachers = (teachers || []).map((t) => ({
        id: t._id,
        displayId: t.enrollmentNumber,
        name: t.name,
        role: "Teacher",
        email: t.email || "N/A",
        status: "Active",
        lastActive: "2 hours ago",
      }));

      const formattedStudents = (students || []).map((s) => ({
        id: s._id,
        displayId: s.enrollmentNumber,
        name: s.name,
        role: "Student",
        email: s.email || "N/A",
        status: "Active",
        lastActive: "1 day ago",
      }));

      setUsers([...formattedTeachers, ...formattedStudents]);

      setStats((prev) => ({
        ...prev,
        totalStudents: students?.length || 0,
        totalTeachers: teachers?.length || 0,
        activeUsers: (students?.length || 0) + (teachers?.length || 0),
        pendingEnrollments: 8, // Static for now
      }));
    }

    // Load announcements
    setAnnouncements([
      {
        id: 1,
        date: "2025-11-28",
        content:
          "System maintenance scheduled for Dec 5th, 1 AM - 3 AM. Submissions will be blocked.",
        type: "warning",
      },
      {
        id: 2,
        date: "2025-11-20",
        content:
          "New plagiarism detection model activated. Please review the updated policy.",
        type: "info",
      },
      {
        id: 3,
        date: "2025-11-15",
        content:
          "Database backup completed successfully. All systems operational.",
        type: "success",
      },
    ]);
  }, [subjects, teachers, students]);

  // Filter users
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      searchTerm === "" ||
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.displayId.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" || user.role.toLowerCase() === filter;
    return matchesSearch && matchesFilter;
  });

  // Handlers
  const handleAnnouncement = () => {
    if (announcementText.trim()) {
      const newAnnouncement = {
        id: Date.now(),
        date: new Date().toISOString().split("T")[0],
        content: announcementText,
        type: "info",
      };
      setAnnouncements([newAnnouncement, ...announcements]);
      setAnnouncementText("");
      alert("Announcement Posted Successfully!");
    }
  };

  const toggleUserStatus = (id) => {
    setUsers(
      users.map((user) =>
        user.id === id
          ? { ...user, status: user.status === "Active" ? "Blocked" : "Active" }
          : user,
      ),
    );
  };

  const addSubject = async () => {
    if (newSubject.name && newSubject.code && newSubject.credits) {
      const subjectPayload = {
        name: newSubject.name,
        code: newSubject.code.toUpperCase(),
        credits: parseInt(newSubject.credits),
      };

      try {
        let res = await fetch("http://localhost:3000/admin/addSubject", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(subjectPayload),
        });

        const data = await res.json();

        if (data.success) {
          const newSubjectForState = {
            id: data.data?._id || Date.now(),
            _id: data.data?._id || Date.now(),
            name: newSubject.name,
            courseCode: newSubject.code.toUpperCase(),
            credit: parseInt(newSubject.credits),
          };
          setsubjectsData((prev) => [...prev, newSubjectForState]);
          setNewSubject({ name: "", code: "", credits: "" });
          alert("Subject added successfully!");
        } else {
          setNewSubject({ name: "", code: "", credits: "" });
          alert("Something Wrong!");
        }
      } catch (error) {
        console.error(error);
        alert("Server error");
      }
    } else {
      alert("Please fill in all subject fields.");
    }
  };

  const deleteSubject = (id) => {
    const updatedAllocations = allocations.filter((a) => a.subjectId !== id);
    setAllocations(updatedAllocations);
    setsubjectsData((prev) => prev.filter((s) => s.id !== id && s._id !== id));
    alert("Subject deleted successfully!");
  };

  const addAllocation = async () => {
    if (!newAllocation.teacherId || !newAllocation.subjectId) {
      alert("Please select both a Teacher and a Subject.");
      return;
    }

    const teacher = teacherData.find(
      (t) => String(t._id) === String(newAllocation.teacherId),
    );
    const subject = subjectsData.find(
      (s) => String(s._id) === String(newAllocation.subjectId),
    );

    if (teacher && subject) {
      try {
        let res = await fetch("http://localhost:3000/admin/allocation", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            teacherId: newAllocation.teacherId,
            subjectId: newAllocation.subjectId,
          }),
        });

        const data = await res.json();
        console.log(data);

        if (data.success) {
          const newAllocationEntry = {
            id: Date.now(),
            teacherId: teacher._id,
            teacherName: teacher.name,
            subjectId: subject.courseCode,
            subjectName: subject.name,
          };
          setAllocations((prev) => [...prev, newAllocationEntry]);
          setNewAllocation({ teacherId: "", subjectId: "" });
          alert(data.message);
        } else {
          alert(data.message);
        }
      } catch (error) {
        console.error(error);
        alert("Server error.");
      }
    } else {
      alert("Error: Selected teacher or subject not found.");
    }
  };

  const deleteAllocation = (id) => {
    setAllocations(allocations.filter((allocation) => allocation.id !== id));
    alert("Allocation removed successfully!");
  };

  
  const exportData = () => {
    const data = {
      users,
      subjects: subjectsData,
      allocations,
      stats,
    };
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `admin-data-${new Date().toISOString().split("T")[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative z-10 min-h-screen bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 text-white font-sans">
      {/* Top Navigation Bar */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg blur-md opacity-70"></div>
                <div className="relative w-10 h-10 flex items-center justify-center rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                  <Shield className="w-5 h-5 text-white" />
                </div>
              </div>
              <div className="flex flex-col">
                <h1 className="text-xl font-bold bg-gradient-to-r from-white via-purple-100 to-blue-100 bg-clip-text text-transparent">
                  SmartEval
                </h1>
                <span className="text-xs text-white/60 -mt-1">
                  Admin Portal
                </span>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search users, subjects..."
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
                      <span className="text-sm font-bold text-white">A</span>
                    </div>
                  </div>
                  <div className="hidden md:block text-left">
                    <span className="text-sm font-medium text-white block">
                      Admin
                    </span>
                    <span className="text-xs text-white/60">Administrator</span>
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
                              A
                            </span>
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              Administrator
                            </p>
                            <p className="text-xs text-white/60">
                              admin@smarteval.edu
                            </p>
                          </div>
                        </div>
                      </div>

                      <div className="p-2">
                        <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
                          <Settings className="w-4 h-4" />
                          <span className="text-sm">Settings</span>
                        </button>
                        <button className="w-full flex items-center gap-3 px=3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200">
                          <Activity className="w-4 h-4" />
                          <span className="text-sm">System Logs</span>
                        </button>
                        <button
                          onClick={() => {
                            /* Logout logic */
                          }}
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

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Header with Tabs */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
            <div>
              <h2 className="text-3xl font-bold text-white">
                Administrator Panel
              </h2>
              <p className="text-white/60 mt-2">
                Manage users, system settings, and academic configurations
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={exportData}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200"
              >
                <Download className="w-4 h-4" />
                <span className="text-sm">Export Data</span>
              </button>
             
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex flex-wrap gap-2 border-b border-white/10 pb-2">
            {[
              {
                id: "users",
                label: "Users",
                icon: <Users className="w-4 h-4" />,
              },
              {
                id: "subjects",
                label: "Subjects",
                icon: <BookOpen className="w-4 h-4" />,
              },
              {
                id: "allocations",
                label: "Allocations",
                icon: <Layers className="w-4 h-4" />,
              },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeTab === tab.id
                    ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/20"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
        {/* Users Tab Content */}
        {activeTab === "users" && (
          <div className="space-y-6">
            {/* Users Table */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      User Management
                    </h3>
                    <p className="text-white/60 text-sm">
                      Manage all user accounts and permissions
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex gap-2">
                      <button
                        onClick={() => setFilter("all")}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                          filter === "all"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        All
                      </button>
                      <button
                        onClick={() => setFilter("student")}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                          filter === "student"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        Students
                      </button>
                      <button
                        onClick={() => setFilter("teacher")}
                        className={`px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
                          filter === "teacher"
                            ? "bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                            : "bg-white/5 text-white/60 hover:bg-white/10"
                        }`}
                      >
                        Teachers
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        User
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Role
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        ID
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Last Active
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {filteredUsers.map((user) => (
                      <tr
                        key={user.id}
                        className="hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-white">
                                {user.name.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {user.name}
                              </div>
                              <div className="text-sm text-white/60">
                                {user.email}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.role === "Teacher"
                                ? "bg-indigo-500/10 text-indigo-400"
                                : "bg-emerald-500/10 text-emerald-400"
                            }`}
                          >
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/80">
                          {user.displayId}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              user.status === "Active"
                                ? "bg-green-500/10 text-green-400"
                                : "bg-red-500/10 text-red-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-white/60">
                          {user.lastActive}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            
                            <button
                              className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition-all duration-200"
                              title="View Details"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="px-6 py-4 border-t border-white/10 text-sm text-white/60">
                Showing {filteredUsers.length} of {users.length} users
              </div>
            </div>
          </div>
        )}

        {/* Subjects Tab Content */}
        {activeTab === "subjects" && (
          <div className="space-y-6">
            {/* Add Subject Panel */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-indigo-400" />
                Add New Subject
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Subject Name
                  </label>
                  <input
                    type="text"
                    value={newSubject.name}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    placeholder="e.g., Calculus I"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Subject Code
                  </label>
                  <input
                    type="text"
                    value={newSubject.code}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, code: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    placeholder="e.g., MATH101"
                  />
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Credits
                  </label>
                  <input
                    type="number"
                    value={newSubject.credits}
                    onChange={(e) =>
                      setNewSubject({ ...newSubject, credits: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                    placeholder="e.g., 3"
                  />
                </div>
              </div>
              <button
                onClick={addSubject}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:shadow-2xl hover:shadow-indigo-500/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Add Subject
              </button>
            </div>

            {/* Subjects List */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  All Subjects ({subjectsData.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Name
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Credits
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Allocated
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {subjectsData.map((subject) => {
                      const isAllocated = allocations.some(
                        (a) => a.subjectId === subject.courseCode,
                      );
                      return (
                        <tr
                          key={subject._id}
                          className="hover:bg-white/5 transition-colors duration-200"
                        >
                          <td className="px-6 py-4">
                            <span className="font-mono text-white">
                              {subject.courseCode}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="font-medium text-white">
                              {subject.name}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-sm">
                              {subject.credit} Credits
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-3 py-1 rounded-full text-sm ${
                                isAllocated
                                  ? "bg-green-500/10 text-green-400"
                                  : "bg-yellow-500/10 text-yellow-400"
                              }`}
                            >
                              {isAllocated ? "Allocated" : "Unallocated"}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <button
                                className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-white/80 transition-all duration-200"
                                title="Edit"
                              >
                                <Edit3 className="w-4 h-4" />
                              </button>
                              <button
                                onClick={() => deleteSubject(subject._id)}
                                className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all duration-200"
                                title="Delete"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Allocations Tab Content */}
        {activeTab === "allocations" && (
          <div className="space-y-6">
            {/* Add Allocation Panel */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h4 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                <Layers className="w-5 h-5 text-green-400" />
                Allocate Teacher to Subject
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Select Teacher
                  </label>
                  <select
                    value={newAllocation.teacherId}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        teacherId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  >
                    <option value="" className="text-gray-700">
                      Select Teacher
                    </option>
                    {teacherData.map((teacher) => (
                      <option
                        key={teacher._id}
                        value={teacher._id}
                        className="text-gray-700"
                      >
                        {teacher.name} ({teacher.enrollmentNumber})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">
                    Select Subject
                  </label>
                  <select
                    value={newAllocation.subjectId}
                    onChange={(e) =>
                      setNewAllocation({
                        ...newAllocation,
                        subjectId: e.target.value,
                      })
                    }
                    className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                  >
                    <option value="" className="text-gray-700">
                      Select Subject
                    </option>
                    {subjectsData.map((subject) => (
                      <option
                        key={subject._id}
                        value={subject._id}
                        className="text-gray-700"
                      >
                        {subject.name} ({subject.courseCode})
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <button
                onClick={addAllocation}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:shadow-2xl hover:shadow-green-500/30 transition-all duration-200 flex items-center justify-center gap-2"
              >
                <Layers className="w-5 h-5" />
                Allocate Teacher
              </button>
            </div>

            {/* Allocations List */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white">
                  Teacher Allocations ({allocations.length})
                </h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="border-b border-white/10">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Teacher
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Subject
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Code
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-medium text-white/60 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/10">
                    {allocations.map((allocation) => (
                      <tr
                        key={allocation.id}
                        className="hover:bg-white/5 transition-colors duration-200"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 flex items-center justify-center">
                              <span className="text-sm font-bold text-white">
                                {allocation.teacherName.charAt(0)}
                              </span>
                            </div>
                            <div>
                              <div className="font-medium text-white">
                                {allocation.teacherName}
                              </div>
                              <div className="text-sm text-white/60">
                                Teacher
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-medium text-white">
                            {allocation.subjectName}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-purple-500/10 text-purple-400 text-sm">
                            {allocation.subjectId}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => deleteAllocation(allocation.id)}
                            className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all duration-200"
                            title="Remove Allocation"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}
      </div>

      
    </div>
  );
};

export default AdminDashboard;
