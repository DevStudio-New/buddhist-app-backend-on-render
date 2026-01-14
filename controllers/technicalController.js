import Technical from "../models/Technical.js";

/** GET ALL */ 
export const getTechnicalMembers = async (req, res, next) => {
  try {
    const members = await Technical.find().sort({ createdAt: -1 });
    res.json(members);
  } catch (err) {
    next(err);
  }
};

/** CREATE */
export const createTechnicalMember = async (req, res, next) => {
  try {
    const member = await Technical.create(req.body);
    res.status(201).json(member);
  } catch (err) {
    next(err);
  }
};

/** UPDATE */
export const updateTechnicalMember = async (req, res, next) => {
  try {
    const updated = await Technical.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ message: "Member not found" });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

/** DELETE */
export const deleteTechnicalMember = async (req, res, next) => {
  try {
    const deleted = await Technical.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: "Member not found" });
    res.json({ message: "Member removed", deleted });
  } catch (err) {
    next(err);
  }
};
