import React from "react";
import Button from "../UI/Button";
import formBg from "../../assets/images/formBg.avif";

const ContactUsForm = () => {
  return (
    <div
      className="w-full mx-auto p-6 shadow-lg relative"
      style={{
        backgroundImage: `url(${formBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-black bg-opacity-90"></div>

      {/* Form content */}
      <div className="relative z-10">
        <h2 className="text-2xl font-bold mb-4 text-center text-secondary-color">
          Contact Us
        </h2>
        <form className="space-y-4">
          <div>
            {/* <label className="block text-primary-color font-medium mb-1">
              Name
            </label> */}
            <input
              type="text"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-color"
              placeholder="Enter your name"
            />
          </div>
          <div>
            {/* <label className="block text-primary-color font-medium mb-1">
              Email
            </label> */}
            <input
              type="email"
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-color"
              placeholder="Enter your email"
            />
          </div>
          <div>
            {/* <label className="block text-primary-color font-medium mb-1">
              Message
            </label> */}
            <textarea
              className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary-color"
              rows="6"
              placeholder="Enter your message"
            ></textarea>
          </div>
          <div className="flex justify-center items-center ">
            <Button onClick={() => {}} className={`mt-10`}>
              Send Message
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContactUsForm;
