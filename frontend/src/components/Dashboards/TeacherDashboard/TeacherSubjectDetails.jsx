import React, { useEffect, useState } from "react";
import { useAsyncError, useNavigate, useParams } from "react-router-dom";
import {
  AlertCircle,
  Award,
  BarChart3,
  Bell,
  BookOpen,
  Calendar,
  CalendarDays,
  CheckCircle,
  ChevronRight,
  Clock,
  Download,
  Edit,
  Eye,
  FileText,
  FileUp,
  Filter,
  Layers,
  Link,
  LogOut,
  Plus,
  Search,
  Settings,
  TrendingUp,
  Trash2,
  Upload,
  User,
  Users,
  UserPlus,
  X,
} from "lucide-react";

import { useAuth } from "../../../context/AuthContext";
import { useTeacher } from "../../../context/TeacherContext";

const INPUT_MODE = {
  SINGLE: "single",
  MULTIPLE: "multiple",
};

const EnrollmentModal = ({ onClose }) => {
  const [inputMode, setInputMode] = useState(INPUT_MODE.SINGLE);
  const [singleInput, setSingleInput] = useState("");
  const [multipleInput, setMultipleInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isValid, setIsValid] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate and process input
      let enrollments = [];
      if (inputMode === INPUT_MODE.SINGLE) {
        if (!singleInput.trim()) {
          throw new Error("Please enter an enrollment number");
        }
        enrollments = [singleInput.trim()];
      } else {
        if (!multipleInput.trim()) {
          throw new Error("Please enter enrollment numbers");
        }
        enrollments = multipleInput
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e);
      }

      // Validate format (example: EN123456)
      const enrollmentPattern = /^[A-Z]{2}\d{6}$/;
      const invalidEnrollments = enrollments.filter(
        (e) => !enrollmentPattern.test(e)
      );

      if (invalidEnrollments.length > 0) {
        setIsValid(false);
        throw new Error(
          `Invalid enrollment format: ${invalidEnrollments.join(", ")}`
        );
      }

      setIsValid(true);

      // Simulate API call
      let res = await fetch("http://localhost:3000/teacher/InviteStudents", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(enrollments),
      });
      res = await res.json();
      if (res.success) {
        console.log("Submitting enrollments:", enrollments);
      } else {
        console.log("Something Went Wrong:", res?.message);
      }

      // Add your API call here

      // Reset form after successful submission
      setTimeout(() => {
        setSingleInput("");
        setMultipleInput("");
        setIsValid(null);
        onClose?.();
      }, 1500);
    } catch (error) {
      console.error("Error:", error);
      setIsValid(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      {/* Modal Container */}
      <div className="relative w-full max-w-2xl">
        {/* Glow Effect */}
        <div className="absolute -inset-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 rounded-3xl blur-2xl opacity-60 animate-pulse"></div>

        {/* Modal Content */}
        <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 shadow-2xl overflow-hidden">
          {/* Modal Header */}
          <div className="p-6 border-b border-white/10">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                  <UserPlus className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    Add Students
                  </h2>
                  <p className="text-white/60 text-sm">
                    Enroll students to this subject
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              >
                <X className="w-5 h-5 text-white/60 hover:text-white" />
              </button>
            </div>
          </div>

          {/* Mode Selector */}
          <div className="p-6 border-b border-white/10">
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => setInputMode(INPUT_MODE.SINGLE)}
                className={`group flex-1 p-4 rounded-xl border transition-all duration-300 ${
                  inputMode === INPUT_MODE.SINGLE
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/50 shadow-lg shadow-purple-500/10"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      inputMode === INPUT_MODE.SINGLE
                        ? "bg-gradient-to-r from-purple-600 to-blue-600"
                        : "bg-white/5"
                    }`}
                  >
                    <User
                      className={`w-5 h-5 ${
                        inputMode === INPUT_MODE.SINGLE
                          ? "text-white"
                          : "text-white/60"
                      }`}
                    />
                  </div>
                  <div className="text-left">
                    <h3
                      className={`font-medium ${
                        inputMode === INPUT_MODE.SINGLE
                          ? "text-white"
                          : "text-white/80"
                      }`}
                    >
                      Add Single Student
                    </h3>
                    <p className="text-sm text-white/60">
                      Enter one enrollment number
                    </p>
                  </div>
                  {inputMode === INPUT_MODE.SINGLE && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                  )}
                </div>
              </button>

              <button
                onClick={() => setInputMode(INPUT_MODE.MULTIPLE)}
                className={`group flex-1 p-4 rounded-xl border transition-all duration-300 ${
                  inputMode === INPUT_MODE.MULTIPLE
                    ? "bg-gradient-to-r from-purple-600/20 to-blue-600/20 border-purple-500/50 shadow-lg shadow-purple-500/10"
                    : "bg-white/5 border-white/10 hover:bg-white/10"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`p-3 rounded-lg transition-all duration-300 ${
                      inputMode === INPUT_MODE.MULTIPLE
                        ? "bg-gradient-to-r from-purple-600 to-blue-600"
                        : "bg-white/5"
                    }`}
                  >
                    <Users
                      className={`w-5 h-5 ${
                        inputMode === INPUT_MODE.MULTIPLE
                          ? "text-white"
                          : "text-white/60"
                      }`}
                    />
                  </div>
                  <div className="text-left">
                    <h3
                      className={`font-medium ${
                        inputMode === INPUT_MODE.MULTIPLE
                          ? "text-white"
                          : "text-white/80"
                      }`}
                    >
                      Add Multiple Students
                    </h3>
                    <p className="text-sm text-white/60">
                      Bulk upload enrollment numbers
                    </p>
                  </div>
                  {inputMode === INPUT_MODE.MULTIPLE && (
                    <CheckCircle className="w-5 h-5 text-green-400 ml-auto" />
                  )}
                </div>
              </button>
            </div>
          </div>

          {/* Input Section */}
          <div className="p-6">
            <form onSubmit={handleSubmit}>
              {inputMode === INPUT_MODE.SINGLE && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Enrollment Number
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={singleInput}
                        onChange={(e) => {
                          setSingleInput(e.target.value);
                          setIsValid(null);
                        }}
                        placeholder="Enter student enrollment number (e.g., EN123456)"
                        className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent transition-all duration-300"
                        disabled={isSubmitting}
                      />
                      <User className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-white/40" />
                    </div>
                    <p className="text-xs text-white/40 mt-2">
                      Format: EN followed by 6 digits (e.g., EN123456)
                    </p>
                  </div>
                </div>
              )}

              {inputMode === INPUT_MODE.MULTIPLE && (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-white/60 mb-2">
                      Multiple Enrollment Numbers
                    </label>
                    <div className="relative">
                      <textarea
                        value={multipleInput}
                        onChange={(e) => {
                          setMultipleInput(e.target.value);
                          setIsValid(null);
                        }}
                        placeholder="Enter enrollment numbers separated by commas (e.g., EN123456, EN789012, EN345678)"
                        className="w-full px-4 py-3 pl-12 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none min-h-[120px] transition-all duration-300"
                        disabled={isSubmitting}
                      />
                      <Users className="absolute left-4 top-4 w-5 h-5 text-white/40" />
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/40 mt-2">
                      <AlertCircle className="w-3 h-3" />
                      <span>Separate multiple enrollments with commas</span>
                    </div>
                  </div>

                  {/* File Upload Option */}
                  <div className="mt-4">
                    <div className="border-2 border-dashed border-white/10 rounded-xl p-6 text-center hover:border-purple-500/30 transition-all duration-300 cursor-pointer">
                      <Upload className="w-8 h-8 text-white/40 mx-auto mb-3" />
                      <p className="text-sm text-white/60 mb-2">
                        Or upload a CSV file with enrollment numbers
                      </p>
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:bg-white/10 transition-all duration-200 text-sm"
                      >
                        <FileText className="w-4 h-4 inline mr-2" />
                        Choose CSV File
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Validation Messages */}
              {isValid === true && (
                <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-green-600/10 to-emerald-600/10 border border-green-500/20">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                    <span className="text-sm text-green-400">
                      Enrollment numbers are valid!
                    </span>
                  </div>
                </div>
              )}

              {isValid === false && (
                <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-red-600/10 to-orange-600/10 border border-red-500/20">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 text-red-400" />
                    <span className="text-sm text-red-400">
                      Please check the enrollment format
                    </span>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/10">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-3 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10 transition-all duration-200 font-medium"
                  disabled={isSubmitting}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      Processing...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2">
                      Add Students
                      <ChevronRight className="w-4 h-4" />
                    </div>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Footer Help Text */}
          <div className="px-6 py-4 bg-white/2 border-t border-white/10">
            <p className="text-center text-sm text-white/40">
              Students will receive email notifications upon successful
              enrollment
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const TeacherSubjectDetails = () => {
  const navigate = useNavigate();
  const { subjectId } = useParams();
  const [assignments, setAssignments] = useState([]);
  const { user } = useAuth();
  const { subjects, refetchTeacherData } = useTeacher();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [showCreateAssignment, setShowCreateAssignment] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [currSubject, seCurrSubject] = useState({});
  const [newAssignment, setNewAssignment] = useState({
    name: "",
    description: "",
    dueDate: "",
    marks: "",
    submissionType: "file",
    instructions: "",
  });
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (subjects) {
      let subject = subjects.filter((sub) => sub._id === subjectId);
      if (subject) {
        setAssignments(subject.assignments || []);
        seCurrSubject(subject);
      }
    }
  }, [subjects, subjectId]);

  console.log(subjects, "from teacher dash");

  const handleSeeDetails = (assignmentId) => {
    navigate(`/teacher/assignment/${assignmentId}`);
  };

  const handleCreateAssignment = async (e) => {
    e.preventDefault();
    // Add your assignment creation logic here
    console.log("Creating assignment:", newAssignment);
    let res = await fetch("http://localhost:3000/teacher/addAssignment", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newAssignment),
    });
    res = await res.json();
    console.log(res);
    // Reset form and close modal
    if (res.success) {
      if (refetchTeacherData) {
        await refetchTeacherData();
      }
      alert("Assignment created successfully!");
    } else {
      alert("error in assignment creation!");
      return;
    }
    setNewAssignment({
      name: "",
      description: "",
      dueDate: "",
      marks: "",
      submissionType: "file",
      instructions: "",
    });

    setShowCreateAssignment(false);
    // Add toast notification
  };

  const filteredAssignments = assignments.filter((assignment) => {
    const matchesSearch = assignment.name
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesFilter =
      filter === "all" ||
      (filter === "pending" && assignment.remaining > 0) ||
      (filter === "completed" && assignment.remaining === 0);
    return matchesSearch && matchesFilter;
  });
  console.log(assignments);
  const totalSubmissions = assignments.reduce(
    (sum, a) => sum + (a.submissions.length || 0),
    0
  );
  const evaluatedSubmissions = assignments.reduce((sum, a) => {
    let count = 0;
    a?.submissions?.map((sub) => {
      if (sub.status === "Completed") count++;
    });

    return sum + (count || 0);
  }, 0);

  const pendingEvaluations = totalSubmissions - evaluatedSubmissions;

  //Inviting Student

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
                  <BookOpen className="w-5 h-5 text-white" />
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
                  placeholder="Search assignments..."
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
                        <button
                          onClick={() => navigate("/teacher/profile")}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <User className="w-4 h-4" />
                          <span className="text-sm">My Profile</span>
                        </button>
                        <button
                          onClick={() => navigate("/teacher/settings")}
                          className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-white/80 hover:text-white hover:bg-white/10 transition-all duration-200"
                        >
                          <Settings className="w-4 h-4" />
                          <span className="text-sm">Settings</span>
                        </button>
                        <button
                          onClick={() => navigate("/login")}
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
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Left Sidebar */}
          <div className="lg:w-64 space-y-6">
            {/* Quick Stats */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-400" />
                Overview
              </h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">
                    Total Assignments
                  </span>
                  <span className="text-white font-bold">
                    {assignments.length}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">
                    Total Submissions
                  </span>
                  <span className="text-blue-400 font-bold">
                    {totalSubmissions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">Evaluated</span>
                  <span className="text-green-400 font-bold">
                    {evaluatedSubmissions}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-white/60 text-sm">
                    Pending Evaluation
                  </span>
                  <span className="text-yellow-400 font-bold">
                    {pendingEvaluations}
                  </span>
                </div>
              </div>
            </div>

            {/* Subject Info */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                Current Subject
              </h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-gradient-to-r from-blue-600/10 to-cyan-600/10">
                  <p className="text-sm font-medium text-white">
                    {currSubject?.name || "No Subject Assigned"}
                  </p>
                  <p className="text-xs text-white/60 mt-1">
                    {currSubject?.courseCode || "N/A"}
                  </p>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Users className="w-4 h-4" />
                  <span>Students: {currSubject?.Student?.length || "N/A"}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-white/60">
                  <Layers className="w-4 h-4" />
                  <span>Sections: {user?.sectionsAlloted || "N/A"}</span>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
              <h3 className="text-lg font-bold text-white mb-4">
                Quick Actions
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setShowCreateAssignment(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border border-white/10 text-white transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Create Assignment</span>
                </button>
                <button
                  onClick={() => setShowModal(true)}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200"
                >
                  <Plus className="w-4 h-4" />
                  <span className="text-sm">Invite Student</span>
                </button>
                <button className="w-full flex items-center gap-3 px-4 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200">
                  <CalendarDays className="w-4 h-4" />
                  <span className="text-sm">View Calendar</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            {/* Header Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
                <div>
                  <h2 className="text-3xl font-bold text-white">
                    Teacher Dashboard: {user?.name || "Professor"}
                  </h2>
                  <p className="text-white/60 mt-2 flex items-center">
                    <Layers className="h-4 w-4 mr-2 text-indigo-400" />
                    Assigned Sections: {user?.sectionsAlloted || "N/A"}
                  </p>
                  <p className="text-white/60 mt-2 flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-indigo-400" />
                    Current Subject:{" "}
                    {currSubject?.name || "No Subject Assigned"}
                  </p>
                </div>
                <button
                  onClick={() => setShowCreateAssignment(true)}
                  className="group relative px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300 hover:scale-105"
                >
                  <span className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Create New Assignment
                  </span>
                  <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 blur-md opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
                </button>
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
                  Showing {filteredAssignments.length} of {assignments.length}{" "}
                  assignments
                </div>
              </div>
            </div>

            {/* Assignments Grid */}
            <div className="space-y-5">
              {filteredAssignments.map((assignment, index) => {
                const submissions = assignment.submissions || [];

                const submissionCount = submissions.length;

                const evaluatedCount = submissions.reduce(
                  (sum, sub) => sum + (sub.status === "Completed" ? 1 : 0),
                  0
                );

                const remainingCount = submissionCount - evaluatedCount;

                const isCompleted =
                  assignment.remaining === 0 && assignment.totalSubmitted > 0;

                return (
                  <div
                    key={assignment.id}
                    className="group relative bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-purple-500/50 hover:shadow-2xl hover:shadow-purple-500/10 transition-all duration-300 overflow-hidden"
                  >
                    {/* Header */}
                    <div className="p-5 border-b border-white/10 flex justify-between items-center">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10">
                            <FileText className="h-5 w-5 text-purple-400" />
                          </div>
                          <div>
                            <h4 className="text-lg font-bold text-white">
                              Assignment {index + 1}: {assignment.name}
                            </h4>
                            <p className="text-sm text-white/60 mt-1">
                              Due Date: {assignment.dueDate || "Not set"}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {isCompleted && (
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            <CheckCircle className="h-3 w-3 mr-1" /> Completed
                          </span>
                        )}
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200">
                          <Eye className="h-4 w-4 text-white/80" />
                        </button>
                        <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-200">
                          <Edit className="h-4 w-4 text-white/80" />
                        </button>
                      </div>
                    </div>

                    {/* Stats */}
                    <div className="p-5">
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-4 rounded-xl bg-white/5">
                          <div className="text-2xl font-bold text-blue-400">
                            {submissionCount}
                          </div>
                          <div className="text-xs text-white/60 mt-1 flex items-center justify-center gap-1">
                            <FileUp className="h-3 w-3" /> Submitted
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-white/5">
                          <div className="text-2xl font-bold text-green-400">
                            {evaluatedCount}
                          </div>
                          <div className="text-xs text-white/60 mt-1 flex items-center justify-center gap-1">
                            <CheckCircle className="h-3 w-3" /> Evaluated
                          </div>
                        </div>
                        <div className="text-center p-4 rounded-xl bg-white/5">
                          <div
                            className={`text-2xl font-bold ${
                              remainingCount > 0
                                ? "text-yellow-400"
                                : "text-gray-400"
                            }`}
                          >
                            {remainingCount}
                          </div>
                          <div className="text-xs text-white/60 mt-1 flex items-center justify-center gap-1">
                            <Clock className="h-3 w-3" /> Pending
                          </div>
                        </div>
                      </div>

                      {/* Progress Bar */}
                      {submissionCount > 0 && (
                        <div className="mt-4">
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-white/60">
                              Evaluation Progress
                            </span>
                            <span className="text-white">
                              {Math.round(
                                (evaluatedCount / submissionCount) * 100
                              ) || 0}
                              %
                            </span>
                          </div>
                          <div className="h-2 rounded-full bg-white/10 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-500"
                              style={{
                                width: `${
                                  (evaluatedCount / submissionCount) * 100 || 0
                                }%`,
                              }}
                            ></div>
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Actions Footer */}
                    <div className="p-4 border-t border-white/10 flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <Calendar className="h-4 w-4 text-white/40" />
                        <span className="text-sm text-white/60">
                          Created: {assignment.createdAt || "N/A"}
                        </span>
                      </div>
                      <button
                        onClick={() => handleSeeDetails(assignment._id)}
                        className="group flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/10 to-blue-600/10 hover:from-purple-600/20 hover:to-blue-600/20 border border-white/10 text-purple-300 hover:text-white transition-all duration-200"
                      >
                        View Details
                        <ChevronRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                      </button>
                    </div>
                  </div>
                );
              })}

              {/* Empty State */}
              {filteredAssignments.length === 0 && (
                <div className="text-center py-16 rounded-2xl border-2 border-dashed border-white/10">
                  <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/10 flex items-center justify-center">
                    <FileText className="w-12 h-12 text-white/40" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    No assignments found
                  </h3>
                  <p className="text-white/60 max-w-md mx-auto mb-6">
                    {searchTerm
                      ? `No assignments match "${searchTerm}"`
                      : "Create your first assignment to get started."}
                  </p>
                  <button
                    onClick={() => setShowCreateAssignment(true)}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-300"
                  >
                    <Plus className="w-5 h-5" />
                    Create Your First Assignment
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModal && <EnrollmentModal onClose={() => setShowModal(false)} />}

      {/* Create Assignment Modal */}
      {showCreateAssignment && (
        <>
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50"
            onClick={() => setShowCreateAssignment(false)}
          />
          <div className="fixed inset-0 flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl border border-white/10 shadow-2xl">
                {/* Modal Header */}
                <div className="p-6 border-b border-white/10">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600">
                        <Plus className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-2xl font-bold text-white">
                          Create New Assignment
                        </h3>
                        <p className="text-white/60 text-sm">
                          Fill in the details below
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => setShowCreateAssignment(false)}
                      className="p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
                    >
                      <span className="text-2xl text-white/60 hover:text-white">
                        ×
                      </span>
                    </button>
                  </div>
                </div>

                {/* Modal Form */}
                <form
                  onSubmit={handleCreateAssignment}
                  className="p-6 space-y-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60">
                        Assignment Title *
                      </label>
                      <input
                        type="text"
                        value={newAssignment.name}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            name: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="Enter assignment title"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60">
                        Total Marks *
                      </label>
                      <input
                        type="number"
                        value={newAssignment.marks}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            marks: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        placeholder="Enter total marks"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60">
                        Due Date *
                      </label>
                      <input
                        type="date"
                        value={newAssignment.dueDate}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            dueDate: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-sm font-medium text-white/60">
                        Submission Type
                      </label>
                      <select
                        value={newAssignment.submissionType}
                        onChange={(e) =>
                          setNewAssignment({
                            ...newAssignment,
                            submissionType: e.target.value,
                          })
                        }
                        className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                      >
                        <option value="file">File Upload</option>
                        <option value="text">Text Submission</option>
                        <option value="both">Both</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">
                      Description
                    </label>
                    <textarea
                      value={newAssignment.description}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          description: e.target.value,
                        })
                      }
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
                      placeholder="Describe the assignment..."
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium text-white/60">
                      Instructions
                    </label>
                    <textarea
                      value={newAssignment.instructions}
                      onChange={(e) =>
                        setNewAssignment({
                          ...newAssignment,
                          instructions: e.target.value,
                        })
                      }
                      rows="3"
                      className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent resize-none"
                      placeholder="Add submission instructions..."
                    />
                  </div>

                  {/* Modal Footer */}
                  <div className="flex justify-end gap-4 pt-6 border-t border-white/10">
                    <button
                      type="button"
                      onClick={() => setShowCreateAssignment(false)}
                      className="px-6 py-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all duration-200"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-6 py-3 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium hover:shadow-2xl hover:shadow-purple-500/30 transition-all duration-200"
                    >
                      Create Assignment
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default TeacherSubjectDetails;
