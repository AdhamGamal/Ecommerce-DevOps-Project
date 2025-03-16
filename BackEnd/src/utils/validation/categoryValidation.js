const Joi = require("joi");
const AppError = require("../AppError");
const ProductCategory = require("../../models/ProductCategory");

// Schemas
const categorySchema = Joi.object({
  name: Joi.string()
    .min(3)
    // .max(30) // Uncomment if needed
    .required()
    .pattern(
      /^[a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669&]+(?: [a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669&]+)*$/
    )

    .messages({
      "string.pattern.base": `غير مسوح للأسم إلا بحروف فقط`,
    }),
  description: Joi.string()
    .min(3)
    .max(30)
    .required()
    .pattern(
      /^[a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669&]+(?: [a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669&]+)*$/
    )

    .messages({
      "string.pattern.base": `غير مسوح للوصف إلا بحروف فقط`,
    }),
});

// validation
const validateCategory = async (req, res, next) => {
  const { name, description } = req.body;
  const foundCategory = await ProductCategory.findOne({ name });
  if (foundCategory) {
    return next(new AppError("the name is found before", 400));
  }
  const { error } = categorySchema.validate({
    name,
    description,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};

const categoryEditSchema = Joi.object({
  name: Joi.string()
    .min(3)
    // .max(30)
    .pattern(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+(?: [a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+)*$/
    )
    .messages({
      "string.pattern.base": `غير مسوح للأسم إلا بحروف فقط`,
    }),
  description: Joi.string()
    .min(3)
    .max(30)
    .pattern(
      /^[a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669&]+(?: [a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669&]+)*$/
    )

    .messages({
      "string.pattern.base": `غير مسوح للوصف إلا بحروف فقط`,
    }),
});

// validation
const validateEditCategory = async (req, res, next) => {
  const { name, description } = req.body;

  const { error } = categoryEditSchema.validate({
    name,
    description,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};
module.exports = {
  validateCategory,
  validateEditCategory,
};
