import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProductImageSwiper from "./ProductImageSwiper";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import AddReview from "./AddReview";

const Product = () => {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${process.env.URL}/products/${id}`);
        setProduct(response.data.product); // Assuming the API returns the product in a `product` field
        console.log(
          "🚀 ~ fetchProduct ~ response.data.product:",
          response.data.product
        );
      } catch (error) {
        console.error("Error fetching product:", error);
        setError("Failed to fetch product details.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [id]); // Re-fetch when the `id` changes

  if (isLoading) {
    return (
      <div className="text-center text-gray-600">
        Loading product details...
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-500">Product not found.</div>;
  }

  return (
    <div className="p-5 max-w-7xl mx-auto flex flex-col">
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
        <ProductImageSwiper product={product} />
        <ProductDetails product={product} />
      </div>
      {/* <ProductReviews product={product} /> */}
      <AddReview />
    </div>
  );
};

export default Product;
