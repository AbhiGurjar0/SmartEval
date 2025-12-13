import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TeacherContext = createContext();
export const TeacherProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(null);
  const [students, setStudents] = useState(null);
  const { user } = useAuth();

  const allDetails = async () => {
    try {
      const res = await fetch("http://localhost:3000/teacher/allDetails", {
        credentials: "include",
      });
      let data = await res.json();
      console.log("Teacher Context ", data);
      if (data.subjects) {
        setSubjects(data.subjects);
      } else {
        setSubjects(null);
      }
      if (data.Students) {
        setStudents(data.Students);
      } else {
        setStudents(null);
      }
    } catch (err) {
      setSubjects(null);
      setStudents(null);
    }
  };

  useEffect(() => {
    if (user) {
      // Clear previous data first
      setSubjects(null);
      setStudents(null);
      // Then fetch new teacher's data
      allDetails();
    } else {
      //   // Clear data when logged out
      setSubjects(null);
      setStudents(null);
    }
  }, [user]);
  return (
    <TeacherContext.Provider
      value={{ subjects, students, refetchTeacherData: allDetails }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => useContext(TeacherContext);
