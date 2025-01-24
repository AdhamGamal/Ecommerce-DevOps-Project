import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation } from "swiper/modules";
import category1 from "../../assets/images/category1.webp";
import category2 from "../../assets/images/category2.jpg";
import category3 from "../../assets/images/category3.avif";
import category4 from "../../assets/images/category4.avif";
import category5 from "../../assets/images/category5.png";
import category6 from "../../assets/images/category6.webp";
import category7 from "../../assets/images/category7.jpg";
const ExploreOurCategories = () => {
  const categories = [
    {
      name: "Fashion Women",
      image: category1,
      description: " Explore the latest trends",
    },
    {
      name: "Fashion Men",
      image: category2,
      description: " Explore the latest trends",
    },
    {
      name: "Fashion Kids",
      image: category3,
      description: " Explore the latest trends",
    },
    {
      name: "Health & Beauty",
      image: category4,
      description: " Explore the latest trends",
    },
    {
      name: "Baby Products",
      image: category5,
      description: " Explore the latest trends",
    },
    {
      name: "Accessories",
      image: category6,
      description: " Explore the latest trends",
    },
    {
      name: "Gym",
      image: category7,
      description: " Explore the latest trends",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-8 text-secondary-color">
        Explore Our Categories
      </h2>
      <Swiper
        modules={[Navigation]}
        navigation={{
          prevEl: ".swiper-button-prev",
          nextEl: ".swiper-button-next",
        }}
        spaceBetween={20}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
        }}
        autoplay
      >
        {categories.map((category, index) => (
          <SwiperSlide key={index}>
            <div className="mx-auto max-w-sm bg-white border border-gray-200 rounded-lg shadow-lg transition transform hover:scale-105 dark:bg-gray-800 dark:border-gray-700">
              <a
              //   href="#"
              >
                <img
                  className="rounded-t-lg w-full h-56 object-contain"
                  src={category.image}
                  alt={category.name}
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {category.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  {category.description}.
                </p>
                <a
                  href={`/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-white bg-gradient-to-r from-primary-color to-secondary-color rounded-lg hover:from-secondary-color hover:to-primary-color focus:ring-4 focus:outline-none focus:ring-blue-300"
                >
                  Explore Now
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </SwiperSlide>
        ))}
        {/* Custom Arrows */}
        <div
          className="swiper-button-prev border-2 p-2 opacity-95 hover:-translate-x-1 hover:scale-105 shadow-lg"
          style={{
            backgroundColor: "#D4AF37", // Gold color for button background

            color: "#ffffff",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
          className="swiper-button-next border-2 p-2  hover:translate-x-1 hover:scale-105 shadow-lg"
          style={{
            backgroundColor: "#D4AF37", // Gold color for button background

            color: "#ffffff",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
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
      </Swiper>
    </div>
  );
};

export default ExploreOurCategories;
