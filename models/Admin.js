import mongoose from "mongoose";

const adminSchema = new mongoose.Schema(
  {
    image: { type: String, default: "" },        // Cloudinary URL
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { timestamps: true }   // automatically adds createdAt + updatedAt
);

export default mongoose.model("Admin", adminSchema);