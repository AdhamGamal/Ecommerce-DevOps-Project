const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSubCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: {
      type: String,
      default: "",
    },

    status: {
      type: String,
      enum: ["active", "inActive"],
      default: "active",
    },

    categoryId: {
      type: Schema.Types.ObjectId,
      ref: "ProductCategory",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// **Create a Compound Unique Index for (name, categoryId)**
productSubCategorySchema.index({ name: 1, categoryId: 1 }, { unique: true });

const ProductSubCategory = mongoose.model(
  "Product-sub-category",
  productSubCategorySchema
);

module.exports = ProductSubCategory;
