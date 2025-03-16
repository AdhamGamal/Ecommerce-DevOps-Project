import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Autoplay, Pagination } from "swiper/modules";
import "./HeroSwiper.css";

// Import images
import carousel1 from "../../../assets/images/carousel1.webp";
import carousel2 from "../../../assets/images/carousel2.jpg";
import carousel3 from "../../../assets/images/carousel3.jpg";
import carousel4 from "../../../assets/images/carousel4.avif";
import carousel5 from "../../../assets/images/carousel5.jpg";
import carousel6 from "../../../assets/images/carousel6.webp";

// Import Slide component
import Slide from "./Slide";

const slides = [
  {
    image: carousel1,
    title1: "Hijabis",
    title2: "New Collection",
    text: "Don't Wait - Limited Stock at Unbeatable Prices!",
    buttonName: "Shop Now",
  },
  {
    image: carousel2,
    title1: "Suits Offer!",
    title2: "Up to 50% OFF!",
    text: "Don't Wait - Limited Stock at Unbeatable Prices!",
    buttonName: "Shop Now",
  },
  {
    image: carousel3,
    title1: "Kids Offer!",
    title2: "Up to 50% OFF!",
    text: "Don't Wait - Limited Stock at Unbeatable Prices!",
    buttonName: "Shop Now",
  },
  {
    image: carousel4,
    title1: "Dresses Offer!",
    title2: "Up to 10% OFF!",
    text: "Don't Wait - Limited Stock at Unbeatable Prices!",
    buttonName: "Shop Now",
  },
  {
    image: carousel5,
    title1: "Women Clothes Offer!",
    title2: "Up to 20% OFF!",
    text: "Don't Wait - Limited Stock at Unbeatable Prices!",
    buttonName: "Shop Now",
  },
  {
    image: carousel6,
    title1: "Women Clothes Offer!",
    title2: "Up to 20% OFF!",
    text: "Don't Wait - Limited Stock at Unbeatable Prices!",
    buttonName: "Shop Now",
  },
];

const HeroSwiper = () => {
  return (
    <div className="relative z-40">
      <Swiper
        modules={[Navigation, Autoplay, Pagination]} // Add Pagination module
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        pagination={{ clickable: true }} // Enable default pagination
        autoplay={{ delay: 3000 }}
        loop
        spaceBetween={0}
        slidesPerView={1}
        className="w-full h-[90vh] overflow-hidden rounded-lg"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Slide
              image={slide.image}
              title1={slide.title1}
              title2={slide.title2}
              text={slide.text}
              buttonName={slide.buttonName}
            />
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Custom Navigation Buttons */}
      {/* Custom Navigation Buttons */}
      <div className="flex">
        <div
          className="swiper-button-prev border-2 p-4 border-[#5b5b5b] hover:-translate-x-1 hover:scale-105 shadow-lg"
          style={{
            backgroundColor: "#656565", // Gold color for button background
            opacity: "50%",
            borderRadius: "50%", // Make the button circular
            width: "50px", // Reduced width of the button
            height: "50px", // Reduced height of the button
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer", // Make it clickable
            color: "#D4AF37",
          }}
        >
          {" "}
          <svg
            className="w-3 h-3 rtl:rotate-180 shadow-lg"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 1 1 5l4 4"
            />
          </svg>
        </div>

        <div
          className="swiper-button-next border-2 p-4 border-[#5b5b5b] hover:translate-x-1 hover:scale-105 shadow-lg "
          style={{
            backgroundColor: "#656565", // Gold color for button background
            opacity: "50%",

            borderRadius: "50%", // Make the button circular
            width: "50px", // Reduced width of the button
            height: "50px", // Reduced height of the button
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer", // Make it clickable
            color: "#D4AF37",
          }}
        >
          {" "}
          <svg
            className="w-3 h-3 rtl:rotate-180 shadow-lg"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 6 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m1 9 4-4-4-4"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default HeroSwiper;
