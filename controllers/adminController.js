import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


export const registerAdmin = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const allowedEmails = process.env.ALLOWED_ADMIN_EMAILS.split(",");

    // 1. Check if email is in allowed list
    if (!allowedEmails.includes(email)) {
      return res.status(403).json({
        message: "This email is not authorized to register as admin"
      });
    }

    // 2. Check if already registered
    const exists = await Admin.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Admin already exists" });

    // 3. Hash password
    const hashed = await bcrypt.hash(password, 10);

    // 4. Save new admin
    const admin = await Admin.create({
      name,
      email,
      password: hashed,
    });

    res.json({ message: "Admin registered successfully", id: admin._id });
  } catch (err) {
    next(err);
  }
};

export const loginAdmin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin)
      return res.status(401).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, admin.password);
    if (!match)
      return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: admin._id, role: "admin" },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Logged in successfully",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        image: admin.image
      }
    });
  } catch (err) {
    next(err);
  }
};
