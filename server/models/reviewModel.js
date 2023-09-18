import mongoose from "mongoose";

const ReviewSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor",
    required: true,
  },
  rating: { type: Number, required: true },
  feeedback: { type: String },
  createdAt: { type: Date, default: Date.now },
});
export default mongoose.model("Review", ReviewSchema);
