import Advisor from "../models/Advisor.js";

/* ================= GET ALL ================= */ 
export const getAdvisors = async (req, res) => {
  try {
    const advisors = await Advisor.find().sort({ createdAt: 1 });
    res.status(200).json(advisors);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CREATE ================= */
export const createAdvisor = async (req, res) => {
  try {
    const { name, about, image } = req.body;

    if (!name || !about || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const advisor = await Advisor.create({ name, about, image });
    res.status(201).json(advisor);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateAdvisor = async (req, res) => {
  try {
    const updated = await Advisor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Advisor not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteAdvisor = async (req, res) => {
  try {
    const deleted = await Advisor.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: "Advisor not found" });
    }

    res.status(200).json({ message: "Advisor deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
