import express from "express";
const router = express.Router();
import Subjects from "../../models/subjects.js";
import Teachers from "../../models/teacher.js";
import Students from "../../models/student.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import Assignments from "../../models/assignment.js";
import subjects from "../../models/subjects.js";
import AssignmentSol from "../../models/assignmentSol.js";
import { populate } from "dotenv";

router.post("/addAssignment", isLoggedIn, async (req, res) => {
  try {
    if (req?.user?.role?.toLowerCase() != "teacher") {
      return res.json("Only Teacher Can Access This");
    }
    let teacher = await Teachers.findById(req.user.id);
    let allotedSubject = teacher.subjectsAlloted;
    if (!allotedSubject) {
      return res.json({
        success: false,
        message: "No Subject Alloted to you",
      });
    }
    let { name, marks } = req.body;
    let assigenment = await Assignments.create({
      name,
      marks,
      subject: allotedSubject,
      unlockedDate: new Date(),
      dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    });
    if (assigenment) {
      await Subjects.findByIdAndUpdate(
        allotedSubject,
        {
          $push: {
            assignments: assigenment._id,
          },
        },
        {
          new: true,
        }
      );
      return res.json({
        success: true,
        message: "Assignment Created Successfully",
      });
    }
    return res.json({
      success: false,
      message: "Error in assignment Creation",
    });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: "Error in assignment Creation",
    });
  }
});

router.get("/allDetails", isLoggedIn, async (req, res) => {
  try {
    if (req?.user?.role?.toLowerCase() != "teacher") {
      return res.json("Only Teacher Can Access This");
    }
    let teacher = await Teachers.findById(req.user.id).populate(
      "subjectsAlloted"
    );
    if (!teacher) {
      return res.json({ success: false, message: "Authorization problem" });
    }
    // More common structure:
    let subjects = await Subjects.find({
      _id: { $in: teacher?.subjectsAlloted }, // Correct $in syntax
    }).populate({
      path: "assignments",
      populate: [
        {
          path: "submissions",
          model: "AssignmentSol",
          populate: [
            {
              path: "studentId",
              model: "Student",
            },
            {
              path: "plagId",
              model: "Plag",
            },
          ],
        },
      ],
    });
    // let allStudents = await Students.find({});
    return res.json({
      success: true,
      subjects: subjects,
      //   Students: allStudents,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error in subject fetching" });
  }
});

router.patch("/addMarks", isLoggedIn, async (req, res) => {
  try {
    let { solutionId, score, reviewMessage, createdAt } = req.body;

    let evaluted = await AssignmentSol.findByIdAndUpdate(
      solutionId,
      {
        marks: score,
        status: "Completed",
        feedback: reviewMessage,
        createdAt: createdAt,
      },
      {
        new: true,
      }
    );
    return res.json({ success: true, message: "Marks Added Successfully" });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "error in evaluation" });
  }
});

router.post("/InviteStudent", isLoggedIn, async (req, res) => {
  try {
    let { enrollments, subjectId } = req.body;
    let wrongs = [];
    for (let i = 0; i < enrollments.length; i++) {
      let studentId = enrollments[i];
      let student = await Students.findById(studentId);
      if (!student) {
        wrongs.push(studentId);
      }
      await Students.findByIdAndUpdate(
        studentId,
        {
          $push: {
            notification: subjectId,
          },
        },
        {
          new: true,
        }
      );
    }
    return res.json({
      success: true,
      message: "Marks Added Successfully",
      wrongs: wrongs,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "error in evaluation" });
  }
});

export default router;
