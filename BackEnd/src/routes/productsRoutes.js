const express = require("express");
const router = express.Router();

// verify req have token and based on token asingn the user to the req
const verifyToken = require("../utils/verifyToken");
const isAdmin = require("../utils/isAdmin");
const { uploadToFolder } = require("../middlewares/uploadFileToSpecificFolder");

// Product Controllers
const {
  getAllProducts,
  getAllProductsInSubCategory,
  getProductById,
  createProduct,
  updateProduct,
  toggleStatusById,
  newestProducts,
} = require("../controllers/productsControllers");
const {
  validateProduct,
  validateEditProduct,
} = require("../utils/validation/productValidation");

// get all Products
router.get("/", getAllProducts);
// get all Products
router.post("/subcategory", getAllProductsInSubCategory);

// get The Newest 10 Products
router.get("/newest", newestProducts);

// get Product by Product_id
router.get("/:id", getProductById);

// create a new Product ( Only Admin Can )
router.post(
  "/",
  verifyToken,
  isAdmin,
  uploadToFolder("products", 8),
  validateProduct,
  createProduct
);

// update Product Using product_id ( Only Admin Can )
router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  uploadToFolder("products", 8),
  validateEditProduct,
  updateProduct
);

// delete Product Using product_id ( Only Admin Can )
router.delete("/:id", verifyToken, isAdmin, toggleStatusById);

module.exports = router;
