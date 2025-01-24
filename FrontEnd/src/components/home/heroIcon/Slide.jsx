import React from "react";

const Slide = ({ image, title1, title2, text, buttonName }) => {
  return (
    <div className="relative w-full h-full">
      {/* Background Image */}
      <img
        src={image}
        className="block w-full h-full object-cover"
        alt={`Slide: ${title1}`}
      />
      {/* Overlay for better text visibility */}
      <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col items-center justify-center">
        {/* Text container */}
        <div className="text-center p-6 bg-black bg-opacity-50 rounded-lg max-w-2xl">
          <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-white md:text-5xl xl:text-6xl">
            {title1}
          </h1>
          <h2 className="mb-4 text-xl font-bold leading-none tracking-tight text-secondary-color md:text-3xl xl:text-4xl">
            {title2}
          </h2>
          <p className="mb-6 text-lg text-gray-200 md:text-xl">{text}</p>
          <button
            type="button"
            className="text-white bg-gradient-to-r from-red-600 to-orange-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            {buttonName}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
