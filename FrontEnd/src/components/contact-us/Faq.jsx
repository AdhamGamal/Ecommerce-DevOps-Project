import React, { useState } from "react";
import order from "../../assets/images/order.png";
import cancel from "../../assets/images/cancel.png";
import returnImg from "../../assets/images/return.png"; // Renamed to avoid conflict with reserved keywords
import track from "../../assets/images/track.png";
import { Cart } from "../../utils/Icons";
import formBg from "../../assets/images/formBgRev.png";

const services = [
  {
    id: 1,
    question: "How to make an order?",
    imgSrc: order,
    answer: `To make a new order, go to the store. Select the order you want to buy, and press the cart icon.`,
  },

  {
    id: 2,
    question: "How to track your order?",
    imgSrc: track,
    answer:
      "To track your order, go to your account's order history. Select the order to view its tracking details and current status.",
  },
  {
    id: 3,
    question: "How to cancel your order?",
    imgSrc: cancel,
    answer:
      "To cancel your order, navigate to the order details page. If the order hasn’t been shipped, click the 'Cancel Order' button.",
  },
  {
    id: 4,
    question: "How to return your order?",
    imgSrc: returnImg,
    answer:
      "To return your order, go to the order details page, select 'Return Item,' and follow the instructions provided for returns.",
  },
];

const closedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M19.5 8.25l-7.5 7.5-7.5-7.5"
    />
  </svg>
);

const openedIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className="w-6 h-6"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4.5 15.75l7.5-7.5 7.5 7.5"
    />
  </svg>
);

const Faq = () => {
  const [activeService, setActiveService] = useState(null);

  const toggleService = (id) => {
    setActiveService((prev) => (prev === id ? null : id));
  };

  return (
    <div
      id="faq"
      className=" w-full mx-auto p-6 shadow-lg relative"
      style={{
        backgroundImage: `url(${formBg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay with opacity */}
      <div className="absolute inset-0 bg-light-color bg-opacity-95"></div>
      <div className="relative z-10">
        <div className=" text-black pb-8 h-[500px]">
          <div className="container mx-auto px-4">
            <h3 className="text-2xl font-semibold text-center mb-6 text-secondary-color">
              Quick Assist
            </h3>
            <div className="space-y-4">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="p-4 bg-gray-100 rounded-lg shadow-md hover:shadow-lg transition"
                >
                  <div
                    className="flex items-center justify-between cursor-pointer"
                    onClick={() => toggleService(service.id)}
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={service.imgSrc}
                        alt={service.question}
                        className="w-10 h-10 object-contain"
                      />
                      <span className="text-lg font-medium">
                        {service.question}
                      </span>
                    </div>
                    <span>
                      {activeService === service.id ? openedIcon : closedIcon}
                    </span>
                  </div>
                  {activeService === service.id && (
                    <p className="mt-4 text-gray-700">{service.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
