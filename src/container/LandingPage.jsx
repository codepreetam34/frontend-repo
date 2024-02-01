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
import { Box, useMediaQuery } from "@mui/material";
import Layout from "../components/Layout";
import StartupScreen from "../components/StartpScreen";
import adsBanner from "assets/LandingPage/adsBanner.png";
import adsBannerMobile from "assets/LandingPage/adsBannerMobile.png";
import { Col, Container, Row } from "react-bootstrap";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  adsContainer: {
    padding: "50px 80px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
    },
  },
  adsImage: {
    width: "100%",
    height: "130px",
    borderRadius: "20px",
    [theme.breakpoints.down("sm")]: {
      height: "auto",
    },
  },
}));
const LandingPage = () => {
  const [loading, setLoading] = useState(true);
  const classes = useStyles();
  const [landingPageModalOpen, setLandingPageModalOpen] = useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");

  useEffect(() => {
    const simulateAsyncOperation = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    };
    simulateAsyncOperation();
  }, []);

  const title = "Home Page";
  const description = "This is the home page of our MERN application.";

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Layout title={title} description={description}>
        {loading ? (
          <StartupScreen />
        ) : (
          <>
            <Header
              landingPageModalOpen={landingPageModalOpen}
              setLandingPageModalOpen={setLandingPageModalOpen}
            />

            <div>
              <Box>
                <Banner />
              </Box>
              <Box>
                <CategorySlider />
              </Box>
              <Box>
                <TwoBanner />
              </Box>
              <Box>
                <BestSeller />
              </Box>
              <Box>
                <TopCategory />
              </Box>

              <Box>
                <div className={classes.adsContainer}>
                  <Container fluid className="m-0 p-0">
                    <Row>
                      <Col md={12}>
                        <div className="">
                          <img
                            src={isMobile ? adsBannerMobile : adsBanner}
                            className={`img-fluid ${classes.adsImage}`}
                            alt=""
                          />
                        </div>
                      </Col>
                    </Row>
                  </Container>
                </div>
              </Box>

              <ShopByOccasion />
              <PamperZone />
              <ThreePoint />
            </div>
            <Footer />
          </>
        )}
      </Layout>
    </>
  );
};

export default LandingPage;
