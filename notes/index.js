const express = require("express");
const router = new express.Router();
const movieController = require("../controllers/movieController");
const articleController = require("../controllers/articleController");
const userRoutes = require("./user");
const shopController = require("../controllers/shopController");
const trainerCheck = require("../middleware/auth");
router.post("/save-shop", shopController.createShop);

router.use("/users", userRoutes);
router.get("/", movieController.showMovies);
//access URl params

router.get("/articles/:title", articleController.getArticleByTitle);
router.get("/pokemon", trainerCheck, movieController.getAllPokemon);
module.exports = router;
