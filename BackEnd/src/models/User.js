const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const Order = require("./Order");

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      minLength: 3,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
    profile_pic: {
      type: String,
      default:
        "https://res.cloudinary.com/ddkkalgoh/image/upload/v1687376480/profile_pics/Default_Avatar.jpg",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.virtual("orders", {
  ref: "Order",
  localField: "_id",
  foreignField: "user",
});
userSchema.virtual("wishlist", {
  ref: "Wishlist",
  localField: "_id",
  foreignField: "user",
});
userSchema.virtual("cart", {
  ref: "Cart",
  localField: "_id",
  foreignField: "user",
});

// hashing password before saving the document to the db
userSchema.pre("save", async function () {
  // hashing password only when changed,
  //  because this pre middlware will be executed when updating also.
  if (this.isModified("password")) {
    const hashedPassword = await bcrypt.hash(
      this.password,
      +process.env.HASHING_COST
    );
    this.password = hashedPassword;
  }
});

// avoid returning the password in the response
userSchema.post("save", function () {
  this.password = undefined;
});

// comparing the stored password with the entered one
userSchema.methods.comparePassword = async function (password) {
  const isMatch = await bcrypt.compare(password, this.password);
  return isMatch;
};

const User = mongoose.model("users", userSchema);
module.exports = User;
