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
    let subjectId = teacher.subjectsAlloted;
    // More common structure:
    let subject = await Subjects.findById(subjectId).populate({
      path: "assignments",
      populate: {
        path: "submissions",
        model: "AssignmentSol",
        populate: {
          path: "studentId",
          model: "Student",
        },
        populate:{
          path:"plagId",
          model:"Plag"
        }
      },
    });
    // let allStudents = await Students.find({});
    return res.json({
      success: true,
      subjects: subject,
      //   Students: allStudents,
    });
  } catch (err) {
    console.log(err);
    return res.json({ success: false, message: "Error in subject fetching" });
  }
});

router.patch("/addMarks", async (req, res) => {
  try {
    let { solutionId, score, reviewMessage } = req.body;

    let evaluted = await AssignmentSol.findByIdAndUpdate(
      solutionId,
      {
        marks: score,
        status: "Completed",
        feedback: reviewMessage,
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

export default router;
