import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { FaHeart, FaShoppingCart } from "react-icons/fa"; // Icons for wishlist and cart
import { Cart, WishList } from "../../utils/Icons";
import WebLogo from "../UI/WebLogo";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false); // For mobile menu

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // Initialize Flowbite
  useEffect(() => {
    import("flowbite");
  }, []);

  return (
    <header className="text-text-color shadow-lg bg-back-color">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        {/* Logo and Hamburger Menu */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <WebLogo />

          {/* Hamburger Menu for Mobile */}
          <button
            className="md:hidden p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            <svg
              className="w-6 h-6 text-secondary-color"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } md:flex md:items-center w-full md:w-auto mt-4 md:mt-0 border-t border-gray-200 md:border-none`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-6 mt-4 md:mt-0">
            <li>
              <Link
                to="/"
                className="block py-2 hover:text-secondary-color rounded px-4"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className="block py-2 hover:text-secondary-color rounded px-4"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                to="/store"
                className="block py-2 hover:text-secondary-color rounded px-4"
              >
                Store
              </Link>
            </li>
            <li>
              <Link
                to="/contact-us"
                className="block py-2 hover:text-secondary-color rounded px-4"
              >
                Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Wishlist, Cart, and User Avatar */}
        <div className="flex items-center space-x-6 mt-4 md:mt-0">
          {/* Wishlist Icon */}
          <Link to="/wishlist" className="relative hover:scale-105">
            {WishList}
            <span className="absolute -top-2 -right-2 bg-dark-secondary-color text-white text-xs rounded-full px-1">
              3
            </span>
          </Link>

          {/* Cart Icon */}
          <Link to="/cart" className="relative hover:scale-105">
            {Cart}
            <span className="absolute -top-2 -right-2 bg-dark-secondary-color text-white text-xs rounded-full px-1">
              5
            </span>
          </Link>

          {/* User Avatar Dropdown (Flowbite) */}
          <div className="relative z-50">
            {/* Dropdown Button */}
            <button
              id="dropdownUserAvatarButton"
              data-dropdown-toggle="dropdownAvatar"
              className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300"
              type="button"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
                alt="user photo"
              />
            </button>

            {/* Dropdown Menu */}
            <div
              id="dropdownAvatar"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
            >
              <div className="px-4 py-3 text-sm text-gray-900">
                <div>Heba</div>
                <div className="font-medium truncate">hebs@gmail.com</div>
              </div>
              <ul
                className="py-2 text-sm text-gray-700"
                aria-labelledby="dropdownUserAvatarButton"
              >
                <li>
                  <Link
                    to="/profile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Settings
                  </Link>
                </li>
                <li>
                  <Link
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </Link>
                </li>
              </ul>
              <div className="py-2">
                <button
                  onClick={() => {
                    // Handle logout logic here
                    console.log("Logged out");
                  }}
                  className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left"
                >
                  Sign out
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
