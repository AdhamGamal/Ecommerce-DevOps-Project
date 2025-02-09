import React from "react";
import ProductImageSwiper from "./ProductImageSwiper";
import ProductDetails from "./ProductDetails";
import ProductReviews from "./ProductReviews";
import { useParams } from "react-router-dom";
import bag1 from "../../../assets/images/bag1.jpg";
import bag2 from "../../../assets/images/bag2.jpg";
import bag3 from "../../../assets/images/bag3.jpg";
import bag4 from "../../../assets/images/bag4.jpg";
import bag5 from "../../../assets/images/bag5.jpg";
import bag6 from "../../../assets/images/bag6.jpg";
import bag7 from "../../../assets/images/bag7.jpg";
import bag8 from "../../../assets/images/bag8.jpg";
import AddReview from "./AddReview";

const Product = () => {
  const { id } = useParams(); // Get product ID from URL

  // Example product data (replace with actual data fetching logic)
  const products = [
    {
      id: 1,
      name: "Handbag",
      images: [bag1, bag2, bag3, bag4, bag5, bag6, bag7, bag8],
      prevPrice: "$50",
      finalPrice: "$30",
      ProductDetails:
        "B.S Collection offers its modern and different Totti Bag and Soft B.S shoulder bag with a soft texture of nylon fabric lined with high-quality padding layers with faux leather arms that give it an elegance that you are not used to in raspberry bags before with durability and high durability for heavy loads, as all these features hide behind the striking lightness. Therefore, the practical design was taken into account by combining strength and durability with the lightness of weight, beauty and simplicity of design, which makes its popularity constantly increasing among our customers and the optimal and practical choice of the picnic bag, club, resort, beach, shopping, work and travel, and its acquisition in several colors chosen very carefully such as royal black, blue, phosphorescent, havan and pink to suit each color with your personal character and your belongings during the outing.",
      reviews: [
        {
          name: "John Doe",
          rating: 4,
          createdAt: "2/2/2025",
          title: "Great product! Highly recommend it.",
          review:
            "very good and arrive as shown , i will buy it again and never stop buy it",
        },
        {
          name: "Jane Smith",
          rating: 5,
          createdAt: "2/2/2025",
          title: "Exceeded my expectations. Quality is top-notch!",
          review:
            "very good and arrive as shown , i will buy it again and never stop buy it",
        },
        {
          name: "Ahmed Ali",
          rating: 3,
          createdAt: "2/2/2025",
          title: "Good product, but could be better.",
          review:
            "very good and arrive as shown , i will buy it again and never stop buy it",
        },
        {
          name: "Sara Mohamed",
          rating: 2,
          createdAt: "2/2/2025",
          title: "Not as expected. The material feels cheap.",
          review:
            "very good and arrive as shown , i will buy it again and never stop buy it",
        },
        {
          name: "Ali Hassan",
          rating: 5,
          createdAt: "2/2/2025",
          title: "Amazing bag! Perfect for daily use.",
          review:
            "very good and arrive as shown , i will buy it again and never stop buy it",
        },
      ],
    },
    {
      id: 2,
      name: "Backpack",
      images: [bag1, bag2, bag3, bag4, bag5, bag6, bag7, bag8],
      prevPrice: "$70",
      finalPrice: "$50",
      ProductDetails: "A durable backpack for travel and work.",
      reviews: [
        {
          name: "Jane Smith",
          rating: 5,
          createdAt: "2/2/2025",
          title: "Exceeded my expectations. Quality is top-notch!",
          review:
            "very good and arrive as shown , i will buy it again and never stop buy it",
        },
      ],
    },
  ];

  // Find the product by ID
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <div className="p-5 max-w-7xl mx-auto flex flex-col ">
      <div className="grid grid-cols-1 lg:grid-cols-2 mt-5">
        <ProductImageSwiper product={product} />
        <ProductDetails product={product} />
      </div>
      <ProductReviews product={product} />
      <AddReview />
    </div>
  );
};

export default Product;
