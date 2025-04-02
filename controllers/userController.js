exports.homePage = (req, res) => {
  const users = ["Tina", "Angie", "Irene"];
  try {
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
exports.uploadProfilePic = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded." });
    }

    const User = require("../Models/User");

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: req.file.path },
      { new: true }
    );
    res
      .status(200)
      .json({ message: "Profile picture updated.", user: updatedUser });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
