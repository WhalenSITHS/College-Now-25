const express = require("express");
const router = new express.Router();
const userRoutes = require("./User");
const locationRoutes = require("./Locations");
const pokemonRoutes = require("./Poke");
router.use("/users", userRoutes);
router.use("/locations", locationRoutes);
router.use("/pokemon", pokemonRoutes);
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

module.exports = router;
