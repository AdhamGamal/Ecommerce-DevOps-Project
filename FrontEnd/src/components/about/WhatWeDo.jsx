import React from "react";

const WhatWeDo = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full bg-back-color py-12">
      <div className="w-full max-w-4xl px-6 mt-8">
        {/* Title: Who We Are */}
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-6 text-secondary-color">
          What We Do
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

export default WhatWeDo;
