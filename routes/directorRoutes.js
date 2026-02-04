import express from "express";
import {
  getAllDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
} from "../controllers/directorController.js";
import { protectAdmin } from "../middlewares/adminAuth.js";

const router = express.Router();

router.get("/getAll", getAllDirectors);
router.post("/create",protectAdmin, createDirector);
router.put("/update/:id",protectAdmin, updateDirector);
router.delete("/delete/:id",protectAdmin, deleteDirector);

export default router;
