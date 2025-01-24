import React from "react";
import Carousel from "./Carousel"; // Import the Carousel component
import carousel1 from "../../../assets/images/carousel1.webp";
import carousel2 from "../../../assets/images/carousel2.jpg";
import carousel3 from "../../../assets/images/carousel3.jpg";
import carousel4 from "../../../assets/images/carousel4.avif";
import carousel5 from "../../../assets/images/carousel5.jpg";
import carousel6 from "../../../assets/images/carousel6.webp";
import HeroSwiper from "./HeroSwiper";

const slides = [
  {
    image: carousel1,
    title1: "hijabis",
    title2: "New Collection",
    text: "Don't Wait - Limited Stock at Unbeatable Prices!",
    buttonName: "Shop Now",
  },
  {
    image: carousel2,
    title1: "suits Offer!",
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
    title1: " Dresses Offer!",
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

const HeroIcon = () => {
  return (
    <div>
      <Carousel slides={slides} />
      {/* <HeroSwiper slides={slides} /> */}
    </div>
  );
};

export default HeroIcon;
