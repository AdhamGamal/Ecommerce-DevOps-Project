const Joi = require("joi");
const AppError = require("../AppError");
const ProductCategory = require("../../models/ProductCategory");

// Schemas
const reviewSchema = Joi.object({
  title: Joi.string()
    .min(3)
    // .max(30)
    .required()
    .pattern(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+(?: [a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+)*$/
    )
    .messages({
      "string.pattern.base": `غير مسوح للأسم إلا بحروف فقط`,
    }),
  content: Joi.string()
    .min(3)
    // .max(30)
    .required()
    .pattern(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+(?: [a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+)*$/
    )
    .messages({
      "string.pattern.base": `غير مسوح للمحتوى إلا بحروف فقط`,
    }),
  productId: Joi.string().required(),
  userId: Joi.string().required(),
});

// validation
const validateReview = async (req, res, next) => {
  const { title, content, productId, userId } = req.body;
  const foundCategory = await ProductCategory.findOne({ name });
  if (foundCategory) {
    return next(new AppError("the name is found before", 400));
  }
  const { error } = reviewSchema.validate({
    title,
    content,
    productId,
    userId,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};

const reviewEditSchema = Joi.object({
  title: Joi.string()
    .min(3)
    // .max(30)

    .pattern(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+(?: [a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+)*$/
    )
    .messages({
      "string.pattern.base": `غير مسوح للأسم إلا بحروف فقط`,
    }),
  content: Joi.string()
    .min(3)
    // .max(30)

    .pattern(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+(?: [a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+)*$/
    )
    .messages({
      "string.pattern.base": `غير مسوح للمحتوى إلا بحروف فقط`,
    }),
});

// validation
const validateEditReview = async (req, res, next) => {
  const { title, content } = req.body;

  const { error } = reviewEditSchema.validate({
    title,
    content,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};
module.exports = {
  validateReview,
  validateEditReview,
};
