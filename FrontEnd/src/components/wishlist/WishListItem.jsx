import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import bags from "../../assets/images/bags2.jpg";
import emptyCart from "../../assets/images/empty-cart.png";
import Button from "../UI/Button";
import { FiTrash2 } from "react-icons/fi";

const WishListItem = () => {
  const navigate = useNavigate(); // Initialize useNavigate

  // Dummy data for the wishlist
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      image: bags,
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      image: bags,
    },
    {
      id: 3,
      name: "Product 3",
      price: 9.99,
      image: bags,
    },
  ]);

  // Function to handle removing an item from the wishlist
  const handleRemove = (id) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Function to handle adding an item to the cart
  const handleAddToCart = (id) => {
    alert(`Added item ${id} to cart`);
    // You can add logic here to move the item to the cart
  };

  // Function to handle navigating to the product detail page
  const handleProductClick = (id) => {
    navigate(`/product/${id}`); // Navigate to the product detail page
  };

  return (
    <div className="p-6 bg-light-color min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-text-color">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img
            src={emptyCart}
            alt="emptyCart"
            className="object-cover rounded w-64 h-64"
          />
          <p className="text-gray-500 text-lg mt-4">Your wishlist is empty.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1  gap-6">
            {/* Wishlist Items List */}
            <div className="lg:col-span-2 space-y-4">
              {wishlistItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-primary-color rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  onClick={() => handleProductClick(item.id)} // Add onClick handler
                  style={{ cursor: "pointer" }} // Change cursor to pointer
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                  <div className="flex-1 ml-4">
                    <h2 className="text-lg font-semibold text-text-color">
                      {item.name}
                    </h2>
                    <p className="text-gray-500">${item.price.toFixed(2)}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <Button
                      primary={false}
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the click from bubbling up to the parent div
                        handleAddToCart(item.id);
                      }}
                      className="w-full  px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-secondary-color transition-colors"
                    >
                      Add to Cart
                    </Button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation(); // Prevent the click from bubbling up to the parent div
                        handleRemove(item.id);
                      }}
                      className="text-red-300 hover:text-red-400 transition-colors"
                    >
                      <FiTrash2 size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};
// d
export default WishListItem;
