import React from "react";
import logo from "../../assets/images/logo5.png"; // Ensure this is a shopping cart image
import { Link } from "react-router-dom";

const WebLogo = () => {
  return (
    <>
      <Link
        to="/"
        className="flex items-center  text-3xl font-bold text-gray-300 relative"
      >
        {/* Shopping Cart Logo */}
        <img
          className=" w-auto h-12 z-10" // z-10 to bring the logo above the shape
          src={logo}
          alt="FashionElegance logo"
        />
        {/* Logo Name */}
        <span className=" z-20 text-secondary-color">
          {"ELEGANCE".split("").map((letter, index) => (
            <span
              key={index}
              className="inline-block hover:scale-105 transition-transform duration-200 ease-in-out"
            >
              {letter}
            </span>
          ))}
        </span>
      </Link>
    </>
  );
};

export default WebLogo;
