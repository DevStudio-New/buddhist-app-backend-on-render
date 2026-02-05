import Relation from "../models/Relation.js";

/* ================= GET ALL ================= */
export const getRelations = async (req, res) => {
  try {
    const relations = await Relation.find().sort({ createdAt: 1 });
    res.status(200).json(relations);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CREATE ================= */
export const createRelation = async (req, res) => {
  try {
    const { name, about, image } = req.body;

    if (!name || !about || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const relation = await Relation.create({
      name,
      about,
      image,
    });

    res.status(201).json(relation);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateRelation = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Relation.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Relation not found" });
    }

    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteRelation = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Relation.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Relation not found" });
    }

    res.status(200).json({ message: "Relation deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
