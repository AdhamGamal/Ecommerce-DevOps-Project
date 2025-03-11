const express = require("express");
const Order = require("../models/Order");
const AppError = require("../utils/AppError");

// ــــــــــــــــــــــــــــــــــــــ Get all Orders ــــــــــــــــــــــــــــــــــــــ
const getAllOrders = async (req, res, err) => {
  const orders = await Order.find().sort({ createdAt: -1 });
  if (!orders) return next(new AppError(`No Orders exists`, 404));

  res.status(200).send({
    message: "All orders are retrieved sucessfully",
    orders,
  });
};

// ــــــــــــــــــــــــــــــــــ Get User Order by Id ـــــــــــــــــــــــــــــــــــــ
const getOneOrder = async (req, res) => {
  const { _id: userId } = req.body;
  const orders = await Order.find(userId).sort({ createdAt: -1 });
  res.status(200).send({
    message: "Orders are retrieved sucessfully",
    orders,
  });
};
// ــــــــــــــــــــــــــــــــــــــ Create Order ____________________________________________
const createOrder = async (req, res, next) => {
  const { userId, productIds, totalPrice, paymentMethod } = req.body;

  const newOrder = await Order.create({
    userId,
    productIds,
    totalPrice,
    paymentMethod,
  });

  res.status(201).json({
    message: "Order has been created successfully",
    newOrder,
  });
};

//  ــــــــــــــــــــــــــــــ  change status Order  ـــــــــــــــــــــــــــــــــــــــــــــ

const changeOrderStatus = async (req, res, next) => {
  const { orderId, status } = req.body;

  // Find and update the order
  const updatedOrder = await Order.findByIdAndUpdate(
    orderId,
    { status },
    { new: true }
  );

  // If order not found
  if (!updatedOrder) {
    return next(new AppError("Order not found", 404));
  }

  res.status(200).json({
    message: "Order status updated successfully",
    order: updatedOrder,
  });
};

module.exports = {
  getAllOrders,
  getOneOrder,
  createOrder,
  changeOrderStatus,
};
