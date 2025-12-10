import express from "express";
const router = express.Router();
import Subjects from "../../models/subjects.js";
import Teachers from "../../models/teacher.js";
import Students from "../../models/student.js";

router.post("/addSubject", async (req, res) => {
  try {
    let { name, code, credits } = req.body;
    console.log(name, code, credits);
    let subject = await Subjects.create({
      name,
      courseCode: code,
      credit: credits,
    });
    if (subject) {
      return res.json({
        success: true,
        message: "Subject Created Successfully",
      });
    }
    return res.json({ success: false, message: "Error in subject Creation " });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error in subject Creation " });
  }
});

router.get("/allDetails", async (req, res) => {
  try {
    let allSubject = await Subjects.find({}).populate("allotedTeacher");
    let allTeachers = await Teachers.find({});
    let allStudents = await Students.find({});
    return res.json({
      success: true,
      subjects: allSubject,
      Teachers: allTeachers,
      Students: allStudents,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error in details fetching " });
  }
});

router.post("/allocation", async (req, res) => {
  let { teacherId, subjectId } = req.body;
  console.log(teacherId, subjectId);
  let subject = await Subjects.findById(subjectId).populate("allotedTeacher");
  if (subject.allotedTeacher) {
    return res.json({
      success: false,
      message: `${subject.name} is  Already Allocated To ${subject.allotedTeacher.name} `,
    });
  }
  if (!subject) {
    return res.json({ success: false, message: "Subject does Not Exist" });
  }
  let teacher = await Teachers.findById(teacherId);
  console.log("teacher is", teacher);

  if (!teacher) {
    return res.json({ success: false, message: "Teacher does Not Exist" });
  }
  await Subjects.findByIdAndUpdate(
    subjectId,
    {
      $push: { allotedTeacher: teacherId },
    },
    { new: true }
  );

  let updatedTeacher = await Teachers.findByIdAndUpdate(
    teacherId,
    {
      $addToSet: { subjectsAlloted: subjectId }, // prevents duplicates
    },
    { new: true }
  );
  console.log(updatedTeacher);

  return res.json({
    success: true,
    message: `${subject.name} Allocated to ${teacher.name} successfully`,
  });
});

export default router;
