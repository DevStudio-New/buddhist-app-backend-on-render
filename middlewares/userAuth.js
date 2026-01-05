import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const protectUser = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;

    if (!auth || !auth.startsWith("Bearer "))
      return res.status(401).json({ message: "Not authorized, Please Signin First." });

    const token = auth.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user") {
      return res.status(403).json({ message: "Users only" });
    }

    req.user = await User.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    next(err);
  }
};
