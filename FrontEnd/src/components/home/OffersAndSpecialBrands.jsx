import React from "react";
import FlashSale from "../../assets/images/flash2.gif";
import gaza from "../../assets/images/gaza.png";
import bestPrice from "../../assets/images/bestPrice.png";
import vouchers from "../../assets/images/vouchers.png";
import egypt from "../../assets/images/egypt.png";
import later from "../../assets/images/later2.webp";
import post from "../../assets/images/post.jpg";

const OffersAndSpecialBrands = () => {
  const cards = [
    {
      id: 1,
      backGround: "bg-gray-100",
      image: FlashSale,
      title: " أقوى الخصومات",
    },
    {
      id: 2,
      backGround: "bg-gray-100",
      image: gaza,
      title: "Donate For Gaza ",
    },
    {
      id: 3,
      backGround: "bg-gray-100",
      image: bestPrice,
      title: "Best Price",
    },
    {
      id: 4,
      backGround: "bg-gray-100",
      image: vouchers,
      title: "Gifts ",
    },
    {
      id: 5,
      backGround: "bg-gray-100",
      image: later,
      title: "Pay Later",
    },
    {
      id: 6,
      backGround: "bg-gray-100",
      image: egypt,
      title: "Made in Egypt",
    },
  ];

  return (
    <>
      <div className="container mx-auto px-4 py-8 w-full mb-5">
        {/* 1st Section */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {cards.map((item) => (
            <div
              key={item.id} // Key should be here, at the outermost element
              className="flex flex-col items-center justify-center gap-1 hover:scale-105"
            >
              <div
                className={`${item.backGround} rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden p-2`}
              >
                <img
                  src={item.image}
                  alt={`Card ${item.id}`}
                  className="w-full h-48 object-cover transform transition-transform duration-300"
                />
              </div>
              <div className="text-lg text-text-color font-semibold hover:text-secondary-color">
                {item.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* 2nd Section */}
      <div className="">
        <img
          src={post}
          alt="post"
          className="w-full h-full rounded-lg shadow-md"
        />
      </div>
    </>
  );
};

export default OffersAndSpecialBrands;
