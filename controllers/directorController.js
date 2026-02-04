import Director from "../models/Director.js";

/* GET ALL */
export const getAllDirectors = async (req, res) => {
  try {
    const directors = await Director.find().sort({ createdAt: -1 });
    res.json(directors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* CREATE */
export const createDirector = async (req, res) => {
  try {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json(director);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* UPDATE */
export const updateDirector = async (req, res) => {
  try {
    const updated = await Director.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    res.json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

/* DELETE */
export const deleteDirector = async (req, res) => {
  try {
    await Director.findByIdAndDelete(req.params.id);
    res.json({ message: "Director deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
