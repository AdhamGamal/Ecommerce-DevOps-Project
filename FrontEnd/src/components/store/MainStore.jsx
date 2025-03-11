import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bags from "../../assets/images/bags2.jpg";
import clothesWomen from "../../assets/images/clothesWomen.jpg";
import shoesWomen from "../../assets/images/shoesWomen2.webp";
import sunglasses from "../../assets/images/sunglasses.webp";
import menSunGlasses from "../../assets/images/menSunGlasses.avif";
import AccessoriesWowmen from "../../assets/images/AccessoriesWowmen.jpg";
import menWatch from "../../assets/images/menWatch.webp";
import womenWatch from "../../assets/images/womenWatch.webp";
import menShose from "../../assets/images/menShose.jpg";
import menClothes from "../../assets/images/menClothes.jpg";
import menBags from "../../assets/images/menBags.jpg";
import kidsClothes from "../../assets/images/kidsClothes.jpg";
import kidsshoes from "../../assets/images/kidsshoes.jpg";
import kidsToys from "../../assets/images/kidsToys.jpg";
import kidsAcc from "../../assets/images/kids11.webp";
import kidsBags from "../../assets/images/kidsBags.webp";
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
      { name: "Toys", image: kidsToys },
      { name: "Accessories", image: kidsAcc },
      { name: "Bags", image: kidsBags },
    ],
  },
];

const MainStore = () => {
  const [visibleSubcategories, setVisibleSubcategories] = useState(
    products.map(() => 4) // Show 4 subcategories initially for each category
  );
  const navigate = useNavigate(); // Initialize useNavigate

  const handleShowMore = (index) => {
    setVisibleSubcategories((prev) =>
      prev.map((count, i) => (i === index ? count + 4 : count))
    );
  };

  const handleSubcategoryClick = (category, type) => {
    // Navigate to the Products page with query parameters
    navigate(`/products?category=${category}&type=${type}`);
  };

  return (
    <div className="container mx-auto p-6 px-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-secondary-color">
        Explore Our Store
      </h2>

      {products.map((category, index) => (
        <div key={index} className="mb-10">
          {/* Category Title */}
          <h3 className="text-2xl font-semibold mb-3 border-b-2 pb-2 text-secondary-color">
            {category.name}
          </h3>

          {/* Subcategories Grid */}
          <div className="grid grid-cols-1  sm:grid-cols-2  lg:grid-cols-4 gap-4">
            {category.subcategories
              .slice(0, visibleSubcategories[index])
              .map((sub, i) => (
                <div
                  key={i}
                  className="border h-[250px] w-full rounded-lg shadow-md text-center hover:scale-105 cursor-pointer"
                  onClick={() =>
                    handleSubcategoryClick(
                      category.name.toLowerCase().replace(" ", ""),
                      sub.name.toLowerCase()
                    )
                  }
                >
                  <img
                    src={sub.image}
                    alt={sub.name}
                    className="mx-auto h-[200px] w-full rounded-t-md object-cover"
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
                className="mt-3 "
              >
                Show More{" "}
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
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
