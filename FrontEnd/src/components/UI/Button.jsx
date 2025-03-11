import React from "react";

const Button = ({
  children,
  primary = true,
  className = "",
  onClick,
  type = "button",
}) => {
  const clickHandler = () => {
    if (onClick) onClick();
  };

  return (
    <button
      type={type}
      onClick={clickHandler}
      className={`${
        primary
          ? "inline-flex items-center gap-2 px-4 py-3 text-sm font-medium text-white bg-gradient-to-r from-primary-color to-secondary-color rounded-md hover:from-secondary-color hover:to-primary-color focus:ring-4 focus:outline-none focus:ring-blue-300 transition-all duration-300"
          : "inline-flex items-center gap-2 px-4 py-3 text-sm font-medium bg-secondary-color text-primary-color  hover:bg-zinc-700 hover:text-secondary-color rounded-md  focus:ring-4 focus:outline-none focus:ring-gray-400 transition-all duration-300"
      }  ${className}  font-semibold flex justify-center items-center`}
    >
      {children}
    </button>
  );
};

export default Button;
