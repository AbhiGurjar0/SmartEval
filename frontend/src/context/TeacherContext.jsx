import { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "./AuthContext";

const TeacherContext = createContext();
export const TeacherProvider = ({ children }) => {
  const [subjects, setSubjects] = useState(null);
  const [students, setStudents] = useState(null);
  const { user } = useAuth();
    const VITE_URL = import.meta.env.VITE_URL;

  const allDetails = async () => {
    try {
      const res = await fetch(`${VITE_URL}/teacher/allDetails`, {
        credentials: "include",
      });
      let data = await res.json();
      // console.log("Teacher Context ", data);
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


  return (
    <TeacherContext.Provider
      value={{ subjects, students,setStudents , setSubjects, refetchTeacherData: allDetails }}
    >
      {children}
    </TeacherContext.Provider>
  );
};

export const useTeacher = () => useContext(TeacherContext);
