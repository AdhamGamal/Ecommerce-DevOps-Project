const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const productCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    image: { String },

    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
// check the unique of name
productCategorySchema.pre("save", async function (next) {
  if (!this.isModified("name")) return next(); // Skip if name hasn't changed

  const existingCategory = await ProductCategory.findOne({ name: this.name });

  if (existingCategory) {
    const error = new Error("Category name must be unique");
    error.status = 400;
    return next(error);
  }

  next();
});

const ProductCategory = mongoose.model(
  "Product-category",
  productCategorySchema
);
module.exports = ProductCategory;
