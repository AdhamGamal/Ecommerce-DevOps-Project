import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import backgroundImage from "../../assets/images/formBg.avif"; // Import the background image
import WebLogo from "../UI/WebLogo";
import Button from "../UI/Button";
import { toast } from "react-toastify";
import signInSchema from "../models/SignInSchema";
import { useDispatch, useSelector } from "react-redux";
import { login, updateUserState } from "../../store/slices/authSlice";
import { setCart } from "../../store/slices/cartSlice";
import { setWishlist } from "../../store/slices/wishlistSlice";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError,
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      const response = await axios.post(`/api/users/login`, data);
      if (response.status === 200) {
        console.log("🚀 ~ onSubmit ~ response:", response);
        const { token, user } = response.data;
        console.log("🚀 ~ onSubmit ~ response.data:", response.data);

        dispatch(login({ token, user }));
        navigate("/"); // Redirect to home or dashboard after login
        toast.success(response.data.message, {});
        // toast.success(response.data.message, {
        //   position: "top-right",
        //   autoClose: 5000, // Close after 5 seconds
        //   hideProgressBar: false,
        //   closeOnClick: true,
        //   pauseOnHover: true,
        //   draggable: true,
        //   progress: undefined,
        //   style: { backgroundColor: "#ffde8a", color: "#000000" }, // Yellow background with black text
        // });
        reset();
      }
    } catch (error) {
      if (error.response?.status === 400) {
        setError("error", {
          type: "manual",
          message: "Invalid Email Or Password",
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
        setError("error", {
          type: "manual",
          message: "An error occurred while submitting the form",
        });
      }
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-full relative flex items-center justify-center ">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-10"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        ></div>

        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
          <div className="flex justify-center mb-6">
            <WebLogo />
          </div>

          <h2 className="text-2xl font-bold mb-6 text-center">
            Welcome back!!!
          </h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
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
            <div className="mb-6">
              <label className="block text-gray-700">Password</label>
              <input
                type="password"
                {...register("password")}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-color"
              />
              {errors.password && (
                <p className="text-red-500 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>
            <Button
              primary={false}
              type="submit"
              className="w-full mt-6 px-4 py-2 bg-primary-color text-black rounded-lg hover:bg-secondary-color transition-colors"
            >
              Sign in
            </Button>

            <div className="mt-4 text-center">
              <a href="#" className="text-dark-secondary-color hover:underline">
                Forget Password?
              </a>
            </div>
            <div className="mt-4 text-center">
              <span className="text-gray-600">I don't have an account </span>
              <Link
                to="/sign-up"
                className="text-back-color font-semibold hover:underline"
              >
                Sign up
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
