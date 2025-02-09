const express = require("express");
const app = express();
const router = express.Router();

const verifyToken = require("../utils/verifyToken"); // logged in users, admins, or super admins
const isAdmin = require("../utils/isAdmin");

const { multerUploads } = require("../utils/multer");

const {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  changePassword,
  login,
} = require("../controllers/userController");

const {
  validateReg,
  validateLogin,
  validateChangePass,
} = require("../utils/validation/userValidation");

// getting all users
router.get("/", verifyToken, getAllUsers);

// getting user by id
router.get("/user-info", verifyToken, getUserById);

// create a new user (register)
router.post("/", validateReg, register);

// update user
router.patch("/:id", verifyToken, updateUser);

router.patch(
  "/:id/changePassword",
  verifyToken,
  validateChangePass,
  changePassword
);

// login
router.post("/login", validateLogin, login);

module.exports = router;
