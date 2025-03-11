const mongoose = require("mongoose");

const { Schema } = mongoose;

const reviewSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    title: {
      type: String,
      required: true,
      minLength: 3,
    },
    content: {
      type: String,
      required: true,
      minLength: 3,
    },
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
reviewSchema.virtual("user", {
  ref: "users",
  localField: "userId",
  foreignField: "_id",
});

reviewSchema.pre("find", autoPopulateUser);
reviewSchema.pre("findOne", autoPopulateUser);
function autoPopulateUser(next) {
  this.populate("user");

  next();
}
const Review = mongoose.model("Review", reviewSchema);

module.exports = Review;
