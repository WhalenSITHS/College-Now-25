const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: "A review must have an author",
  },
  text: {
    type: String,
    trim: true,
    required: "Please enter review text",
  },
  rating: {
    type: Number,
    min: 1,
    max: 5,
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

reviewSchema.pre(/^find/, function (next) {
  this.populate("author", "name email");
  next();
});

module.exports = mongoose.model("Review", reviewSchema);
