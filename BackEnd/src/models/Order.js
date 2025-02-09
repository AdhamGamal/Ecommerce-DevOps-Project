const mongoose = require("mongoose");
const { schema } = require("./User");

const { Schema } = mongoose;

const order = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    products: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
    ],
    status: {
      type: String,
      enum: ["successful", "declined", "inprogress"],
      default: "successful",
    },

    totalPrice: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", order);
module.exports = Order;
