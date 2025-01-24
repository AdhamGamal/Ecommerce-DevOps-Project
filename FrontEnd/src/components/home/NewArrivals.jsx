import React from "react";
import ClassicLeatherJacket from "../../assets/images/ClassicLeatherJacket.jpg";
import ElegantGoldNecklace from "../../assets/images/ElegantGoldNecklace.jpg";
import StylishSneakers from "../../assets/images/StylishSneakers.jpg";
import ModernBackpack from "../../assets/images/ModernBackpack.avif";
// import brand1 from "../../assets/images/brand1.jpg";
// import brand2 from "../../assets/images/brand2.jpg";
// import brand3 from "../../assets/images/brand3.jpg";
// import brand4 from "../../assets/images/brand4.png";

const NewArrivals = () => {
  const arrivals = [
    {
      id: 1,
      name: "Jackets Shop",
      image: ClassicLeatherJacket,
    },
    {
      id: 2,
      name: "Elegant Gold Store",
      image: ElegantGoldNecklace,
    },
    {
      id: 3,
      name: "Stylish Sneakers",
      image: StylishSneakers,
    },
    {
      id: 4,
      name: "Backpack Brand",
      image: ModernBackpack,
    },
  ];

  return (
    <div className="bg-light-color p-6">
      <h2 className="text-3xl font-bold text-center mb-8 text-secondary-color">
        New Arrivals
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {arrivals.map((item) => (
          <div
            key={item.id}
            className="bg-primary-color text-text-color rounded-lg shadow-lg p-4 flex flex-col items-center"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-64 object-cover rounded-lg mb-4 hover:scale-105"
            />
            <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
            <button className="bg-secondary-color text-primary-color font-medium py-2 px-4 rounded hover:bg-light-color">
              Shop Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewArrivals;
