import React, { useEffect, useState } from "react";
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
import adsBanner from "assets/adsBanner.png";

import StartupScreen from "../components/StartpScreen";

const LandingPage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) that takes some time
    const simulateAsyncOperation = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the duration as needed
    };

    simulateAsyncOperation();
  }, []);
  const title = 'Home Page';
  const description = 'This is the home page of our MERN application.';

  return (

    <>

      <Layout title={title} description={description}>
        {loading ? (
          <StartupScreen />
        ) : (
          <>
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
              <Box sx={{ width: '100%', height: 'auto', padding: "0 100px", marginTop: "50px", }}>
                <img className="img-fluid" src={adsBanner} alt="adsBanner" />
              </Box>
              <ShopByOccasion />
              <PamperZone />
              <ThreePoint />
            </div>

            <Footer />
          </>)}
      </Layout>

    </>

  );

};

export default LandingPage;
