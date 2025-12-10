import React, { useState, useEffect } from "react";
import {
  X,
  Code,
  User,
  Clock,
  List,
  Star,
  Zap,
  Shield,
  RefreshCw,
  FileText,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Edit3,
} from "lucide-react";

// Modern InfoItem with better styling
const InfoItem = ({ label, value, icon: Icon, highlight }) => (
  <div
    className={`flex items-center space-x-3 p-3 rounded-xl transition-all duration-200 ${
      highlight
        ? "bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20"
        : "bg-gray-800/30 hover:bg-gray-800/50"
    }`}
  >
    <div
      className={`p-2 rounded-lg ${
        highlight
          ? "bg-gradient-to-br from-indigo-500 to-purple-500"
          : "bg-gray-700/50"
      }`}
    >
      <Icon
        className={`h-4 w-4 ${highlight ? "text-white" : "text-indigo-400"}`}
      />
    </div>
    <div className="flex-1 min-w-0">
      <span className="text-gray-400 text-xs uppercase tracking-wider font-semibold block truncate">
        {label}
      </span>
      <span className="text-white font-semibold text-sm truncate">{value}</span>
    </div>
  </div>
);

// Status badge component
const StatusBadge = ({ status }) => {
  const statusConfig = {
    Completed: {
      color: "bg-emerald-500/20 text-emerald-400 border-emerald-500/30",
      icon: CheckCircle,
    },
    "In Review": {
      color: "bg-amber-500/20 text-amber-400 border-amber-500/30",
      icon: Clock,
    },
    Fail: {
      color: "bg-rose-500/20 text-rose-400 border-rose-500/30",
      icon: AlertCircle,
    },
    Pass: {
      color: "bg-green-500/20 text-green-400 border-green-500/30",
      icon: CheckCircle,
    },
    Resubmit: {
      color: "bg-blue-500/20 text-blue-400 border-blue-500/30",
      icon: RefreshCw,
    },
  };

  const config = statusConfig[status] || statusConfig["In Review"];
  const Icon = config.icon;

  return (
    <div
      className={`inline-flex items-center px-3 py-1.5 rounded-full border ${config.color} text-xs font-semibold`}
    >
      <Icon className="h-3 w-3 mr-1.5" />
      {status}
    </div>
  );
};

