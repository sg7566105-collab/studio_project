import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Review from "./models/Review.js";

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected"))
  .catch(err => console.error("❌ MongoDB error:", err));

// Routes
app.get("/api/reviews", async (req, res) => {
  const reviews = await Review.find().sort({ createdAt: -1 });
  res.json(reviews);
});

app.post("/api/reviews", async (req, res) => {
  const { name, text, userId } = req.body;
  const review = new Review({ name, text, userId });
  await review.save();
  res.json(review);
});

app.delete("/api/reviews/:id/:userId", async (req, res) => {
  const { id, userId } = req.params;
  const review = await Review.findById(id);
  if (!review) return res.status(404).send("Not found");
  if (review.userId !== userId) return res.status(403).send("Not your review");
  await review.deleteOne();
  res.send("Deleted");
});

// Serve frontend (optional for local testing)
app.use(express.static("public"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
