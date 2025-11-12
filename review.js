import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: String,
  text: String,
  userId: String
}, { timestamps: true });

export default mongoose.model("Review", reviewSchema);
