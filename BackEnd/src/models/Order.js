const mongoose = require("mongoose");

const { Schema } = mongoose;

const orderSchema = new Schema(
  {
    totalPrice: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: [
        "pending", // Order is placed but not yet processed
        "prepared", // Order is being prepared
        "shipment", // Order is shipped but not yet delivered
        "delivered", // Order has been successfully delivered
        "canceled", // Order was canceled by user or admin
        "returned", // Order was returned after delivery
      ],
      default: "pending",
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["COD", "creditCard"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    productIds: [
      {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true,
        status: {
          type: String,
          enum: [
            "pending",
            "prepared",
            "shipment",
            "delivered",
            "canceled",
            "returned",
          ],
          default: "pending",
        },
      },
    ],
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true, // Automatically manages createdAt & updatedAt
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order;
