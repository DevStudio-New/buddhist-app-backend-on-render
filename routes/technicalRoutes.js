import express from "express";
import {
  getTechnicalMembers,
  createTechnicalMember,
  updateTechnicalMember,
  deleteTechnicalMember
} from "../controllers/technicalController.js";
import { protectAdmin } from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/getAll", getTechnicalMembers);
router.post("/create", protectAdmin, createTechnicalMember);
router.put("/:id", protectAdmin, updateTechnicalMember);
router.delete("/:id", protectAdmin, deleteTechnicalMember); 

export default router;
