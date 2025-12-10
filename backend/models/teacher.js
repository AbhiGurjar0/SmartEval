import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema({
  name: String,
  enrollmentNumber: {
    type: String,
    required: true,
    unique: true,
  },
  password: String,
  role: {
    type: String,
    default: "Teacher",
  },
  subjectsAlloted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Subject",
    },
  ],
  sectionsAlloted: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Section",
    },
  ],
});

export default mongoose.models.Teacher ||
  mongoose.model("Teacher", teacherSchema);