const DetailsModal = ({
  open,
  children,
  student,
  userRole,
  onSubmitFeedback,
  onClose,
}) => {
  // Legacy Mode
  if (children) {
    if (!open) return null;
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/60 backdrop-blur-xl z-50 animate-in fade-in duration-300">
        <div className="bg-gray-900 p-6 rounded-2xl w-[420px] border border-gray-800 shadow-2xl">
          {children}
          <button
            onClick={onClose}
            className="mt-6 w-full py-3 bg-gradient-to-r from-gray-800 to-gray-900 text-white rounded-xl hover:from-gray-700 hover:to-gray-800 transition-all duration-200 border border-gray-700 font-medium"
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  // Dashboard Mode
  if (!student) return null;
  console.log("Student is ", student);

  const [isEditing, setIsEditing] = useState(false);
  const [teacherNotes, setTeacherNotes] = useState("");
  const [finalScore, setFinalScore] = useState(student.score || "");
  const [statusOverride, setStatusOverride] = useState(
    student.status || "In Review"
  );

  useEffect(() => {
    if (student) {
      setFinalScore(student.score || "");
      setStatusOverride(student.status || "In Review");
      setTeacherNotes(student.reviewMessage || "");
      setIsEditing(false);
    }
  }, [student]);

  const handleFinalize = async () => {
    const finalReport = {
      solutionId: student.solutionId,
      score: finalScore,
      status: statusOverride,
      reviewMessage: teacherNotes,
    };
    let res = await fetch("http://localhost:3000/teacher/addMarks", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(finalReport),
    });
    res = await res.json();
    if (res.success) {
      if (onSubmitFeedback) onSubmitFeedback(student.id, finalReport);
      setIsEditing(false);
      alert(res.message);
      return;
    }
    alert("Error in evaluation");
  };

  const aiReport = {
    plagiarism: student.plagiarismPercent || 0,
    similarity:
      (student.plagiarismPercent || 0) > 10
        ? "High similarity detected"
        : "Original content",
    confidence: (student.plagiarismPercent || 0) > 10 ? "Low" : "High",
    deductions: [student.feedback],
  };

  const isAlreadyCompleted = student.status === "Completed";
  const plagiarismHigh = aiReport.plagiarism > 15;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/70 flex items-center justify-center p-4 backdrop-blur-xl">
      <div className="relative w-full max-w-6xl mx-auto bg-gradient-to-br from-gray-900 to-gray-950 rounded-2xl shadow-2xl border border-gray-800 animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header with gradient */}
        <div className="relative p-6 rounded-t-2xl bg-gradient-to-r from-gray-900 to-gray-950 border-b border-gray-800">
          <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-pink-500/5 rounded-t-2xl" />
          <div className="relative flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="p-2.5 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl shadow-lg">
                <Code className="h-6 w-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Assignment Review
                </h3>
                <p className="text-gray-400 text-sm flex items-center">
                  {student.assignmentId || "A-XXX"} •{" "}
                  {student.subject || "Details"}
                  <ChevronRight className="h-3 w-3 mx-1.5" />
                  <span className="text-indigo-400">{student.name}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-gray-800/50 hover:bg-gray-700/50 text-gray-400 hover:text-white transition-all duration-200 border border-gray-700/50 hover:border-gray-600/50"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Submission Details Card */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-800/50 p-6 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-6">
                <h4 className="text-lg font-bold text-white flex items-center">
                  <div className="w-1 h-6 bg-gradient-to-b from-indigo-500 to-purple-500 rounded-full mr-3" />
                  Submission Details
                </h4>
                <StatusBadge status={student.status} />
              </div>

              {/* Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <InfoItem
                  label="Student"
                  value={student.name}
                  icon={User}
                  highlight={true}
                />
                <InfoItem
                  label="Submitted"
                  value={`${student.submissionDate} • ${student.submissionTime}`}
                  icon={Clock}
                />
                <InfoItem label="Status" value={student.status} icon={List} />
                <InfoItem
                  label="Score"
                  value={
                    student.score !== null
                      ? `${student.score}/${student.maxScore}`
                      : "Not Graded"
                  }
                  icon={Star}
                  highlight={student.score !== null}
                />
              </div>

              {/* Teacher Feedback */}
              {(student.reviewMessage || teacherNotes) && (
                <div className="mt-6 p-4 bg-gradient-to-r from-gray-800/40 to-gray-900/40 rounded-xl border border-gray-800/50">
                  <div className="flex items-center mb-3">
                    <div className="p-2 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-lg">
                      <FileText className="h-4 w-4 text-cyan-400" />
                    </div>
                    <span className="ml-3 text-sm font-semibold text-gray-300">
                      Teacher Feedback
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed pl-3 border-l-2 border-cyan-500/50">
                    {student.reviewMessage || teacherNotes}
                  </p>
                </div>
              )}
            </div>

            {/* AI Assessment Card */}
            <div className="bg-gradient-to-br from-gray-800/30 to-gray-900/30 rounded-2xl border border-gray-800/50 p-6 backdrop-blur-sm">
              <h4 className="text-lg font-bold text-white flex items-center mb-6">
                <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-amber-500 rounded-full mr-3" />
                <Zap className="h-5 w-5 mr-2 text-yellow-400" />
                AI Assessment
              </h4>

              <div className="space-y-4">
                {/* Plagiarism Score with visual indicator */}
                <div className="flex items-center justify-between p-4 bg-gray-900/50 rounded-xl border border-gray-800/50">
                  <div>
                    <span className="text-gray-400 font-medium">
                      Plagiarism Score
                    </span>
                    <div className="text-sm text-gray-500">
                      Similarity detection
                    </div>
                  </div>
                  <div className="text-right">
                    <div
                      className={`text-2xl font-bold ${
                        plagiarismHigh ? "text-rose-400" : "text-emerald-400"
                      }`}
                    >
                      {aiReport.plagiarism}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">
                      Confidence: {aiReport.confidence}
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Originality level</span>
                    <span className="text-gray-300">{aiReport.similarity}</span>
                  </div>
                  <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        plagiarismHigh
                          ? "bg-gradient-to-r from-rose-500 to-pink-500"
                          : "bg-gradient-to-r from-emerald-500 to-cyan-500"
                      }`}
                      style={{
                        width: `${Math.min(aiReport.plagiarism, 100)}%`,
                      }}
                    />
                  </div>
                </div>

                {/* Suggested deductions */}
                <div className="mt-4">
                  <h5 className="text-sm font-semibold text-gray-300 mb-3">
                    Suggested Improvements
                  </h5>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {aiReport.deductions.map((d, i) => (
                      <div
                        key={i}
                        className="p-3 bg-gray-900/40 rounded-lg border border-gray-800/50 hover:border-gray-700/50 transition-colors"
                      >
                        <div className="flex items-start">
                          <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 mr-2 flex-shrink-0" />
                          <span className="text-sm text-gray-300">{d}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Grading Panel */}
          {(userRole === "Teacher" || userRole === "Admin") && (
            <div className="lg:col-span-1">
              {!isEditing ? (
                // View Mode Card
                <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-800/50 p-6 h-fit backdrop-blur-sm">
                  <div className="text-center space-y-5">
                    <div
                      className={`p-4 rounded-2xl inline-block ${
                        isAlreadyCompleted
                          ? "bg-gradient-to-br from-emerald-500/10 to-green-500/10"
                          : "bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
                      }`}
                    >
                      {isAlreadyCompleted ? (
                        <Shield className="h-12 w-12 text-emerald-400" />
                      ) : (
                        <Shield className="h-12 w-12 text-indigo-400" />
                      )}
                    </div>

                    <div className="space-y-2">
                      <h4 className="text-xl font-bold text-white">
                        {isAlreadyCompleted
                          ? "Grading Complete"
                          : "Ready to Grade"}
                      </h4>
                      <p className="text-gray-400 text-sm leading-relaxed">
                        {isAlreadyCompleted
                          ? "Evaluation submitted. Click below to make changes."
                          : "Review submission details and provide final assessment."}
                      </p>
                    </div>

                    <button
                      onClick={() => setIsEditing(true)}
                      className={`w-full py-3.5 px-4 font-bold rounded-xl transition-all duration-300 flex items-center justify-center space-x-2 ${
                        isAlreadyCompleted
                          ? "bg-gradient-to-r from-gray-800 to-gray-900 text-gray-300 hover:from-gray-700 hover:to-gray-800 hover:text-white border border-gray-700/50"
                          : "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 shadow-lg shadow-indigo-500/25"
                      }`}
                    >
                      {isAlreadyCompleted ? (
                        <>
                          <Edit3 className="h-4 w-4" />
                          <span>Update Evaluation</span>
                        </>
                      ) : (
                        <>
                          <Shield className="h-4 w-4" />
                          <span>Begin Grading</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                // Edit Mode Form
                <div className="bg-gradient-to-b from-gray-800/40 to-gray-900/40 rounded-2xl border border-gray-800/50 p-6 space-y-5 backdrop-blur-sm animate-in fade-in slide-in-from-right-4 duration-300">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-800/50">
                    <h4 className="text-lg font-bold text-white flex items-center">
                      <Shield className="h-5 w-5 mr-2 text-indigo-400" />
                      Grading Form
                    </h4>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="text-sm text-gray-400 hover:text-white transition-colors"
                    >
                      Cancel
                    </button>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2 flex justify-between">
                        <span>Final Score</span>
                        <span className="text-gray-500 text-xs">
                          Max: {student.maxScore}
                        </span>
                      </label>
                      <div className="relative">
                        <input
                          type="number"
                          max={student.maxScore}
                          value={finalScore}
                          onChange={(e) => setFinalScore(e.target.value)}
                          className="w-full rounded-xl bg-gray-900/50 border border-gray-700/50 px-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all"
                          placeholder="Enter score"
                          autoFocus
                        />
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
                          /{student.maxScore}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Status
                      </label>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          "Completed",
                          "In Review",
                          "Pass",
                          "Resubmit",
                          "Fail",
                        ].map((status) => (
                          <button
                            key={status}
                            type="button"
                            onClick={() => setStatusOverride(status)}
                            className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all ${
                              statusOverride === status
                                ? "bg-gradient-to-r from-indigo-500/20 to-purple-500/20 text-white border border-indigo-500/30"
                                : "bg-gray-900/30 text-gray-400 hover:text-white hover:bg-gray-800/50 border border-gray-700/30"
                            }`}
                          >
                            {status}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-300 mb-2">
                        Feedback & Notes
                      </label>
                      <textarea
                        value={teacherNotes}
                        onChange={(e) => setTeacherNotes(e.target.value)}
                        rows="4"
                        className="w-full rounded-xl bg-gray-900/50 border border-gray-700/50 px-4 py-3.5 text-white placeholder-gray-500 focus:border-indigo-500/50 focus:ring-2 focus:ring-indigo-500/20 outline-none transition-all resize-none"
                        placeholder="Provide detailed feedback, improvement suggestions, and mark breakdown..."
                      />
                    </div>
                  </div>

                  <button
                    onClick={handleFinalize}
                    className="w-full py-3.5 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white font-bold rounded-xl transition-all duration-300 shadow-lg shadow-indigo-500/25 flex items-center justify-center space-x-2"
                  >
                    <Shield className="h-5 w-5" />
                    <span>Save & Finalize</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
