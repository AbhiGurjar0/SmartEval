import mongoose from "mongoose";
const plagSchema = new mongoose.Schema({
  isPlagirized: Boolean,
  plagScore: Number,
  againstStudentName: String,
  reasons: [
    {
      type: String,
    },
  ],
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("Plag", plagSchema);
