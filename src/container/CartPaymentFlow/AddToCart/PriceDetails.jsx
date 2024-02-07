import React, { useEffect, useState } from "react";
import { Box, TextField, useMediaQuery } from "@mui/material";
import FMTypography from "../../../components/FMTypography/FMTypography";
import FMButton from "../../../components/FMButton/FMButton";
import { commonStyle } from "../../../Styles/commonStyles";
import axios from "axios";
import IconButton from "@mui/material/IconButton";
import ClearIcon from "@mui/icons-material/Clear";
import { useDispatch, useSelector } from "react-redux";
import { applyCoupon } from "../../../Redux/Slices/ProductDetailPage/ProductDetailPageSlice";

const PriceDetails = ({
  cartList,
  addedData,
  handleNext,
  activeStep,
  steps,
}) => {
  const dispatch = useDispatch();
  const [couponCode, setCouponCode] = useState("");
  const [discountCoupon, setDiscountCoupon] = useState(0);
  const [discountMessage, setDiscountMessage] = useState("");
  const isMobile = useMediaQuery("(max-width:600px)");
  const [discountCouponResponseMessage, setDiscountCouponResponseMessage] =
    useState("");
  const auth = localStorage.getItem("AUTH_ACCESS_TOKEN");
  const result = auth?.substring(1, auth.length - 1);

  const handleApplyCoupon = async () => {
    await dispatch(applyCoupon(couponCode)).then((res) => {
      if (res.payload) {
        setDiscountCouponResponseMessage(res?.payload?.message);
      }
    });
  };

  const discountCouponResponse = useSelector(
    (state) => state?.getProductsDetail?.getCouponDiscount?.discount
  );

  const CouponCodeResponse = useSelector(
    (state) => state?.getProductsDetail?.getCouponDiscount?.couponCode
  );

  useEffect(() => {
    setCouponCode(CouponCodeResponse);
  }, [CouponCodeResponse]);

  useEffect(() => {
    setDiscountCoupon(discountCouponResponse);
  }, [discountCouponResponse]);

  const calculateTotalMRP = () => {
    let totalMRP = 0;
    for (const elem in addedData) {
      totalMRP += addedData[elem]?.actualPrice * addedData[elem]?.qty;
    }
    return totalMRP;
  };

  const calculateDiscountOnCoupon = () => {
    return discountCoupon ? discountCoupon : 0; 
  };

  const calculateConvenienceFee = () => {
    const fee = cartList && cartList > 0 ? 40 : 0; 
    return fee;
  };

  const calculateTotalAmount = () => {
    const totalMRP = calculateTotalMRP();
    const discountOnCoupon = calculateDiscountOnCoupon();
    const convenienceFee = calculateConvenienceFee();
    return (
      totalMRP -
      (discountOnCoupon ? discountOnCoupon : 0) -
      resultDiscount +
      convenienceFee
    );
  };

  const clearCouponCode = () => {
    setCouponCode("");
    setDiscountCoupon("");
  };

  let resultDiscount = 0;

  addedData &&
    Object.keys(addedData)?.map(
      (elem, index) =>
      (resultDiscount +=
        addedData[elem]?.actualPrice * addedData[elem]?.qty -
        addedData[elem]?.discountPrice * addedData[elem]?.qty)
    );

  useEffect(() => {
    setDiscountMessage(
      `Saved ₹${(resultDiscount + calculateDiscountOnCoupon()).toFixed(
        2
      )} on this order Happy Shipping!`
    );
  }, [resultDiscount, calculateDiscountOnCoupon()]);

  return (
    <Box
      sx={{
        boxShadow:
          "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
        borderRadius: "20px",
        padding: isMobile ? "20px" : "40px",
      }}
    >
      <FMTypography
        displayText={"Apply Coupons"}
        styleData={{ paddingBottom: "10px", fontWeight: "600" }}
      />

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <Box>
          <TextField
            label="Coupon Code"
            variant="outlined"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            InputProps={{
              endAdornment: (
                <IconButton onClick={clearCouponCode} edge="end">
                  <ClearIcon />
                </IconButton>
              ),
            }}
          />
        </Box>
        <Box>
          <FMButton
            displayText="Apply"
            variant="outlined"
            styleData={{
              borderRadius: "10px",
              color: "black",
            }}
            onClick={handleApplyCoupon}
          />
        </Box>
      </Box>
      <Box>
        {discountCouponResponse && (
          <FMTypography
            styleData={commonStyle.couponText}
            displayText={`Congratulation! you have saved extra ₹${discountCouponResponse} `}
          />
        )}
      </Box>
      <hr />
      <Box>
        <FMTypography
          displayText={`Price Details ${addedData && Object.keys(addedData)?.length > 0
            ? Object.keys(addedData).length + " Items"
            : addedData && Object.keys(addedData)?.length === 1
              ? "1 Item"
              : " 0 Item"
            }`}
          styleData={{ fontWeight: "600" }}
        />
      </Box>
      <hr />
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
              displayText={`${index + 1}. ${addedData[elem]?.name.slice(0, 10) +
                (addedData[elem]?.name.length > 10 ? "..." : "")
                }`}
              styleData={{ color: "#717171" }}
            />
            <FMTypography
              displayText={`₹${addedData[elem]?.actualPrice}`}
              styleData={{ color: "#717171" }}
            />
            <FMTypography
              displayText={`x ${addedData[elem]?.qty}`}
              styleData={{ color: "#717171" }}
            />
            <FMTypography
              displayText={`= ₹${(
                addedData[elem]?.actualPrice * addedData[elem]?.qty
              ).toFixed(2)}`}
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
      <hr />
      <Box>
        <FMTypography
          styleData={{ color: "#000", fontWeight: '600' }}
          displayText={`Discount on MRP`}

        />
        <hr />
        {addedData &&
          Object.keys(addedData)?.map((elem, index) => (
            <Box
              key={index}
              sx={{ display: "flex", justifyContent: "space-between" }}
            >
              <FMTypography
                styleData={{ color: "#717171" }}
                displayText={`${addedData[elem]?.name.slice(0, 10) +
                  (addedData[elem]?.name.length > 10 ? "..." : "")
                  }`}
              />
              <FMTypography
                displayText={`${(
                  addedData[elem]?.actualPrice - addedData[elem]?.discountPrice
                ).toFixed(2)}`}
                styleData={{ color: "#717171" }}
              />
              <FMTypography
                displayText={`x ${addedData[elem]?.qty}`}
                styleData={{ color: "#717171" }}
              />
              <FMTypography
                displayText={`₹${(
                  addedData[elem]?.actualPrice * addedData[elem]?.qty -
                  addedData[elem]?.discountPrice * addedData[elem]?.qty
                ).toFixed(2)}`}
                styleData={{ color: "#717171" }}
              />
            </Box>
          ))}
        <hr />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography
          styleData={{ color: "#717171" }}
          displayText={`Total Discount on MRP`}
        />
        <FMTypography
          styleData={{ color: "#717171" }}
          displayText={resultDiscount ? `- ₹${resultDiscount.toFixed(2)}` : "0"}
        />
      </Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography
          styleData={{ color: "#717171" }}
          displayText={`Discount on Coupon`}
        />
        <FMTypography
          displayText={
            discountCoupon ? `- ₹${calculateDiscountOnCoupon()}` : "0"
          }
          styleData={{ color: "#717171" }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography
          displayText={`Convenience Fee`}
          styleData={{ color: "#717171" }}
        />
        <FMTypography
          displayText={`+ ₹${calculateConvenienceFee()}`}
          styleData={{ color: "#717171" }}
        />
      </Box>
      <hr />
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <FMTypography displayText={`Total Amount`} styleData={{ fontWeight: "600" }} />
        <FMTypography styleData={{ fontWeight: "600" }} displayText={`₹${calculateTotalAmount()}`} />
      </Box>
      <hr />
      <Box>
        {discountMessage && (
          <FMTypography
            styleData={commonStyle.couponText}
            displayText={discountMessage}
          />
        )}
      </Box>
      <FMButton
        displayText={"Continue"}
        variant={"contained"}
        styleData={{
          ...commonStyle.buttonStyles,
          width: "100%",
          marginTop: "32px",
        }}
        onClick={() => handleNext(calculateTotalAmount(), discountCoupon)}
      />
    </Box>
  );
};

export default PriceDetails;
