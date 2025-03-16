import * as React from "react";
import loading from "../../assets/images/loading.gif";

export default function Loading() {
  return (
    <div className=" h-screen flex   justify-center items-center">
      <div className="relative  flex flex-col items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute top-0  w-64 h-64 bg-contain  z-0"
          style={{ backgroundImage: `url(${loading})` }}
        ></div>

        {/* Loading Text */}
        <p className="absolute  top-36  mt-8 text-2xl text-white font-bold z-10">
          Loading...
        </p>
      </div>
    </div>
  );
}
