const User = require("../models/User");
const AppError = require("../utils/AppError");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//_________________________________//get all users//____________________________//

const getAllUsers = async (req, res, next) => {
  const users = await User.find();
  res.send(users);
};
//_________________________________//get all users//____________________________//

const getUserById = async (req, res, next) => {
  const { user } = req;
  // console.log(user);
  if (!user) return next(new AppError("User Not Found!", 404));
  // populate User before sending response
  await postFindUser(user);
  res.send(user);
};
//_________________________________//get all users//____________________________//

const register = async (req, res, next) => {
  const { userName, email, password } = req.body;
  if (await User.findOne({ email })) {
    res.status(409).send({ message: "This Email already registered" });
  }
  let createdUser = await User.create({
    userName,
    email,
    password,
  });
  // console.log("🚀 ~ register ~ createdUser:", createdUser);
  res.status(201).send({ message: "User created successfully!" });
};
//_________________________________//get all users//____________________________//

const updateUser = async (req, res, next) => {
  const { id } = req.params;
  // const user = await User.findById(id);
  // if (!user) return next(new AppError("User Not Found", 500));

  let { username } = req.body;
  if (!username) return next(new AppError("Invalid data", 400));
  // if (balance) {
  //   balance = +balance + +user.balance;
  // }
  // console.log(req.body);
  const editedUser = await User.findByIdAndUpdate(
    id,
    {
      userName: username,
    },
    { new: true }
  );
  res.send({ message: "user updated successfully!", editedUser });
};

//_________________________________//get all users//____________________________//

const changePassword = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id).select("+password");
  if (!user) return next(new AppError("User Not Found", 404));

  let { currentPassword, newPassword, confirmPassword } = req.body;

  const isMatch = await user.comparePassword(currentPassword);
  if (!isMatch) return next(new AppError("Invalid Credentials!", 400));

  if (newPassword !== confirmPassword) {
    return next(new AppError("Password mismatch", 403));
  }

  const editedUser = await User.findByIdAndUpdate(
    id,
    { password: await bcrypt.hash(newPassword, +process.env.HASHING_COST) },
    { new: true }
  );
  res.send({ message: "Password updated successfully!" });
};

//_________________________________//get all users//____________________________//

const login = async (req, res, next) => {
  // Extract email and password from request body
  const { email, password } = req.body;

  try {
    // Check if the email exists in the database
    const user = await User.findOne({ email: email }).select("+password");

    // If the email does not exist, return a 400 error (Bad Request)
    if (!user) {
      return next(new AppError(`${translations.invalidUserCredentials}`, 400));
    }

    // Check if the provided password matches the stored password
    const isMatch = await user.comparePassword(password);

    // If passwords don't match, return a 400 error (Bad Request)
    if (!isMatch) {
      return next(new AppError(`${translations.invalidUserCredentials}`, 400));
    }

    // Create a JWT token containing user ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.ENCRYPTION_KEY
    );

    // Remove password from the user object before sending it in the response
    user.password = undefined;

    // Send a success response with the logged-in user data and token
    res.status(200).send({
      message: "user logged in successfully!",
      user,
      token,
    });
  } catch (error) {
    // Handle any unexpected errors
    return next(new AppError(`${translations.internalServerError}`, 500));
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  register,
  updateUser,
  changePassword,
  login,
};
