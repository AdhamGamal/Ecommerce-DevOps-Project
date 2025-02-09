const express = require("express");
const router = express.Router();
const {
  getAllProductSubCategory,
  createProductSubCategory,
  updateProductSubCategoryById,
  toggleStatusById,
} = require("../controllers/productSubCategoryController");
const verifyToken = require("../utils/verifyToken");

const {
  validateSubCategory,
  validateEditSubCategory,
} = require("../utils/validation/subCategoryValidation");
const isAdmin = require("../utils/isAdmin");

//Get All
router.get("/", getAllProductSubCategory);

//Create New

router.post(
  "/",
  verifyToken,
  isAdmin,
  validateSubCategory,
  createProductSubCategory
);

//update

router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateEditSubCategory,
  updateProductSubCategoryById
);

//Delete

router.delete("/:id", verifyToken, isAdmin, toggleStatusById);

module.exports = router;
