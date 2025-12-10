import express from "express";
import upload from "../../config/multer.js";
import AssignmentSol from "../../models/assignmentSol.js";
import AssignmentBinary from "../../models/assignmentBinary.js";
import { isLoggedIn } from "../../middlewares/isLoggedIn.js";
import subjects from "../../models/subjects.js";
import { populate } from "dotenv";
import Assignments from "../../models/assignment.js";
import { PDFExtract } from "pdf.js-extract";
const pdfExtract = new PDFExtract();
import { checkAgainstAllAssignments } from "../../Engine/plagiarismEngine.js";
import plagModel from "../../models/plag.js";
const router = express.Router();
async function extractPDF(buffer) {
  return new Promise((resolve, reject) => {
    const pdfParser = new PDFParser();

    pdfParser.on("pdfParser_dataReady", (data) => {
      resolve(data);
    });

    pdfParser.on("pdfParser_dataError", (err) => {
      reject(err);
    });

    pdfParser.parseBuffer(buffer);
  });
}

router.post(
  "/assignment/upload",
  isLoggedIn,
  upload.single("file"),
  async (req, res) => {
    try {
      let { assignmentId } = req.body;
      const submitted = await AssignmentSol.create({
        studentId: req.user.id,
        assignmentId: assignmentId,
        file: {
          data: req.file.buffer,
          contentType: req.file.mimetype,
          fileName: req.file.originalname,
        },
      });

      if (submitted) {
        let updated = await Assignments.findByIdAndUpdate(
          assignmentId,
          {
            $push: {
              submissions: submitted._id,
            },
          },
          {
            new: true,
          }
        );
        if (updated) {
          const data = await pdfExtract.extractBuffer(req.file.buffer);
          const text = data.pages
            .map((page) => page.content.map((item) => item.str).join(" "))
            .join("\n\n");

          if (text) {
            let oldAssignments = await AssignmentBinary.find({
              assignmentId,
              assignmentId,
            });
            const result = await checkAgainstAllAssignments(
              text,
              oldAssignments
            );
            if (result) {
              console.log(result);
              let plgModel = await plagModel.create({
                againstStudentName: result?.mostSuspicious?.againstStudentName,
                plagScore: result?.plagiarismScore,
                isPlagirized: result?.isPlagiarized,
                reasons: result?.mostSuspicious?.reasons,
              });
              if (plgModel) {
                await AssignmentSol.findByIdAndUpdate(
                  submitted._id,
                  {
                    $set: { plagId: plgModel._id },
                  },
                  {
                    new: true,
                  }
                );
              }
              console.log("plagiarism Successfully created");
            }
            let Binary = await AssignmentBinary.create({
              studentId: req.user.id,
              assignmentId,
              rawText: text,
            });

            if (Binary) {
              console.log("Binary created Successfully");
            }
          }

          return res.json({ success: true, message: "PDF submitted" });
        }
      } else {
        return res.json({
          success: false,
          message: "Something Wrong in Submission",
        });
      }
    } catch (err) {
      console.log(err);
      req.flash("error", "Something Wrong in Submission, try Again later");
      return res.json({
        success: false,
        message: req.flash("error"),
      });
    }
  }
);

//assigenment Rendering

router.get("/allSubjects", isLoggedIn, async (req, res) => {
  let allSubject = await subjects
    .find({})
    .populate({
      path: "assignments",
      populate: [
        // Use ARRAY for multiple populates
        {
          path: "subject",
          model: "Subject",
        },
        {
          path: "submissions",
          model: "AssignmentSol",
          populate: {
            path: "studentId",
            model: "Student",
          },
        },
      ],
    })
    .populate("allotedTeacher");
  res.json({ success: true, subjects: allSubject });
});

//plag Ch

router.post("/check-plagiarism", isLoggedIn, async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res
        .status(400)
        .json({ success: false, message: "text is required" });
    }

    const result = await checkAgainstAllAssignments(text, oldAssignments);

    return res.json({
      success: true,
      mostSuspicious: result.mostSuspicious,
      allResults: result.allResults,
    });
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ success: false, message: "Internal error", error: err.message });
  }
});

export default router;
