import React, { useEffect, useState } from "react";
import Pincode from "react-pincode";
import Header from "components/SearchBar/Header";
import Banner from "../components/HomePage/Banner";
import CategorySlider from "../components/HomePage/CategorySlider";
import TwoBanner from "../components/HomePage/TwoBanner";
import BestSeller from "../components/HomePage/BestSeller";
import TopCategory from "../components/HomePage/TopCategory";
import ShopByOccasion from "../components/HomePage/ShopByOccasion";
import PamperZone from "../components/HomePage/PamperZone";
import ThreePoint from "../components/HomePage/ThreePoint";
import Footer from "components/Footer/Footer";
import { Box, Modal, Button, Typography } from "@mui/material";
import Layout from "components/Layout";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";



const LandingPage = () => {
  const [pincodeModalOpen, setPincodeModalOpen] = useState(true);
  const [showArea, setShowArea] = useState(false);
  const [pincodeData, setPincodeData] = useState("");
  const title = 'Home Page';
  const description = 'This is the home page of our MERN application.';

  const handleModalClose = () => {
    setPincodeModalOpen(false);
    sessionStorage.setItem("pincode", pincodeData);
  };

  const getDataFunc = (data) => {

    if (data?.pincode.length === 6 && data?.pincode.length > 0) {
      setPincodeData(data?.pincode);
      setShowArea(true);
    } else {
      setPincodeData(null);
      setShowArea(false);
    }
  };

  useEffect(() => {
    const storedPincode = sessionStorage.getItem("pincode");
    if (storedPincode) {
      setPincodeData(storedPincode);
      setPincodeModalOpen(false);
    }
  }, []);
  return (
    <>

      <Layout title={title} description={description}>
        <Header pincodeData={pincodeData} />
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
          <ShopByOccasion />
          <PamperZone />
          <ThreePoint />
        </div>
        <Footer />




        <Modal open={pincodeModalOpen}>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "30rem",
              bgcolor: "white",
              borderRadius: 4,
            }}
          >
            {/* Header */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "1rem",
                borderBottom: "1px solid #ccc",
              }}
            >
              <Typography variant="h6">Select Delivery Location</Typography>
              <IconButton onClick={handleModalClose}>
                <CloseIcon />
              </IconButton>
            </Box>

            {/* Content */}
            <Box sx={{ padding: "2rem" }}>
              <Pincode
                showCity={false}
                showDistrict={false}
                showState={false}
                invalidError="Please check pincode"
                getData={getDataFunc}
                showArea={showArea}
                pincodeInput={{
                  borderRadius: "10px",
                  width: "100%",
                  border: "1px solid grey",
                  height: "55px",
                  padding: "2rem 1rem",
                  marginRight: "1.7rem",
                }}
                areaInput={{
                  backgroundColor: "white",
                  border: "none",
                  color: "red",
                  fontSize: "12px",
                }}
              />
            </Box>

            {/* Footer */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                padding: "1rem",
                borderTop: "1px solid #ccc",
              }}
            >
              <Button
                variant="contained"
                color="primary"
                disabled={!pincodeData}
                onClick={handleModalClose}
              >
                Continue Shopping
              </Button>
            </Box>
          </Box>
        </Modal>



      </Layout>
    </>
  );
};

export default LandingPage;
