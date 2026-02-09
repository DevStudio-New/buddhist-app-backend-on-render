import express from "express";
import {
  getAdvisors,
  createAdvisor,
  updateAdvisor,
  deleteAdvisor,
} from "../controllers/advisorController.js";

const router = express.Router();

router.get("/getAll", getAdvisors);
router.post("/create", createAdvisor);
router.put("/update/:id", updateAdvisor);
router.delete("/delete:id", deleteAdvisor);

export default router;
