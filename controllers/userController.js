const User = require("../Models/User");

exports.createUser = async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.homePage = (req, res) => {
  const users = ["Tina", "Angie", "Irene"];
  try {
    res.json(users);
  } catch (error) {
    console.log(error);
  }
};
