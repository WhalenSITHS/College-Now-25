const express = require("express");
const router = new express.Router();

const locationRoutes = require("./Locations");
const shopController = require("../controllers/shopController");
const reviewController = require("../controllers/reviewController.js");
const authController = require("../Controllers/authController");

router.post("/reviews", reviewController.Reviews);
router.get("/getReviews", reviewController.getReviews);

router.use("/locations", locationRoutes);
router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/protected", authController.authCheck, authController.protected);
router.get("/", (req, res) => {
  try {
    return res.send("We're Live");
  } catch (error) {
    console.log(error);
  }
});
router.get("/bank/:name/user/:user", (req, res) => {
  try {
    res.json(req.params.name);
  } catch (error) {
    console.log(error);
  }
});
router.post("/login", (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  res.send(`${username} has logged in`);
});
router.post("/add", shopController.createShop);
module.exports = router;
