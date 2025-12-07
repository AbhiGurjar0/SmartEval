import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Clock,
  CheckCircle,
  User,
  FileText,
  ChevronLeft,
  Filter,
  Download,
  Search,
  BarChart3,
  Users,
  Calendar,
  Award,
  TrendingUp,
  AlertCircle,
  Printer,
  DownloadCloud,
  Mail,
  Hash,
  FileCheck,
} from "lucide-react";
import StatusBadge from "../Shared/StatusBadge";
import DetailsModal from "../Shared/DetailsModal";
import { useTeacher } from "../../../context/TeacherContext";

const TeacherAssignmentDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { subjects } = useTeacher();
  const [assignment, setAssignment] = useState(null);
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [filter, setFilter] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("date");
  const [assignmentDetails, setAssignmentDetails] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (subjects && subjects.assignments) {
      const foundAssignment = subjects.assignments.find(
        (assign) => assign._id === id
      );
      setAssignment(foundAssignment || null);
    }
  }, [subjects, id]);

  useEffect(() => {
    if (!assignment) return;

    setIsLoading(true);

    // Map actual API data to component state
    setSubmissions(
      (assignment.submissions || []).map((sub, index) => ({
        id: sub.studentId._id,
        name: sub.studentId?.name || `Student ${index + 1}`,
        email: sub.studentId?.email || "N/A",
        studentId: sub.studentId?.enrollmentNumber || "N/A",
        status: sub.status || "In Review",
        submissionDate: new Date(
          sub.createdAt || Date.now()
        ).toLocaleDateString(),
        submissionTime: new Date(
          sub.createdAt || Date.now()
        ).toLocaleTimeString(),
        pdfName: sub.file?.fileName || "submission.pdf",
        score: sub.marks || null,
        maxScore: assignment.marks,
        plagiarismPercent: sub.plagiarismScore || 0,
        aiProbability: sub.aiScore || 0,
        wordCount: sub.wordCount || 0,
        feedback: sub.feedback || "",
        solutionId: sub._id,
      }))
    );

    setAssignmentDetails({
      id: assignment._id,
      title: assignment.name,
      subject: subjects.name,
      dueDate: new Date(assignment.dueDate).toLocaleDateString(),
      totalMarks: assignment.marks,
      description: assignment.description || "No description provided",
      instructions:
        assignment.instructions || "Submit your work before the deadline",
      createdAt: new Date(assignment.unlockedDate).toLocaleDateString(),
      submissionsAllowed: "pdf",
      studentCount: subjects.Student?.length || 0,
    });

    setIsLoading(false);
  }, [assignment, subjects, id]);

  const totalCount = submissions.length;
  const evaluatedCount = submissions.filter(
    (s) => s.status === "Completed"
  ).length;
  const pendingCount = submissions.filter(
    (s) => s.status === "In Review"
  ).length;
  const averageScore =
    evaluatedCount > 0
      ? (
          submissions
            .filter((s) => s.score)
            .reduce((sum, s) => sum + s.score, 0) / evaluatedCount
        ).toFixed(1)
      : 0;
  const averagePlagiarism =
    submissions.length > 0
      ? (
          submissions.reduce((sum, s) => sum + s.plagiarismPercent, 0) /
          submissions.length
        ).toFixed(1)
      : 0;

  const filteredList = submissions
    .filter((item) => {
      console.log("items is ", item);
      const matchesFilter = filter === "All" || item.status === filter;
      const matchesSearch =
        searchTerm === "" ||
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.pdfName.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name);
        case "score":
          return (b.score || 0) - (a.score || 0);
        case "plagiarism":
          return b.plagiarismPercent - a.plagiarismPercent;
        case "date":
        default:
          return new Date(b.submissionDate) - new Date(a.submissionDate);
      }
    });

  const handleGradeSubmit = (studentId, feedback) => {
    setSubmissions((prev) =>
      prev.map((item) =>
        item.id === studentId
          ? {
              ...item,
              score: feedback.score,
              status: feedback.status,
              feedback: feedback.comments,
            }
          : item
      )
    );
  };

  const handleDownload = (e, fileName) => {
    e.stopPropagation();
    alert(`Downloading file: ${fileName}`);
  };

  const handleExportGrades = () => {
    const csv = submissions.map((s) => ({
      Name: s.name,
      Email: s.email,
      Score: s.score || "Not Graded",
      Status: s.status,
      Plagiarism: `${s.plagiarismPercent}%`,
      SubmissionDate: s.submissionDate,
    }));
    alert(`Exporting ${csv.length} records as CSV`);
  };

  const FilterCard = ({
    title,
    count,
    active,
    onClick,
    icon: Icon,
    colorClass,
    description,
  }) => (
    <div
      onClick={onClick}
      className={`p-5 rounded-xl border cursor-pointer transition-all duration-200 group ${
        active
          ? "bg-gradient-to-br from-gray-900/80 to-gray-900/60 border-indigo-500 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
          : "bg-gradient-to-br from-gray-900/50 to-gray-900/30 border-gray-800 hover:bg-gray-800/50"
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <div>
          <h3
            className={`text-sm font-medium uppercase tracking-wider ${
              active ? "text-white" : "text-gray-400"
            }`}
          >
            {title}
          </h3>
          {description && (
            <p className="text-xs text-gray-500 mt-1">{description}</p>
          )}
        </div>
        <div
          className={`p-2 rounded-lg ${
            active ? "bg-indigo-500/20" : "bg-white/5"
          }`}
        >
          <Icon className={`h-5 w-5 ${colorClass}`} />
        </div>
      </div>
      <p className="text-3xl font-bold text-white mt-2">{count}</p>
      {active && (
        <div className="h-1 w-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full mt-3"></div>
      )}
    </div>
  );

  if (isLoading) {
    return (
      <div className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white/60">Loading assignment details...</p>
        </div>
      </div>
    );
  }

  if (!assignment) {
    return (
      <div className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <AlertCircle className="w-16 h-16 text-red-400 mx-auto mb-4" />
          <p className="text-white text-xl">Assignment not found</p>
          <button
            onClick={() => navigate("/teacher/dashboard")}
            className="mt-4 px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-700"
          >
            Go Back
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="relative z-10 bg-gradient-to-br from-gray-900 via-gray-900 to-purple-900/20 min-h-screen text-white font-sans">
      {/* Header Navigation */}
      <div className="sticky top-0 z-50 border-b border-white/10 bg-gray-900/95 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate("/teacher/dashboard")}
                className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
              >
                <ChevronLeft className="h-5 w-5 text-white group-hover:text-purple-400 transition-colors" />
              </button>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Assignment Details
                </h1>
                <p className="text-xs text-white/60">ID: {id}</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <button className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                <Printer className="h-4 w-4" />
                <span className="text-sm">Print Report</span>
              </button>
              <button
                onClick={handleExportGrades}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-200"
              >
                <DownloadCloud className="h-4 w-4" />
                <span className="text-sm">Export Grades</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Assignment Info Card */}
        <div className="mb-8 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-2xl border border-white/10 p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-r from-purple-600/10 to-blue-600/10">
                  <FileText className="h-6 w-6 text-purple-400" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">
                    {assignmentDetails?.title}
                  </h2>
                  <p className="text-white/60 mt-1">
                    {assignmentDetails?.subject}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-sm text-white/60">Due Date</div>
                  <div className="text-white font-medium flex items-center gap-2 mt-1">
                    <Calendar className="h-4 w-4 text-blue-400" />
                    {assignmentDetails?.dueDate}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-sm text-white/60">Total Marks</div>
                  <div className="text-white font-medium flex items-center gap-2 mt-1">
                    <Award className="h-4 w-4 text-yellow-400" />
                    {assignmentDetails?.totalMarks}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-sm text-white/60">Total Students</div>
                  <div className="text-white font-medium flex items-center gap-2 mt-1">
                    <Users className="h-4 w-4 text-green-400" />
                    {assignmentDetails?.studentCount}
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-white/5">
                  <div className="text-sm text-white/60">Average Score</div>
                  <div className="text-white font-medium flex items-center gap-2 mt-1">
                    <BarChart3 className="h-4 w-4 text-purple-400" />
                    {averageScore}/{assignmentDetails?.totalMarks}
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setShowStats(!showStats)}
              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4" />
                {showStats ? "Hide Stats" : "Show Stats"}
              </span>
            </button>
          </div>
        </div>

        {/* Statistics Section */}
        {showStats && (
          <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <FilterCard
              title="All Submissions"
              count={totalCount}
              description="Total students submitted"
              active={filter === "All"}
              onClick={() => setFilter("All")}
              icon={Users}
              colorClass="text-indigo-400"
            />
            <FilterCard
              title="Evaluated"
              count={evaluatedCount}
              description="Graded submissions"
              active={filter === "Completed"}
              onClick={() => setFilter("Completed")}
              icon={CheckCircle}
              colorClass="text-green-400"
            />
            <FilterCard
              title="Pending"
              count={pendingCount}
              description="Awaiting evaluation"
              active={filter === "In Review"}
              onClick={() => setFilter("In Review")}
              icon={Clock}
              colorClass="text-yellow-400"
            />
          </div>
        )}

        {/* Controls Bar */}
        <div className="mb-6 bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 p-4">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex-1 max-w-md">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-white/40" />
                <input
                  type="text"
                  placeholder="Search students by name, email, or filename..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
                />
              </div>
            </div>
            <div className="flex items-center gap-4">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-white focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-transparent"
              >
                <option value="date">Sort by Date</option>
                <option value="name">Sort by Name</option>
                <option value="score">Sort by Score</option>
                <option value="plagiarism">Sort by Plagiarism</option>
              </select>
              <button className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200">
                <Filter className="h-4 w-4" />
                <span className="text-sm">Filters</span>
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 mt-4 text-sm text-white/60">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
              <span>Evaluated: {evaluatedCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>Pending: {pendingCount}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
              <span>Average Plagiarism: {averagePlagiarism}%</span>
            </div>
          </div>
        </div>

        {/* Submissions List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <User className="h-5 w-5 text-purple-400" />
              Student Submissions ({filteredList.length})
            </h3>
            <div className="text-sm text-white/60">
              Showing {filteredList.length} of {totalCount} submissions
            </div>
          </div>

          {filteredList.map((student) => {
            const isPending = student.status === "In Review";
            const isCompleted = student.status === "Completed";
            const isAIGenerated = student.aiProbability > 70;

            return (
              <div
                key={student.id}
                className="group bg-gradient-to-br from-gray-900/50 to-gray-900/30 backdrop-blur-sm rounded-xl border border-white/10 hover:border-purple-500/50 hover:shadow-xl hover:shadow-purple-500/10 transition-all duration-300 cursor-pointer overflow-hidden"
                onClick={() => setSelected(student)}
              >
                <div className="p-5">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    {/* Student Info */}
                    <div className="flex-1">
                      <div className="flex items-start gap-4">
                        <div className="relative">
                          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600/20 to-blue-600/20 flex items-center justify-center">
                            <span className="text-lg font-bold text-white">
                              {student.name.charAt(0)}
                            </span>
                          </div>
                          {isAIGenerated && (
                            <div className="absolute -top-1 -right-1">
                              <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/30 flex items-center justify-center">
                                <AlertCircle className="w-3 h-3 text-red-400" />
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-3">
                            <h4 className="text-lg font-bold text-white">
                              {student.name}
                            </h4>
                            {isCompleted && student.score && (
                              <div className="px-2 py-1 rounded-full bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/20">
                                <span className="text-sm font-bold text-green-400">
                                  {student.score}/{student.maxScore}
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-4 mt-2">
                            <span className="text-sm text-white/60 flex items-center gap-2">
                              <Mail className="h-3 w-3" />
                              {student.email}
                            </span>
                            <span className="text-sm text-white/60 flex items-center gap-2">
                              <Hash className="h-3 w-3" />
                              {student.studentId}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Actions & Status */}
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                      {/* Status Badge */}
                      <div className="flex flex-col items-end">
                        {isCompleted ? (
                          <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            <CheckCircle className="h-3 w-3" />
                            Graded
                          </span>
                        ) : (
                          <StatusBadge status={student.status} />
                        )}
                        <div className="flex items-center gap-3 mt-2 text-xs">
                          <span
                            className={`flex items-center gap-1 ${
                              student.plagiarismPercent > 10
                                ? "text-red-400"
                                : "text-green-400"
                            }`}
                          >
                            <FileCheck className="h-3 w-3" />
                            {student.plagiarismPercent}% plag
                          </span>
                          {isAIGenerated && (
                            <span className="flex items-center gap-1 text-red-400">
                              <AlertCircle className="h-3 w-3" />
                              {student.aiProbability}% AI
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDownload(e, student.pdfName);
                          }}
                          className="p-2 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-all duration-200 group"
                          title="Download Submission"
                        >
                          <Download className="h-4 w-4 text-white/80 group-hover:text-blue-400" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelected(student);
                          }}
                          className="p-2 rounded-lg bg-gradient-to-r from-purple-600/20 to-blue-600/20 border border-white/10 hover:from-purple-600/30 hover:to-blue-600/30 transition-all duration-200 group"
                          title="Grade Submission"
                        >
                          <FileText className="h-4 w-4 text-purple-400 group-hover:text-white" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Submission Details */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4 pt-4 border-t border-white/10">
                    <div className="flex items-center gap-3">
                      <FileText className="h-4 w-4 text-white/40" />
                      <div>
                        <div className="text-sm text-white/60">Submission</div>
                        <button
                          onClick={(e) => handleDownload(e, student.pdfName)}
                          className="text-sm text-blue-400 hover:text-blue-300 hover:underline flex items-center gap-1 transition-colors"
                        >
                          {student.pdfName}
                          <Download className="h-3 w-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="h-4 w-4 text-white/40" />
                      <div>
                        <div className="text-sm text-white/60">Submitted</div>
                        <div className="text-sm text-white">
                          {student.submissionDate} @ {student.submissionTime}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Hash className="h-4 w-4 text-white/40" />
                      <div>
                        <div className="text-sm text-white/60">Word Count</div>
                        <div className="text-sm text-white">
                          {student.wordCount} words
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Progress Bar for Plagiarism */}
                <div className="px-5 pb-5">
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs">
                      <span className="text-white/60">Plagiarism Score</span>
                      <span
                        className={
                          student.plagiarismPercent > 10
                            ? "text-red-400"
                            : "text-green-400"
                        }
                      >
                        {student.plagiarismPercent}%
                      </span>
                    </div>
                    <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-500 ${
                          student.plagiarismPercent > 20
                            ? "bg-gradient-to-r from-red-600 to-orange-600"
                            : student.plagiarismPercent > 10
                            ? "bg-gradient-to-r from-yellow-600 to-orange-600"
                            : "bg-gradient-to-r from-green-600 to-emerald-600"
                        }`}
                        style={{
                          width: `${Math.min(student.plagiarismPercent, 100)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Empty State */}
          {filteredList.length === 0 && (
            <div className="text-center py-16 rounded-2xl border-2 border-dashed border-white/10">
              <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-r from-purple-600/10 to-blue-600/10 border border-white/10 flex items-center justify-center">
                <Users className="w-12 h-12 text-white/40" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">
                No submissions found
              </h3>
              <p className="text-white/60 max-w-md mx-auto">
                {searchTerm
                  ? `No submissions match "${searchTerm}"`
                  : "No students have submitted this assignment yet."}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Details Modal */}
      {selected && (
        <DetailsModal
          student={selected}
          onClose={() => setSelected(null)}
          userRole="Teacher"
          onSubmitFeedback={handleGradeSubmit}
          assignmentDetails={assignmentDetails}
        />
      )}
    </div>
  );
};

export default TeacherAssignmentDetails;
