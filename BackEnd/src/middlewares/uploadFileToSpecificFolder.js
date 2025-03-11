const multer = require("multer");
const fs = require("fs");
const path = require("path");
const AppError = require("../utils/AppError");
const { deleteFile } = require("../utils/commonUsedFunction");

// Function to create the multer upload middleware with a dynamic folder
function createUploadMiddleware(folderName, Length) {
  // Define storage configuration for multer
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Create folder name based on userName
      const requiredImagePath = path.join(
        "uploads",
        folderName,
        `${req.body.productName}_${req.body.subCategoryId}`
      );

      // Create directories recursively if they don't exist
      fs.mkdirSync(requiredImagePath, { recursive: true });
      // Set the destination path for the file
      cb(null, requiredImagePath);
    },
    filename: function (req, file, cb) {
      // Generate a unique filename for the uploaded file
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      const ext = path.extname(file.originalname).toLowerCase();
      // Set the filename for the uploaded file
      const fileName = `${uniqueSuffix}${ext}`;
      cb(null, fileName);
    },
  });

  // Create the Multer instance with defined storage and additional limits
  const upload = multer({
    storage: storage,
    limits: {
      fileSize: 500 * 1024, // 500 KB limit
    },
    fileFilter: function (req, file, cb) {
      // Check if the file type and size are correct
      if (file.size > 500 * 1024) {
        // Check file size
        return cb(new AppError("wrong image size", 400), false);
      }

      // Check file type
      checkFileType(file, cb);
    },
  }).array("files", Length); // Adjust 'files' to match your form field name and 3 to your max file count

  return (req, res, next) => {
    upload(req, res, (err) => {
      if (err) {
        console.log(err);

        if (err instanceof multer.MulterError) {
          if (err.code === "LIMIT_UNEXPECTED_FILE") {
            return next(new AppError("wrong length", 400));
          } else if (err.code === "LIMIT_FILE_SIZE") {
            return next(new AppError("wrong image size", 400));
          }
        }
        return next(err);
      }

      // Check if the number of uploaded files is exactly 3
      if (!req.files || req.files.length > Length) {
        // Remove files if the limit is exceeded
        req.files.forEach((file) => {
          const filePath = path.join(
            __dirname,
            "../../",
            "uploads",
            folderName,
            req.body.subCategoryId,
            file.filename
          );
          deleteFile(filePath); // Ensure deleteFile handles errors appropriately
        });
        return next(new AppError("wrong length of uploads", 400));
      }

      next();
    });
  };
}
// ___________________________________________
// Function to check the file type
function checkFileType(file, cb) {
  // Allowed image filetypes
  const allowedImageTypes = /jpeg|jpg|png|gif|webp/;
  // Check if the uploaded file is an image based on its extension
  const isImage = allowedImageTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (!isImage) {
    // If it's not an image, trigger an error
    return cb(new AppError("not image", 400), false);
  }

  // If it's an image, proceed with accepting the file
  return cb(null, true);
}

// Custom middleware to use the upload middleware with the desired folder
function uploadToFolder(folderName) {
  return createUploadMiddleware(folderName);
}

// Exporting the function to create the multer upload middleware
module.exports = {
  uploadToFolder,
};
