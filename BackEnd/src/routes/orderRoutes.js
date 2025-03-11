const express = require("express");
const router = express.Router();
const {
  getAllOrders,
  getOneOrder,
  createOrder,
  changeOrderStatus,
} = require("../controllers/orderController");
const verifyToken = require("../utils/verifyToken");

const {
  validateOrder,
  validateEditOrder,
} = require("../utils/validation/orderValidation");

const isAdmin = require("../utils/isAdmin");

////Get All The Orders
router.get("/", verifyToken, getAllOrders);

//Get Specific order with Id

router.get("/:id", verifyToken, getOneOrder);

//Create New Order

router.post("/", verifyToken, validateOrder, createOrder);

//update Order

router.patch(
  "/:id",
  verifyToken,
  isAdmin,
  validateEditOrder,
  changeOrderStatus
);

module.exports = router;
