import express from "express";
import {
  getRelations,
  createRelation,
  updateRelation,
  deleteRelation,
} from "../controllers/relationController.js";

const router = express.Router();

router.get("/getAll", getRelations);
router.post("/create", createRelation);
router.put("/update/:id", updateRelation);
router.delete("/delete/:id", deleteRelation);

export default router;
