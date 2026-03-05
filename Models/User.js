const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: "Please enter a name",
  },
  email: {
    type: String,
    trim: true,
    lowercase: true,
    required: "Please enter an email",
    unique: true,
  },
  password: {
    type: String,
    required: "Please enter a password",
  },
  created: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("User", userSchema);
