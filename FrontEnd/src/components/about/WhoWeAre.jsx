import React from "react";
import AboutUs from "../../assets/images/About.png"; // Replace with your image path

const WhoWeAre = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-back-color ">
      {/* Image Section (Your Original Style) */}
      <div className="md:h-[80vh] w-full">
        <img
          src={AboutUs}
          alt="Shopping Bag"
          className="w-full h-full object-contain bg-zinc-800"
        />
      </div>

      {/* Content Section (Enhanced Design) */}
      <div className="w-full max-w-4xl px-6 mt-8">
        {/* Title: Who We Are */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-secondary-color">
          Who We Are
        </h2>

        {/* Content */}
        <p className="text-text-color text-lg md:text-xl leading-relaxed text-center">
          We are a passionate team dedicated to bringing you the best shopping
          experience. Our mission is to provide high-quality products,
          exceptional customer service, and a seamless online shopping journey.
        </p>
      </div>
    </div>
  );
};

export default WhoWeAre;
