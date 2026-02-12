const express = require("express");
const router = new express.Router();
const pokeController = require("../controllers/pokeController");
router.get("/all", pokeController.getAllPokemon);
module.exports = router;
