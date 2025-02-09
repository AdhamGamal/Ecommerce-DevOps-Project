import React, { useState } from "react";
import { FiTrash2 } from "react-icons/fi";
import bags from "../../assets/images/bags2.jpg";
import emptyCart from "../../assets/images/empty-cart.png";
import Button from "../UI/Button";

const CartItem = () => {
  // Dummy data for the cart
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Product 1",
      price: 19.99,
      quantity: 2,
      image: bags,
    },
    {
      id: 2,
      name: "Product 2",
      price: 29.99,
      quantity: 1,
      image: bags,
    },
    {
      id: 3,
      name: "Product 3",
      price: 9.99,
      quantity: 3,
      image: bags,
    },
  ]);

  // Function to handle decreasing the quantity of an item
  const handleDecrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity - 1) }
          : item
      )
    );
  };

  // Function to handle increasing the quantity of an item
  const handleIncrease = (id) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  // Function to handle removing an item from the cart
  const handleRemove = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  // Calculate total cost
  const totalCost = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  // Calculate total number of items
  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div className="p-6 bg-light-color min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-text-color">Your Cart</h1>
      {cartItems.length === 0 ? (
        <div className="flex flex-col justify-center items-center">
          <img
            src={emptyCart}
            alt="emptyCart"
            className="object-cover rounded "
          />
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart Items List */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between p-4 bg-primary-color rounded-lg shadow-sm hover:shadow-md transition-shadow"
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
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleDecrease(item.id)}
                      className="px-3 py-1 rounded-lg bg-[#ecd17b] hover:bg-[#d4b963] transition-colors"
                    >
                      -
                    </button>
                    <span className="px-4 py-1 text-text-color">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => handleIncrease(item.id)}
                      className="px-3 py-1 rounded-lg bg-[#ecd17b] hover:bg-[#d4b963] transition-colors"
                    >
                      +
                    </button>
                  </div>
                  <button
                    onClick={() => handleRemove(item.id)}
                    className="ml-4 text-red-300 hover:text-red-400 transition-colors"
                  >
                    <FiTrash2 size={20} />
                  </button>
                </div>
              ))}
            </div>

            {/* Cart Summary */}
            <div className="lg:col-span-1">
              <div className="bg-zinc-800 rounded-lg shadow-sm p-6 border border-zinc-700">
                <h2 className="text-xl font-semibold text-text-color mb-4">
                  Cart Summary
                </h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <p className="text-gray-600">Total Items:</p>
                    <p className="text-text-color font-semibold">
                      {totalItems}
                    </p>
                  </div>
                  <div className="flex justify-between">
                    <p className="text-gray-600">Total Cost:</p>
                    <p className="text-text-color font-semibold">
                      ${totalCost.toFixed(2)}
                    </p>
                  </div>
                </div>
                <Button
                  primary={false}
                  onClick={() => alert("Proceeding to checkout...")}
                  className="w-full mt-6 px-4 py-2 bg-primary-color text-white rounded-lg hover:bg-secondary-color transition-colors"
                >
                  Checkout
                </Button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartItem;
