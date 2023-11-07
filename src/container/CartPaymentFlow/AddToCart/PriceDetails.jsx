// PriceDetails.js

import React from "react";
import { Box } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import FMButton from "components/FMButton/FMButton";
import { commonStyle } from "Styles/commonStyles";

const PriceDetails = ({ addedData, handleNext }) => {
  const calculateTotalMRP = () => {
    let totalMRP = 0;
    for (const elem in addedData) {
      totalMRP += addedData[elem]?.actualPrice;
    }
    return totalMRP;
  };

  const calculateDiscountOnMRP = () => {
    let discountOnMRP = 0;
    for (const elem in addedData) {
      discountOnMRP +=
        addedData[elem]?.actualPrice - addedData[elem]?.discountPrice;
    }
    return discountOnMRP;
  };

  const calculateConvenienceFee = () => {
    // Calculate the convenience fee based on your logic
    // You may need to fetch it from an API or calculate it in a different way
    return 40; // Example value, replace with your logic
  };

  const calculateTotalAmount = () => {
    const totalMRP = calculateTotalMRP();
    const discountOnMRP = calculateDiscountOnMRP();
    const convenienceFee = calculateConvenienceFee();

    return totalMRP - discountOnMRP + convenienceFee;
  };

  return (
    <Box
      sx={{
        boxShadow:
          "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
        borderRadius: "20px",
        padding: "40px",
      }}
    >
      <hr />
      <Box>
        <FMTypography
          displayText={`Price Details ${addedData && Object.keys(addedData)?.length > 0
            ? Object.keys(addedData).length + " Items"
            : addedData && Object.keys(addedData)?.length === 1
              ? "1 Item"
              : " 0 Item"
            }`}
        />
      </Box>



      {addedData &&
        Object.keys(addedData)?.map((elem, index) => (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <FMTypography
              displayText={`${index + 1} ${addedData[elem]?.name}`}
              styleData={{ color: "#717171" }}
            />
            <FMTypography
              displayText={`₹${addedData[elem]?.discountPrice}`}
              styleData={{ color: "#717171" }}
            />
          </Box>
        ))}
      <hr />
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <FMTypography
          displayText={`Total MRP`}
          styleData={{ color: "#717171" }}
        />
        <FMTypography
          displayText={`₹${calculateTotalMRP()}`}
          styleData={{ color: "#717171" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography
          styleData={{ color: "#717171" }}
          displayText={`Discount on MRP`}
        />
        <FMTypography
          displayText={`₹${calculateDiscountOnMRP()}`}
          styleData={{ color: "#717171" }}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography displayText={`Convenience Fee`} />
        <FMTypography
          displayText={`₹${calculateConvenienceFee()}`}
          styleData={{ color: "#717171" }}
        />
      </Box>
      <hr />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography displayText={`Total Amount`} />
        <FMTypography displayText={`₹${calculateTotalAmount()}`} />
      </Box>
      <FMButton
        displayText={"Place Order"}
        variant={"contained"}
        styleData={{
          ...commonStyle.buttonStyles,
          width: "100%",
          marginTop: "32px",
        }}
        onClick={handleNext}
      // onClick={handleSubmit(onSubmit)}
      />
    </Box>
  );
};

export default PriceDetails;
