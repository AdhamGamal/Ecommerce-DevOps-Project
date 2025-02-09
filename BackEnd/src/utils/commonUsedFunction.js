const fs = require("fs");
const mongoose = require("mongoose");
require("dotenv").config();

const deleteFile = (filePath) => {
  const fileName = filePath.split("\\").pop();
  fs.unlink(filePath, (err) => {
    if (err) {
      // Handle errors if unable to delete the file
      console.error(`Error deleting file ${filePath}:`, err);
    } else {
      console.log(`File ${fileName} deleted successfully`);
    }
  });
};
const renameOrRemoveFile = (originalFile, newFile) => {
  // Use the fs.rename method to rename/move the file
  fs.rename(originalFile, newFile, (err) => {
    // Check if an error occurred during the file movement
    if (err) {
      // If an error occurred, return a custom error using AppError with a status code of 500
      return next(new AppError(`Error moving file: ${err}`, 500));
    } else {
      // If the file is moved successfully, send a 200 OK response
      console.log("File moved successfully");
    }
  });
};

async function insertReasonSpecialtyIssueExcelFile(data, collectionName) {
  try {
    // Connect to MongoDB using Mongoose
    await mongoose.connect(process.env.DB_URI, {});

    const bulkOps = data.map((item) => ({
      updateOne: {
        filter: { name: item.name }, // Adjust 'name' based on your Excel structure
        update: { $set: { name: item.name } },
        upsert: true,
      },
    }));

    // Use Mongoose model for bulkWrite operations
    await collectionName.bulkWrite(bulkOps);

    console.log("data inserted or updated successfully!");
  } catch (error) {
    console.error("Error inserting or updating specialties:", error);
  } finally {
    // Close the Mongoose connection
    // await mongoose.disconnect();
  }
}
const getAnyById = async (collectionName, id, res) => {
  try {
    const foundRecordById = await collectionName.findById(id);
    if (!foundRecordById) {
      return res.status(404).send({
        message: "record Not Found",
      });
    }
    return foundRecordById;
  } catch (error) {
    console.error(`Error finding record by ID: ${error.message}`);
    return res.status(500).send({
      message: "internal error",
    });
  }
};

module.exports = {
  deleteFile,
  renameOrRemoveFile,
  insertReasonSpecialtyIssueExcelFile,
  getAnyById,
};
