import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import backgroundImage from "../../assets/images/formBg.avif"; // Import the background image
import WebLogo from "../UI/WebLogo";
import Button from "../UI/Button";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons from react-icons
import { toast } from "react-toastify";
import URL from "../../utils/URL";
import signUpSchema from "../models/SignUpSchema";

const SignUp = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  //usenavigate
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const onSubmit = async (data) => {
    console.log(data);
    console.log(URL);

    try {
      const response = await axios.post(`${URL}/users/`, data);

      console.log("🚀 ~ onSubmit ~ response:", response);
      if (response.status === 201) {
        navigate("/login");
        toast.success(response.data.message, {
          theme: "colored",
        });
        reset();
      }
    } catch (error) {
      if (error.response?.status === 409) {
        setError("email", {
          type: "manual",
          message: "Email is already registered",
        });
      } else if (error.response) {
        const { data } = error.response;

        if (data.message) {
          setError("error", {
            type: "manual",
            message: data.message,
          });
        }
      } else {
        // Handle other errors here
        setError("error", {
          type: "manual",
          message: "error occurred while submitting the form",
        });
      }
    }
  };
  return (
    <div className="min-h-screen flex">
      <div className="w-full relative flex items-center justify-center ">
        {/* Background with opacity for the form section */}
        <div
          className=" absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>

        {/* Form container */}
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <WebLogo />{" "}
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">
            Create your account
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* userName Field */}
            <div className="mb-2">
              <label className="block text-gray-700">user name</label>
              <input
                type="text"
                {...register("userName")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-secondary-color"
                placeholder="Enter your user name"
              />
              {errors.userName && (
                <p className="text-red-500 text-sm">
                  {errors.userName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="mb-2">
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                {...register("email")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-dark-secondary-color"
                placeholder="testi@gmail.com"
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="mb-2 relative">
              <label className="block text-gray-700">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                {...register("password")}
                className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute inset-y-0 right-0 top-6 text-zinc-700  pr-3 flex items-center text-lg leading-5"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* error */}
            <div>
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-6 relative">
              <label className="block text-gray-700">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                {...register("confirmPassword")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-color"
                placeholder="Confirm your password"
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute inset-y-0 right-0 top-6 text-zinc-700 pr-3 flex items-center text-lg leading-5"
              >
                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {/* error */}
            <div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>
            {/* Sign Up Button */}
            <Button
              primary={false}
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-primary-color text-black rounded-lg hover:bg-secondary-color transition-colors"
            >
              Sign Up
            </Button>

            {/* Already have an account? */}
            <div className="mt-4 text-center">
              <span className="text-gray-600">Already have an account? </span>

              <Link
                to="/login"
                className="text-back-color font-semibold hover:underline"
              >
                Log in
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
