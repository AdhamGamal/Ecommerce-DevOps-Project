import React from "react";
import ExploreOurCategories from "../components/home/ExploreOurCategories";
import NewArrivals from "../components/home/NewArrivals";
import OffersAndSpecialBrands from "../components/home/OffersAndSpecialBrands";
import HeroIcon from "../components/home/heroIcon/HeroIcon";
import HeroSwiper from "../components/home/heroIcon/HeroSwiper";

const Home = () => {
  return (
    <>
      {/* <HeroIcon /> */}
      <HeroSwiper />
      <OffersAndSpecialBrands />
      <ExploreOurCategories />
      <NewArrivals />
    </>
  );
};

export default Home;
