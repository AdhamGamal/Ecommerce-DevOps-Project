import React, { useState } from "react";
// import bags from "../../assets/images/bags.webp";
import bags from "../../assets/images/bags2.jpg";
import clothesWomen from "../../assets/images/clothesWomen.jpg";
import shoesWomen from "../../assets/images/shoesWomen2.webp";
import sunglasses from "../../assets/images/sunglasses.webp";
import menSunGlasses from "../../assets/images/menSunGlasses.webp";
import AccessoriesWowmen from "../../assets/images/AccessoriesWowmen.jpg";
import menWatch from "../../assets/images/menWatch.webp";
import womenWatch from "../../assets/images/womenWatch.webp";
import menShose from "../../assets/images/menShose.jpg";
import menClothes from "../../assets/images/menClothes.jpg";
import menBags from "../../assets/images/menBags.jpg";
import kidsClothes from "../../assets/images/kidsClothes.jpg";
import kidsshoes from "../../assets/images/kidsshoes.jpg";
import Button from "../UI/Button";

const products = [
  {
    name: "Fashion Women",
    subcategories: [
      { name: "Bags", image: bags },
      { name: "Clothes", image: clothesWomen },
      { name: "Watches", image: womenWatch },

      { name: "Shoes", image: shoesWomen },
      { name: "Sunglasses", image: sunglasses },
      { name: "Accessories", image: AccessoriesWowmen },
    ],
  },
  {
    name: "Fashion Men",
    subcategories: [
      { name: "Clothes", image: menClothes },
      { name: "Shoes", image: menShose },
      { name: "Watches", image: menWatch },
      { name: "Sunglasses", image: menSunGlasses },
      { name: "Bags & Belts", image: menBags },
    ],
  },
  {
    name: "Fashion Kids",
    subcategories: [
      { name: "Clothes", image: kidsClothes },
      { name: "Shoes", image: kidsshoes },
      { name: "Toys", image: "path/to/kids-toys.jpg" },
      { name: "Accessories", image: "path/to/kids-accessories.jpg" },
      { name: "Bags", image: "path/to/kids-bags.jpg" },
    ],
  },
];

const MainStore = () => {
  const [visibleSubcategories, setVisibleSubcategories] = useState(
    products.map(() => 3) // Show 3 subcategories initially for each category
  );

  const handleShowMore = (index) => {
    setVisibleSubcategories((prev) =>
      prev.map((count, i) => (i === index ? count + 3 : count))
    );
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6 text-primary-color">
        Explore Our Store
      </h2>

      {products.map((category, index) => (
        <div key={index} className="mb-10">
          {/* Category Title */}
          <h3 className="text-2xl font-semibold mb-3 border-b-2 pb-2 text-secondary-color">
            {category.name}
          </h3>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-4">
            {category.subcategories
              .slice(0, visibleSubcategories[index])
              .map((sub, i) => (
                <div
                  key={i}
                  className="border h-[250px] rounded-lg shadow-md text-center"
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className=" mx-auto h-[200px] rounded-t-md object-cover"
                  />
                  <p className="font-medium h-[50px] flex items-center justify-center text-white bg-light-color rounded-b-lg">
                    {sub.name}
                  </p>
                </div>
              ))}
          </div>

          {/* Show More Button */}
          {visibleSubcategories[index] < category.subcategories.length && (
            <div className="flex justify-center items-center">
              <Button
                primary={false}
                onClick={() => handleShowMore(index)}
                className="mt-4 px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color transition"
              >
                Show More{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="white"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="size-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m19.5 8.25-7.5 7.5-7.5-7.5"
                    />
                  </svg>
                </span>
              </Button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MainStore;
