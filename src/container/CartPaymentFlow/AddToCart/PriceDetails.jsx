import React, { useState } from "react";
import { Box, TextField } from "@mui/material";
import FMTypography from "../../../components/FMTypography/FMTypography";
import FMButton from "../../../components/FMButton/FMButton";
import { commonStyle } from "../../../Styles/commonStyles";

const PriceDetails = ({ cartList, addedData, handleNext, activeStep, steps }) => {

  const [couponCode, setCouponCode] = useState(""); // State to store entered coupon code
  const [discountMRP, setDiscountMRP] = useState(0); // State to store coupon discount value

  const applyCoupon = async () => {
    try {
      // Make an API call to fetch the coupon discount value based on the entered coupon code
      const response = await fetch(`/api/coupon?code=${couponCode}`);
      const data = await response.json();

      if (data.discount) {
        setDiscountMRP(data.discount); // Set the discount value received from the API
      } else {
        setDiscountMRP(0); // Set discount to 0 if no discount is available for the entered code
      }
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };



  const calculateTotalMRP = () => {
    let totalMRP = 0;
    for (const elem in addedData) {
      totalMRP += addedData[elem]?.discountPrice;
    }
    return totalMRP;
  };

  const calculateDiscountOnMRP = () => {
    return discountMRP; // Use the discount value from the API
  };
  const calculateConvenienceFee = () => {

    // Calculate the convenience fee based on your logic
    // You may need to fetch it from an API or calculate it in a different way
    const fee = cartList && cartList > 0 ? 40 : 0; // Example value, replace with your logic
    return fee;
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
      {/* <FMTypography displayText={"Apply Coupons"} sx={{paddingBottom:"10px"}} />
      <Box sx={{ display: "flex", justifyContent: "space-between" ,alignItems:'center'}}>

        <Box>
          <TextField
            label="Coupon Code"
            variant="outlined"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
          />
             </Box>
             <Box>
          <FMButton
            displayText="Apply"
            variant="outlined"
            styleData={{
              border: " 1px solid #E6E6E6",
              borderRadius: "10px",
              color: "black",
              "&:hover": {
                border: " 1px solid #E6E6E6",
                backgroundColor: "white",
              },
            }}
            onClick={applyCoupon}
          />
        </Box>
      </Box>

      <hr /> */}
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
            key={elem}
          >
            <FMTypography
              displayText={`${index + 1}. ${addedData[elem]?.name}`}
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
        displayText={'Continue'}

        variant={"contained"}
        styleData={{
          ...commonStyle.buttonStyles,
          width: "100%",
          marginTop: "32px",
        }}
        onClick={() => handleNext(calculateTotalAmount())}
      />
    </Box>
  );
};

export default PriceDetails;
