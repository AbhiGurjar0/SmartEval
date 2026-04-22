import { createContext, useContext, useState, useEffect } from "react";

const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [subjects, setSubjects] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]); // This state exists, which is good
  const VITE_URL = import.meta.env.VITE_URL;


  const allDetails = async () => {
    try {
      const res = await fetch(`${VITE_URL}/admin/allDetails`, {
        credentials: "include", 
      });
      let data = await res.json();
      // console.log("Admin Context ", data);

      if (data.subjects) {
        setSubjects(data.subjects);
      }
      if (data.Teachers) {
        setTeachers(data.Teachers);
      }
      if (data.Students) {
        setStudents(data.Students);
      }
    } catch (err) {
      console.error(err);
      setTeachers([]);
      setSubjects([]);
      setStudents([]);
    }
  };

  

  return (
    <AdminContext.Provider
      // FIX: Added 'students' to this list so components can use it
      value={{ subjects, teachers, students, setTeachers, setSubjects , allDetails }}
    >
      {children}
    </AdminContext.Provider>
  );
};

export const useAdmin = () => useContext(AdminContext);
