const mongoose = require("mongoose");

const { Schema } = mongoose;

const productSubCategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    image: { type: String, required: true },

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
productSubCategorySchema.virtual("category", {
  ref: "Product-category",
  localField: "categoryId",
  foreignField: "_id",
  justOne: true, // Allow multiple specialties if needed
  options: { select: "name" }, // Select only the 'name' field from Specialty
});

productSubCategorySchema.pre("find", autoPopulateCategory);
productSubCategorySchema.pre("findOne", autoPopulateCategory);
function autoPopulateCategory(next) {
  this.populate("category");

  // this.populate("userName");
  next();
}

const ProductSubCategory = mongoose.model(
  "Product-sub-category",
  productSubCategorySchema
);

module.exports = ProductSubCategory;
