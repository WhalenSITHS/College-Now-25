const express = require("express");
const router = new express.Router();
const reviewController = require("../controllers/reviewController");

// GET /reviews/
router.get("/", reviewController.getReviews);

// GET /reviews/:id
router.get("/:id", reviewController.getReviewById);

// POST /reviews/
router.post("/", reviewController.createReview);

module.exports = router;
