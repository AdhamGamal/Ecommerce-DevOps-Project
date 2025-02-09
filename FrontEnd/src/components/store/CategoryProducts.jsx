import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Cart, Share, WishList } from "../../utils/Icons";
import StarRating from "../UI/StarRating";
import bags from "../../assets/images/bags2.jpg";
import post from "../../assets/images/post2.jpg";
import ShareModal from "../UI/ShareModal";

const CategoryProducts = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");
  const type = searchParams.get("type");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    url: "",
    image: "",
    price: "",
  });
  const navigate = useNavigate();

  const products = {
    fashionwomen: {
      bags: [
        {
          id: 1,
          name: "Handbag",
          image: bags,
          prevPrice: "$50",
          finalPrice: "$30",
          vendor: "H&M",
          review: 4.8,
        },
        {
          id: 2,
          name: "Handbag",
          image: bags,
          prevPrice: "$120",
          finalPrice: "$100",
          vendor: "H&M",
          review: 2.1,
        },
      ],
      clothes: [
        {
          id: 3,
          name: "Dress",
          image: bags,
          prevPrice: "$60",
          finalPrice: "$40",
          vendor: "ZARA",
          review: 4.7,
        },
      ],
    },
    fashionmen: {
      clothes: [
        {
          id: 4,
          name: "Shirt",
          image: bags,
          prevPrice: "$40",
          finalPrice: "$30",
          vendor: "TOWN TEAM",
          review: 4.6,
        },
      ],
    },
  };

  const categoryProducts = products[category]?.[type] || [];

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="container mx-auto p-6 px-16">
      <h2 className="text-3xl font-bold text-center mb-6 text-secondary-color">
        {category} - {type}
      </h2>
      <div className="my-10">
        <img
          src={post}
          alt="post"
          className="w-full h-full rounded-lg shadow-md"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 justify-items-center">
        {categoryProducts.map((product, i) => (
          <div
            key={i}
            className="border h-fit w-full rounded-lg shadow-md text-center hover:scale-[102%] transition-transform duration-300 cursor-pointer"
            onClick={() => handleProductClick(product.id)}
          >
            <img
              src={product.image}
              alt={product.name}
              className="mx-auto h-[300px] w-full rounded-t-md object-cover"
            />

            <div className="p-4">
              <div className="flex justify-between items-center">
                <span className="font-medium text-lg text-text-color">
                  {product.name}
                </span>
                <span className="flex justify-center items-center gap-1">
                  <StarRating rating={product.review} />
                  <span className="text-zinc-500"> {product.review} </span>
                </span>
              </div>

              <p className="flex flex-col justify-start items-start text-sm text-gray-600">
                {product.vendor.length > 30
                  ? `${product.vendor.substring(0, 30)}...`
                  : product.vendor}
              </p>

              {/* Price Section */}
              <div className="flex justify-end items-center my-2 space-x-2">
                <span className="text-gray-500 line-through">
                  {product.prevPrice}
                </span>
                <span className="text-xl font-bold text-secondary-color">
                  {product.finalPrice}
                </span>
              </div>

              <div className="flex justify-around items-center p-4 border-t">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleCart(product.name);
                  }}
                  className="text-secondary-color hover:text-text-color transition-colors duration-300"
                >
                  {Cart}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWishlist(product.name);
                  }}
                  className="text-secondary-color hover:text-text-color transition-colors duration-300"
                >
                  {WishList}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleShare(product);
                  }}
                  className="text-secondary-color hover:text-text-color transition-colors duration-300"
                >
                  {Share}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <ShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        productUrl={selectedProduct.url}
        productImage={selectedProduct.image}
        productPrice={selectedProduct.price}
      />
    </div>
  );
};

export default CategoryProducts;
