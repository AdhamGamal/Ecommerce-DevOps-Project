const express = require("express");
const Review = require("../models/Review");
const AppError = require("../utils/AppError");
const verifyToken = require("../utils/verifyToken");
const { getAnyById } = require("../utils/commonUsedFunction");
// ـــــــــــــــــــــــــــــــــــ get all  reviews ــــــــــــــــــــــــــــــــــ
const getAllReview = async (req, res, next) => {
  const reviews = await Review.find({
    status: "active",
  }).sort({ createdAt: 1 });
  console.log("reviews", reviews.length);

  res.status(200).send({
    message: "All reviews are retrieved sucessfully",
    reviews,
  });
};
// ــــــــــــــــــــــــــــــ Create product category ـــــــــــــــــــــــــــــــــــــــــــــ
const createReview = async (req, res, next) => {
  const { title, content, userId } = req.body;

  let newReview = await Review.create({
    title,
    content,
    userId,
  });

  res
    .status(201)
    .json({ message: "product category has been Created", newReview });
};
// ـــــــــــــــــــــــــــــــــــ update the Review by id ــــــــــــــــــــــــــــــــــ
const updateReviewById = async (req, res, next) => {
  const { id } = req.params;
  const { title, content } = req.body;
  // Find  by ID
  const foundReview = await getAnyById(Review, id, res);
  if (!foundReview) return;

  if (req._id === foundReview.userId) {
    const updatedReview = await Review.findByIdAndUpdate(id, {
      title,
      content,
    });
    res.status(201).send({
      message: `category With Id ${id} Has Been updated`, // Make sure this key exists in your translations

      updatedReview,
    });
  } else {
    return next(
      new AppError(
        "Forbidden , only who can  edit is the user who made the review",
        403
      )
    );
  }
};
//_________________________________//toggle between activation  by Id //_______________________________//

const toggleStatusById = async (req, res, next) => {
  const { id } = req.params;

  // Find  by ID
  const foundReview = await getAnyById(Review, id, res);

  if (!foundReview) return;
  // Toggle the status based on the current value
  const newStatus = foundReview.status == "active" ? "inActive" : "active";

  // Update the status
  foundReview.status = newStatus;
  await foundReview.save();
  // console.log(newStatus);
  console.log("🚀 ~ toggleStatusById ~ foundReview:", foundReview);

  // Respond with the updated Review
  res.status(200).json({
    message: "status changed sucessfully!", // Make sure this key exists in your translations
    foundReview,
  });
};

module.exports = {
  getAllReview,
  createReview,
  updateReviewById,
  toggleStatusById,
};
