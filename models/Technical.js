import mongoose from "mongoose";

const technicalSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    email: { type: String },
    image: { type: String, required: true }, // store absolute URL or Cloudinary path
  },
  { timestamps: true }
);

const Technical = mongoose.model("Technical", technicalSchema);
export default Technical;
