const Joi = require("joi");
const AppError = require("../AppError");
const ProductSubCategory = require("../../models/ProductSubCategory");

// Schemas
const subCategorySchema = Joi.object({
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
  categoryId: Joi.string().required(),
});

// validation
const validateSubCategory = async (req, res, next) => {
  const { name, categoryId } = req.body;
  const foundSubCategory = await ProductSubCategory.findOne({
    name,
    categoryId,
  });
  // console.log("🚀 ~ validateSubCategory ~ foundSubCategory:", foundSubCategory);
  if (foundSubCategory) {
    return next(new AppError("the name and category are found before", 400));
  }
  const { error } = subCategorySchema.validate({
    name,
    categoryId,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};

const subCategoryEditSchema = Joi.object({
  name: Joi.string()
    .min(3)
    // .max(30)
    .pattern(
      /^[a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669&]+(?: [a-zA-Z0-9\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669&]+)*$/
    )
    .messages({
      "string.pattern.base": `غير مسوح للأسم إلا بحروف فقط`,
    }),
  categoryId: Joi.string(),
});

// validation
const validateEditSubCategory = async (req, res, next) => {
  const { name, categoryId } = req.body;

  const { error } = subCategoryEditSchema.validate({
    name,
    categoryId,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};
module.exports = {
  validateSubCategory,
  validateEditSubCategory,
};
