import React, { useEffect, useState } from "react";
import Pincode from "react-pincode";
import Header from "../components/SearchBar/Header";
import Banner from "../components/HomePage/Banner";
import CategorySlider from "../components/HomePage/CategorySlider";
import TwoBanner from "../components/HomePage/TwoBanner";
import BestSeller from "../components/HomePage/BestSeller";
import TopCategory from "../components/HomePage/TopCategory";
import ShopByOccasion from "../components/HomePage/ShopByOccasion";
import PamperZone from "../components/HomePage/PamperZone";
import ThreePoint from "../components/HomePage/ThreePoint";
import Footer from "../components/Footer/Footer";
import { Box } from "@mui/material";
import Layout from "../components/Layout";
import adsBanner from "../assets/adsBanner.png";

const LandingPage = () => {

  const [pincodeModalOpen, setPincodeModalOpen] = useState(true);
  const [showArea, setShowArea] = useState(false);
  const [pincodeData, setPincodeData] = useState("");
 
  const title = 'Home Page';
  const description = 'This is the home page of our MERN application.';

  const getDataFunc = (data) => {

    if (data?.pincode.length === 6 && data?.pincode.length > 0) {

      setPincodeData(data?.pincode);
      setShowArea(true);

    } else {

      setPincodeData(null);
      setShowArea(false);

    }

  };

  return (

<>

      <Layout title={title} description={description}>
        <Header />
  
        <div>
          <Box>
            <Banner />
          </Box>
          <Box>
            <CategorySlider />
          </Box>
          <TwoBanner />
          <Box>
            <BestSeller />
          </Box>
          <Box>
            <TopCategory />
          </Box>
          <Box sx={{ width: '100%', height: 'auto', padding: "0 100px" }}>
            <img src={adsBanner} alt="" style={{width: '100%',}}/>
          </Box>
          <ShopByOccasion />
          <PamperZone />
          <ThreePoint />
        </div>

        <Footer />
      </Layout>

    </>

);

};

export default LandingPage;
