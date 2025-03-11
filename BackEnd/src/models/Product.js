const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const { Schema } = mongoose;

const productSchema = new Schema(
  {
    productName: {
      type: String,
      required: true,
    },

    imgsUrls: [String],
    price: {
      final: {
        type: Number,
      },
      original: {
        type: Number,
        required: true,
      },
    },
    vendor: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inActive", "out of stock"],
      default: "active",
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

productSchema.virtual("subCategory", {
  ref: "Product-sub-category",
  localField: "subCategoryId",
  foreignField: "_id",
  justOne: true,
  options: { select: "name" },
});

productSchema.pre("find", autoPopulateProduct);
function autoPopulateProduct(next) {
  this.populate("subCategory").populate("category.name", "subCategory");
  next();
}
const Product = mongoose.model("Product", productSchema);
module.exports = Product;
