import Header from "components/SearchBar/Header";
import React from "react";
import Banner from "../components/HomePage/Banner";
import BestSeller from "../components/HomePage/BestSeller";
import CategorySlider from "../components/HomePage/CategorySlider";
import PamperZone from "../components/HomePage/PamperZone";
import ShopByOccasion from "../components/HomePage/ShopByOccasion";
import ThreePoint from "../components/HomePage/ThreePoint";
import TopCategory from "../components/HomePage/TopCategory";
import TwoBanner from "../components/HomePage/TwoBanner";

const LandingPage = () => {
  return (
    <>
      <Header />
      <div>
        <Banner />
        <CategorySlider />
        <TwoBanner />
        <BestSeller />
        <TopCategory />
        <ShopByOccasion />
        <PamperZone />
        <ThreePoint />
      </div>
    
    </>
  );
};

export default LandingPage;
