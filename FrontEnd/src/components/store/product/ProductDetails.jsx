import React from "react";
import { Cart, WishList } from "../../../utils/Icons";
import Button from "../../UI/Button";

const ProductDetails = ({ product }) => {
  return (
    <div className="px-4 mt-5 lg:mt-0">
      <h1 className="text-3xl font-bold text-secondary-color">
        {product.name}
      </h1>
      <div className="grid grid-rows-3 gap-10">
        <p className="mt-4 text-gray-400 row-span-2">
          {product.ProductDetails}
        </p>

        <div className=" flex flex-col justify-between  ">
          <h2 className="text-xl text-gray-600 mt-3 flex justify-end items-center">
            <span className="text-gray-500 line-through mr-2">
              {product.prevPrice}
            </span>
            <span className="text-xl font-bold text-secondary-color">
              {product.finalPrice}
            </span>
          </h2>

          <div className="mt-3 flex items-center justify-center gap-4">
            <Button
              primary={false}
              className=" px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color transition"
            >
              Add to cart {Cart}
            </Button>
            <Button
              primary={false}
              className=" px-4 py-2 bg-primary-color text-white rounded-md hover:bg-secondary-color transition"
            >
              {WishList}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
