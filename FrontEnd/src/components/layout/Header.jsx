import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { FaBars } from "react-icons/fa";
import { Cart, WishList } from "../../utils/Icons";
import WebLogo from "../UI/WebLogo";
import { useNavigate } from "react-router-dom";
import useAuthenticate from "../../utils/useAuthenticate";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/authSlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const { isAuthenticated } = useAuthenticate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

  const dropdownRef = useRef(null); // Ref for the dropdown

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleUserMenuSelect = (option) => {
    setIsDropdownOpen(false); // Close dropdown after selection
    if (option === "logout") {
      dispatch(logout());
      navigate("/login");
    } else {
      navigate(`/${option}`);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    // Attach the event listener
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="text-text-color shadow-lg bg-back-color">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center p-4">
        {/* Logo and Mobile Menu Toggle */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <WebLogo />

          {/* Hamburger Menu for Mobile */}
          <button
            className="lg:hidden p-2 focus:outline-none"
            onClick={toggleMenu}
          >
            <FaBars className="w-6 h-6 text-secondary-color" />
          </button>
        </div>

        {/* Navigation Links */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:flex md:items-center w-full md:w-auto mt-4 md:mt-0 border-t border-gray-200 md:border-none`}
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

        {/* Wishlist, Cart, Login/Register, and User Avatar */}
        <div className="flex items-center space-x-4 md:space-x-6 mt-4 md:mt-0">
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

          {/* Login & Register Buttons */}
          {!isAuthenticated && (
            <div className="hidden md:flex items-center space-x-4">
              <Link
                to="/login"
                className="px-4 py-2 border border-secondary-color text-secondary-color rounded hover:bg-secondary-color hover:text-white transition"
              >
                Login
              </Link>
              <Link
                to="/sign-up"
                className="px-4 py-2 bg-secondary-color text-white rounded hover:opacity-90 transition"
              >
                Register
              </Link>
            </div>
          )}

          {/* User Avatar */}
          {isAuthenticated && (
            <div className="relative" ref={dropdownRef}>
              <img
                className="w-10 h-10 rounded-full cursor-pointer border-2 border-zinc-500 p-2 hover:scale-105"
                src={
                  user?.profile_pic ||
                  "https://static.vecteezy.com/system/resources/previews/011/947/163/non_2x/gold-user-icon-free-png.png"
                }
                alt="user"
                onClick={toggleDropdown}
              />
              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-lg shadow-lg z-50">
                  <ul className="py-2">
                    <li
                      onClick={() => handleUserMenuSelect("profile")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-secondary-color  text-zinc-800"
                    >
                      Profile
                    </li>
                    <li
                      onClick={() => handleUserMenuSelect("settings")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-secondary-color  text-zinc-800"
                    >
                      Settings
                    </li>
                    <li
                      onClick={() => handleUserMenuSelect("orders")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-secondary-color  text-zinc-800 "
                    >
                      Orders
                    </li>
                    <li
                      onClick={() => handleUserMenuSelect("logout")}
                      className="px-4 py-2 cursor-pointer hover:bg-gray-100 hover:text-secondary-color  text-zinc-800 border-t-2"
                    >
                      Sign out
                    </li>
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Login/Register */}
        {!isAuthenticated && (
          <div className="flex md:hidden flex-col w-full items-center space-y-2 mt-4">
            <Link
              to="/login"
              className="w-full text-center px-4 py-2 border border-secondary-color text-secondary-color rounded hover:bg-secondary-color hover:text-white transition"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="w-full text-center px-4 py-2 bg-secondary-color text-white rounded hover:opacity-90 transition"
            >
              Register
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
