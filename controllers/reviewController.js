const Reviews = require("../Models/Reviews");
const Shops = require("../Models/Stores");
exports.Reviews = async (req, res) => {
  try {
    const review = new Reviews(req.body);
    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Error creating post", error });
  }
};
exports.getReviews = async (req, res) => {
  const reviews = await Reviews.find().populate("shop");
  res.json(reviews);
};
