const express = require("express");
const ProductCategory = require("../models/ProductCategory");
const AppError = require("../utils/AppError");
const verifyToken = require("../utils/verifyToken");
const { getAnyById } = require("../utils/commonUsedFunction");
// ـــــــــــــــــــــــــــــــــــ get all  ProductCategories ــــــــــــــــــــــــــــــــــ
const getAllProductCategory = async (req, res, next) => {
  const productCategories = await ProductCategory.find({
    status: "active",
  }).sort({ createdAt: 1 });
  console.log("productCategories", productCategories.length);

  res.status(200).send({
    message: "All categories are retrieved sucessfully",
    productCategories,
  });
};
// ــــــــــــــــــــــــــــــ Create product category ـــــــــــــــــــــــــــــــــــــــــــــ
const createProductCategory = async (req, res, next) => {
  const { name, image } = req.body;
  console.log("🚀 ~ createProductCategory ~ name:", name);

  let newProductCategory = await ProductCategory.create({
    name,
    image,
  });
  console.log(
    "🚀 ~ createProductCategory ~ newProductCategory:",
    newProductCategory
  );

  res
    .status(201)
    .json({ message: "product category has been Created", newProductCategory });
};
// ـــــــــــــــــــــــــــــــــــ update the ProductCategory by id ــــــــــــــــــــــــــــــــــ
const updateProductCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const { name, image } = req.body;
  // Find  by ID
  const foundProductcategory = await getAnyById(ProductCategory, id, res);
  if (!foundProductcategory) return;

  const updatedProductCategory = await ProductCategory.findByIdAndUpdate(id, {
    name,

    image,
  });
  res.status(201).send({
    message: `category With Id ${id} Has Been updated`, // Make sure this key exists in your translations

    updatedProductCategory,
  });
};
//_________________________________//toggle between activation  by Id //_______________________________//

const toggleStatusById = async (req, res, next) => {
  const { id } = req.params;

  // Find  by ID
  const foundProductcategory = await getAnyById(ProductCategory, id, res);

  if (!foundProductcategory) return;
  // Toggle the status based on the current value
  const newStatus =
    foundProductcategory.status == "active" ? "inActive" : "active";

  // Update the status
  foundProductcategory.status = newStatus;
  await foundProductcategory.save();
  // console.log(newStatus);
  console.log(
    "🚀 ~ toggleStatusById ~ foundProductcategory:",
    foundProductcategory
  );

  // Respond with the updated ProductCategory
  res.status(200).json({
    message: "status changed sucessfully!", // Make sure this key exists in your translations
    foundProductcategory,
  });
};

module.exports = {
  getAllProductCategory,
  createProductCategory,
  updateProductCategoryById,
  toggleStatusById,
};
