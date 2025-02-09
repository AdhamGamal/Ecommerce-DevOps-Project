const express = require("express");
const ProductSubCategory = require("../models/ProductSubCategory");
const { getAnyById } = require("../utils/commonUsedFunction");

// ـــــــــــــــــــــــــــــــــــ get all  ProductCategories ــــــــــــــــــــــــــــــــــ
const getAllProductSubCategory = async (req, res, next) => {
  const productSubCategories = await ProductSubCategory.find({
    status: "active",
  }).sort({ createdAt: 1 });
  console.log("productSubCategories", productSubCategories.length);

  res.status(200).send({
    message: "All categories are retrieved sucessfully",
    productSubCategories,
  });
};
// ــــــــــــــــــــــــــــــ Create product sub category ـــــــــــــــــــــــــــــــــــــــــــــ
const createProductSubCategory = async (req, res, next) => {
  const { name, image, categoryId } = req.body;

  let newProductSubCategory = await ProductSubCategory.create({
    name,
    image,
    categoryId,
  });
  res.status(201).json({
    message: "product sub category has been Created",
    newProductSubCategory,
  });
};
// ـــــــــــــــــــــــــــــــــــ update the ProductSubCategory by id ــــــــــــــــــــــــــــــــــ
const updateProductSubCategoryById = async (req, res, next) => {
  const { id } = req.params;

  const { name, image, categoryId } = req.body;
  // Find  by ID
  const foundProductSubCategory = await getAnyById(ProductSubCategory, id, res);
  if (!foundProductSubCategory) return;

  const updatedProductSubCategory = await ProductSubCategory.findByIdAndUpdate(
    id,
    {
      name,
      image,
      categoryId,
    },
    { new: true }
  );
  res.status(201).send({
    message: `category With Id ${id} Has Been updated`, // Make sure this key exists in your translations

    updatedProductSubCategory,
  });
};
//_________________________________//toggle between activation  by Id //_______________________________//

const toggleStatusById = async (req, res, next) => {
  const { id } = req.params;
  // Find  by ID
  const foundProductSubCategory = await getAnyById(ProductSubCategory, id, res);
  if (!foundProductSubCategory) return;
  // Toggle the status based on the current value
  const newStatus =
    foundProductSubCategory.status == "active" ? "inActive" : "active";

  // Update the status
  foundProductSubCategory.status = newStatus;
  await foundProductSubCategory.save();
  // console.log(newStatus);

  // Respond with the updated ProductSubCategory
  res.status(200).json({
    message: "status changed sucessfully!", // Make sure this key exists in your translations
    foundProductSubCategory,
  });
};

module.exports = {
  getAllProductSubCategory,
  createProductSubCategory,
  updateProductSubCategoryById,
  toggleStatusById,
};
