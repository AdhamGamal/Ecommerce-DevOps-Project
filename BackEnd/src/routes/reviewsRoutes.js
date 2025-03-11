const express = require("express");
const router = express.Router();
const {
  getAllReview,
  createReview,
  updateReviewById,
  toggleStatusById,
} = require("../controllers/reviewController");
const verifyToken = require("../utils/verifyToken");
const isAdmin = require("../utils/isAdmin");
const {
  validateReview,
  validateEditReview,
} = require("../utils/validation/reviewValidation");
//Get All
router.get("/", getAllReview);

//Create New

router.post("/", verifyToken, validateReview, createReview);

//update

router.patch("/:id", verifyToken, validateEditReview, updateReviewById);

//Delete

router.delete("/:id", verifyToken, isAdmin, toggleStatusById);

module.exports = router;
