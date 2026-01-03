import { Router } from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import { protectUser } from "../middlewares/userAuth.js";

const router = Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", protectUser, (req, res) => {
  res.json(req.user); // comes from protectUser 
});

export default router;
