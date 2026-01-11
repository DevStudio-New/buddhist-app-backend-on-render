import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/adminAuth.js";
import User from "../models/User.js";
import Feedback from "../models/Feedback.js";
import {deleteFeedback, getFeedbacks} from "../controllers/feedbackController.js"
import {deleteUser, getUsers} from "../controllers/userController.js"


const router = Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/me", protectAdmin, (req, res) => {
  res.json({
    id: req.admin._id,
    name: req.admin.name,
    email: req.admin.email,
  });
});
// routes/admin.js
router.get("/stats", protectAdmin, async (req, res) => {
  const users = await User.countDocuments();
  const feedbacks = await Feedback.countDocuments();

  res.json({ users, feedbacks });
});
router.get("/feedbacks", protectAdmin, getFeedbacks);
router.delete("/feedBacks/:id", protectAdmin, deleteFeedback);


router.get("/users", protectAdmin, getUsers);
router.delete("/users/:id", protectAdmin, deleteUser);


export default router;
