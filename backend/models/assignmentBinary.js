import mongoose from "mongoose";
const AssignmentSchema = new mongoose.Schema({
  studentId: String,
  assignmentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Assignment",
  },
  fileName: String,
  rawText: String,
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("AssignmentBinary", AssignmentSchema);
