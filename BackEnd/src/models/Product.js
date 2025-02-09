const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    imgsLinks: [String],

    oldPrice: {
      type: Number,
      required: true,
    },
    newPrice: {
      type: Number,
      required: true,
    },

    vendor: {
      type: String,
      required: true,
    },
    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "Product-category",
      required: true,
    },
    subCategoryId: {
      type: Schema.Types.ObjectId,
      ref: "Product-sub-category",
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);
productSchema.virtual("reviews", {
  ref: "Review",
  localField: "_id",
  foreignField: "productId",
  // justOne: true,
});
productSchema.virtual("category", {
  ref: "Product-category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true,
  // options: { select: "name" },
});
productSchema.virtual("subCategory", {
  ref: "Product-sub-category",
  localField: "_id",
  foreignField: "subCategoryId",
  justOne: true,
  // options: { select: "name" },
});

productSchema.pre("find", autoPopulateProduct);
function autoPopulateProduct(next) {
  this.populate("reviews").populate("category").populate("subCategory");

  // this.populate("userName");
  next();
}
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
