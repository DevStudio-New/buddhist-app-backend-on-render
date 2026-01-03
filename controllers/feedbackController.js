import Feedback from "../models/Feedback.js";

export const createFeedback = async (req, res, next) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    const feedback = await Feedback.create({
      user: req.user._id,
      name: req.user.name,
      email: req.user.email,
      image_link: req.user.image_link,
      message,
    });

    res.status(201).json({
      message: "Feedback submitted successfully",
      feedback,
    });
  } catch (err) {
    next(err);
  }
};


// GET ALL FEEDBACKS (public)
export const getFeedbacks = async (req, res, next) => {
  try {
    const feedbacks = await Feedback.find()
      .sort({ createdAt: -1 })
      .limit(10);

    res.json(feedbacks);
  } catch (err) {
    next(err);
  }
};
