const Joi = require("joi");
const AppError = require("../AppError");
const Product = require("../../models/Product");
const Order = require("../../models/Order");

// Order Validation Schema
const orderSchema = Joi.object({
  userId: Joi.string().max(24).required().messages({
    "string.max": "اسم العميل لا يمكن أن يزيد عن 24 حرف",
    "any.required": "اسم العميل مطلوب",
  }),

  productIds: Joi.array().min(1).required().messages({
    "array.min": "يجب إضافة منتج واحد على الأقل إلى الطلب",
    "any.required": "قائمة المنتجات مطلوبة",
  }),

  totalPrice: Joi.number().greater(0).required().messages({
    "number.base": "السعر الإجمالي يجب أن يكون رقمًا",
    "number.greater": "السعر الإجمالي يجب أن يكون أكبر من 0",
    "any.required": "السعر الإجمالي مطلوب",
  }),

  status: Joi.string()
    .valid("pending", "processing", "shipped", "delivered", "canceled")
    .default("pending")
    .messages({
      "any.only":
        "حالة الطلب يجب أن تكون واحدة من: pending, processing, shipped, delivered, canceled",
    }),
  paymentMethod: Joi.string().valid("COD", "creditCard").required().messages({
    "any.only": "حالة الطلب يجب أن تكون واحدة من: COD, creditCard,",
    "any.required": "طريقه الدفع الإجمالي مطلوب",
  }),
});

// Middleware for validating order creation
const validateOrder = async (req, res, next) => {
  const { userId, productIds, totalPrice, paymentMethod } = req.body;

  const { error } = orderSchema.validate({
    userId,
    productIds,
    totalPrice,
    paymentMethod,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};

// Order Edit Validation Schema
const orderEditSchema = Joi.object({
  orderId: Joi.string().max(24).required().messages({
    "string.max": "اسم العميل لا يمكن أن يزيد عن 24 حرف",
    "any.required": "اسم العميل مطلوب",
  }),
  status: Joi.string()
    .valid("pending", "processing", "shipped", "delivered", "canceled")
    .messages({
      "any.only":
        "حالة الطلب يجب أن تكون واحدة من: pending, processing, shipped, delivered, canceled",
    }),
});

// Middleware for validating order edits
const validateEditOrder = async (req, res, next) => {
  const { orderId, status } = req.body;
  const foundCategory = await ProductCategory.findOne({ name });
  if (foundCategory) {
    return next(new AppError("the name is found before", 400));
  }
  const { error } = orderEditSchema.validate({
    orderId,
    status,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};

module.exports = {
  validateOrder,
  validateEditOrder,
};
