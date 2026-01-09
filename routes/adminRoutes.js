import { Router } from "express";
import { registerAdmin, loginAdmin } from "../controllers/adminController.js";
import { protectAdmin } from "../middlewares/adminAuth.js";

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


export default router;
