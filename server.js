import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";

import { connectDB } from "./config/db.js";
dotenv.config();

// import authRoutes from "./routes/authRoutes.js"; 
// import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import technicalRoutes from "./routes/technicalRoutes.js";

const app = express();
 
connectDB(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"));

const CLIENT = process.env.CLIENT_URL.split(",");
// Middleware
app.use(helmet());
app.use(
  cors({
    origin: CLIENT,
    credentials: true
  })
);

app.use(express.json({ limit: "10mb" }));

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/users", userRoutes);
app.use("/api/feedbacks", feedbackRoutes);
app.use("/api/technical", technicalRoutes);
// app.use("/api/events", eventRoutes); 

// Global errors
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: err.message || "Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
