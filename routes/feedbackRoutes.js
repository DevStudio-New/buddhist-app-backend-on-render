import { Router } from "express";
import {
  createFeedback,
  getFeedbacks,
} from "../controllers/feedbackController.js";
import { protectUser } from "../middlewares/userAuth.js";

const router = Router();

// only logged in users
router.post("/create", protectUser, createFeedback);

// anyone
router.get("/getAll", getFeedbacks);

export default router;
