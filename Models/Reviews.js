const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  shop: { type: mongoose.Schema.Types.ObjectId, ref: "Shop", required: true }, // Reference to  Store
});

const review = mongoose.model("review", reviewSchema);
module.exports = review;
