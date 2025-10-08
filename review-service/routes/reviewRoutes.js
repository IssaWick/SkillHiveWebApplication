const express = require("express");
const router = express.Router();
const { createReview, getReviews } = require("../controllers/reviewController");
const authenticateUser = require("../middleware/authMiddleWare");

// Temporarily remove authentication for testing
router.post("/", createReview);
// Anyone can fetch reviews
router.get("/", getReviews);

module.exports = router;
