import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastProvider } from "./context/ToastContext";
import { UserProvider } from "./context/UserContext";
import { AuthProvider } from "./context/AuthContext";
import { AdminProvider } from "./context/AdminContext";
import { TeacherProvider } from "./context/TeacherContext";

// Pages & Components
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Teacher from "./Pages/Teacher";
import HeaderWrapper from "./components/Home/Headers/HeaderWrapper";
import AuthPage from "./Pages/Register";
import AdminDashboard from "./components/Dashboards/AdminDashboard/AdminDashboard";
import FloatingAnimate from "./Animations/FloatingAnimate";

// --- Student Dashboard Components ---
import StudentDashboard from "./components/Dashboards/StudentDashboard/StudentDashboard";
import StudentSubjectDetails from "./components/Dashboards/StudentDashboard/StudentSubjectDetails";
import StudentAssignmentUpload from "./components/Dashboards/StudentDashboard/StudentAssignmentUpload";

// --- Teacher Dashboard Components ---
import TeacherDashboard from "./components/Dashboards/TeacherDashboard/TeacherDashboard";
import TeacherSubjectDashboard from "./components/Dashboards/TeacherDashboard/TeacherSubjectDetails";
import TeacherAssignmentDetails from "./components/Dashboards/TeacherDashboard/TeacherAssignmentDetails";

function App() {
  return (
    <>
      <AdminProvider>
        <AuthProvider>
          <TeacherProvider>
            <ToastProvider>
              <UserProvider>
                <BrowserRouter>
                  <FloatingAnimate />
                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />

                    <Route
                      path="/student/dashboard"
                      element={<StudentDashboard />}
                    />
                    <Route
                      path="/student/subject/:subjectId"
                      element={<StudentSubjectDetails />}
                    />
                    <Route
                      path="/student/subject/:subjectId/assignment/:id"
                      element={<StudentAssignmentUpload />}
                    />

                    <Route path="/teacher" element={<Teacher />} />
                    <Route
                      path="/teacher/dashboard"
                      element={<TeacherDashboard />}
                    />
                    <Route
                      path="/teacher/subject/:subjectId"
                      element={<TeacherSubjectDashboard />}
                    />
                    <Route
                      path="/teacher/assignment/:id"
                      element={<TeacherAssignmentDetails />}
                    />

                    <Route
                      path="/admin/dashboard"
                      element={<AdminDashboard />}
                    />
                  </Routes>
                </BrowserRouter>
              </UserProvider>
            </ToastProvider>
          </TeacherProvider>
        </AuthProvider>
      </AdminProvider>
    </>
  );
}

export default App;
