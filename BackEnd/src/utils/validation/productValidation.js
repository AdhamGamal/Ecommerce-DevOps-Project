const Joi = require("joi");
const AppError = require("../AppError");
const ProductSubCategory = require("../../models/ProductSubCategory");

// Product Validation Schema
const productSchema = Joi.object({
  productName: Joi.string()
    .min(3)
    .max(100)
    .pattern(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+(?: [a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+)*$/
    )
    .required()
    .messages({
      "string.pattern.base": `غير مسموح للأسم إلا بحروف فقط`,
      "string.min": "اسم المنتج يجب أن يكون على الأقل 3 أحرف",
      "string.max": "اسم المنتج لا يمكن أن يزيد عن 100 حرف",
      "any.required": "اسم المنتج مطلوب",
    }),

  price: Joi.object({
    final: Joi.number().greater(0).messages({
      "number.base": "السعر النهائي يجب أن يكون رقمًا",
      "number.greater": "السعر النهائي يجب أن يكون أكبر من 0",
    }),
    original: Joi.number().greater(0).required().messages({
      "number.base": "السعر الأصلي يجب أن يكون رقمًا",
      "number.greater": "السعر الأصلي يجب أن يكون أكبر من 0",
      "any.required": "السعر الأصلي مطلوب",
    }),
  }),

  vendor: Joi.string().min(3).max(100).required().messages({
    "string.min": "اسم المورد يجب أن يكون على الأقل 3 أحرف",
    "string.max": "اسم المورد لا يمكن أن يزيد عن 100 حرف",
    "any.required": "اسم المورد مطلوب",
  }),

  status: Joi.string()
    .valid("active", "inActive", "out of stock")
    .default("active")
    .messages({
      "any.only": "الحالة يجب أن تكون واحدة من: active, inActive, out of stock",
    }),

  subCategoryId: Joi.string().required().messages({
    "string.base": "معرف الفئة الفرعية يجب أن يكون نصًا",
    "any.required": "معرف الفئة الفرعية مطلوب",
  }),

  description: Joi.string().min(10).required().messages({
    "string.min": "الوصف يجب أن يكون على الأقل 10 أحرف",
    "any.required": "الوصف مطلوب",
  }),
});

// Middleware for validating product creation
const validateProduct = async (req, res, next) => {
  console.log("here");

  const { productName, price, subCategoryId, vendor, description } = req.body;
  const foundSubCategory = await ProductSubCategory.findOne({
    _id: subCategoryId,
  });
  // console.log("🚀 ~ validateSubCategory ~ foundSubCategory:", foundSubCategory);
  if (!foundSubCategory) {
    return next(new AppError("the subCategoryId  is not found ", 400));
  }
  const { error } = productSchema.validate({
    productName,
    price,
    subCategoryId,
    vendor,
    description,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};

const productEditSchema = Joi.object({
  productName: Joi.string()
    .min(3)
    .max(100)
    .pattern(
      /^[a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+(?: [a-zA-Z\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDFF\uFE70-\uFEFF\u0621-\u064A\u0660-\u0669]+)*$/
    )
    .required()
    .messages({
      "string.pattern.base": `غير مسموح للأسم إلا بحروف فقط`,
      "string.min": "اسم المنتج يجب أن يكون على الأقل 3 أحرف",
      "string.max": "اسم المنتج لا يمكن أن يزيد عن 100 حرف",
      "any.required": "اسم المنتج مطلوب",
    }),

  imgsUrls: Joi.array().items(Joi.string().uri()).messages({
    "array.base": "الصور يجب أن تكون مصفوفة",
    "string.uri": "كل رابط صورة يجب أن يكون رابط صحيح",
  }),

  price: Joi.object({
    final: Joi.number().greater(0).messages({
      "number.base": "السعر النهائي يجب أن يكون رقمًا",
      "number.greater": "السعر النهائي يجب أن يكون أكبر من 0",
    }),
    original: Joi.number().greater(0).required().messages({
      "number.base": "السعر الأصلي يجب أن يكون رقمًا",
      "number.greater": "السعر الأصلي يجب أن يكون أكبر من 0",
      "any.required": "السعر الأصلي مطلوب",
    }),
  }),

  vendor: Joi.string().min(3).max(100).required().messages({
    "string.min": "اسم المورد يجب أن يكون على الأقل 3 أحرف",
    "string.max": "اسم المورد لا يمكن أن يزيد عن 100 حرف",
    "any.required": "اسم المورد مطلوب",
  }),

  status: Joi.string()
    .valid("active", "inActive", "out of stock")
    .default("active")
    .messages({
      "any.only": "الحالة يجب أن تكون واحدة من: active, inActive, out of stock",
    }),

  subCategoryId: Joi.string().required().messages({
    "string.base": "معرف الفئة الفرعية يجب أن يكون نصًا",
    "any.required": "معرف الفئة الفرعية مطلوب",
  }),

  description: Joi.string().min(10).required().messages({
    "string.min": "الوصف يجب أن يكون على الأقل 10 أحرف",
    "any.required": "الوصف مطلوب",
  }),
});

// validation
const validateEditProduct = async (req, res, next) => {
  console.log("here");

  const { productName, price, subCategoryId, vendor, description } = req.body;
  const foundSubCategory = await ProductSubCategory.findOne({
    subCategoryId,
  });
  // console.log("🚀 ~ validateSubCategory ~ foundSubCategory:", foundSubCategory);
  if (!foundSubCategory) {
    return next(new AppError("the subCategoryId  is not found ", 400));
  }
  const { error } = productEditSchema.validate({
    productName,
    price,
    subCategoryId,
    vendor,
    description,
  });
  if (error) {
    // console.log(error);

    return next(new AppError(error?.message, 400, error?.details));
  }

  next();
};
module.exports = {
  validateProduct,
  validateEditProduct,
};
