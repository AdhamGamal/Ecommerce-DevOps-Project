import React from "react";
import SocialMedia from "../UI/SocialMedia";
import { mailIcon, Phone } from "../../utils/Icons";
import WebLogo from "../UI/WebLogo";

const Footer = () => {
  return (
    <footer className="bg-back-color text-text-color border-t-2 border-zinc-900 ">
      {/* 2nd Section: Footer Content */}
      <div className="pt-12 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* About Section */}
            <div>
              <WebLogo />
              <p className="text-sm text-gray-300 leading-relaxed">
                Elegance is your go-to destination for the latest trends in
                fashion. We offer high-quality clothing and accessories to
                elevate your style.
              </p>
            </div>

            {/* Quick Links Section */}
            <div className="flex ">
              <div>
                <h3 className="text-xl font-bold mb-6 text-secondary-color text-left">
                  Quick Links
                </h3>
                <div className="flex gap-14 ">
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/"
                        className="text-sm text-gray-300 hover:text-secondary-color transition-colors duration-300"
                      >
                        Home
                      </a>
                    </li>
                    <li>
                      <a
                        href="/about"
                        className="text-sm text-gray-300 hover:text-secondary-color transition-colors duration-300"
                      >
                        About
                      </a>
                    </li>
                    <li>
                      <a
                        href="/services"
                        className="text-sm text-gray-300 hover:text-secondary-color transition-colors duration-300"
                      >
                        Store
                      </a>
                    </li>
                    <li>
                      <a
                        href="/contact"
                        className="text-sm text-gray-300 hover:text-secondary-color transition-colors duration-300"
                      >
                        Contact
                      </a>
                    </li>
                  </ul>
                  <ul className="space-y-3">
                    <li>
                      <a
                        href="/privacy-policy"
                        className="text-sm text-gray-300 hover:text-secondary-color transition-colors duration-300"
                      >
                        Privacy Policy
                      </a>
                    </li>
                    <li>
                      <a
                        href="/terms-of-service"
                        className="text-sm text-gray-300 hover:text-secondary-color transition-colors duration-300"
                      >
                        Terms of Service
                      </a>
                    </li>
                    <li>
                      <a
                        href="/faq"
                        className="text-sm text-gray-300 hover:text-secondary-color transition-colors duration-300"
                      >
                        FAQ
                      </a>
                    </li>
                    <li>
                      <a
                        href="/shipping"
                        className="text-sm text-gray-300 hover:text-secondary-color transition-colors duration-300"
                      >
                        Shipping Info
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div>
              <h3 className="text-xl font-bold mb-6 text-secondary-color">
                Customer Serveice
              </h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  {Phone}
                  <p className="text-sm text-gray-300"> (123) 456-7890</p>
                </div>
                <div className="flex items-center space-x-3">
                  {mailIcon}
                  <p className="text-sm text-gray-300">
                    support@fashionelegance.com
                  </p>
                </div>
              </div>
            </div>
          </div>
          {/* 1st Section: Social Media */}
        </div>
        <div className="bg-light-color py-2 my-2">
          <div className="container mx-auto px-4">
            <SocialMedia />
          </div>
        </div>
        {/* Copyright Section */}
        <div className="text-center  pt-8 border-t border-gray-700">
          <p className="text-sm text-gray-400">
            All rights reserved, Elegance &copy; {new Date().getFullYear()} .
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
