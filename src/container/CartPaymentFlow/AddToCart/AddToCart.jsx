import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import closeCrossIcon from "../../../assets/closeCrossIcon.svg";
import { commonStyle } from "Styles/commonStyles";
import { Col, Row } from "react-bootstrap";
import FMTypography from "components/FMTypography/FMTypography";
import FMDropdown from "components/FMDropdown/FMDropdown";
import { quantityOpt } from "constants/AppConstant";
import FMButton from "components/FMButton/FMButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartProductsFinal,
  deleteAddToCartProducts,
} from "Redux/Slices/AddToCart/AddToCartSlice";
import { BLACK, CANCEL_GREY_BORDER, LIGHT_GREY_BORDER } from "constants/colors";
import { addToCart } from "Redux/Slices/ProductDetailPage/ProductDetailPageSlice";

const AddToCart = ({ handleNext }) => {
  const dispatch = useDispatch();

  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );

  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);

  const deleteProductOnClick = (id) => () => {
    dispatch(deleteAddToCartProducts({ productId: id }))
      .unwrap()
      .then((res) => {
        if (res) {
          dispatch(addToCartProductsFinal());
        }
      });
  };
  // let totalPrice = addedData?.reduce(function (accumulator, item) {
  //   return accumulator + item.price * item.qty;
  // }, 0);

  const optionChangeHandler = (e, pId) => {
    const quantity = e.target.value;
    const payload = {
      cartItems: [
        {
          product: pId,
          quantity: quantity,
        },
      ],
    };

    dispatch(addToCart(payload)).then((res) => {
      if (res) {
        //navigate(`/add-to-cart`);
        dispatch(addToCartProductsFinal());
      }
    });
  };

  
  return (
    <>
      <Row style={{ padding: "40px 120px" }}>
        <Col>
          <FMTypography
            displayText={`Cart Items (${addedData && Object.keys(addedData)?.length})`}
            styleData={{ fontSize: "40px", fontWeight: "500" }}
          />
        </Col>
      </Row>

      <Row style={{ padding: "10px 120px 0 120px" }}>
        <Col>
          {addedData &&
            Object.keys(addedData)?.map((elem) => (
              <Box
                sx={{
                  borderRadius: "20px",
                  boxShadow:
                    "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                  display: "flex",
                  width: "auto",
                  padding: "32px",
                  // marginTop: "20px",
                }}
              >
                <Box>
                  <img
                    src={addedData[elem]?.img}
                    alt="img"
                    style={{ width: "150px", height: "150px" }}
                  />
                </Box>
                <Box sx={{ marginLeft: "1rem", width: "100%" }}>
                  <Box
                    sx={{ display: "fllex", justifyContent: "space-between" }}
                  >
                    <FMTypography displayText={addedData[elem]?.name} />
                    <img
                      src={closeCrossIcon}
                      alt="close-icon"
                      style={{ cursor: "pointer" }}
                      onClick={deleteProductOnClick(elem)}
                    />
                  </Box>
                  {/* dropdown row below */}
                  <Row>
                    <Col style={{ marginTop: "0.3rem" }}>
                      <FMDropdown
                        name="department_id"
                        defaultValue={`${addedData && addedData[elem]?.qty}`}
                        options={quantityOpt}
                        dropdownvalue="label"
                        sx={{
                          boxShadow: `0rem 0.0625rem 0.125rem ${LIGHT_GREY_BORDER}`,
                          borderRadius: "0.5rem",
                          height: "2.75rem",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
                            },
                          },
                          width: "10rem",
                          background: "#E6E6E6",
                        }}
                        onChange={(e) => { optionChangeHandler(e, elem) }}
                      />

                    </Col>
                  </Row>
                  {/* dropdown row above */}
                  <Box sx={{ display: "flex" }}>
                    <del
                      style={{
                        fontSize: "1rem",
                        color: "#717171",
                        paddingTop: ".3rem",
                      }}
                    >
                      ₹ {addedData[elem]?.price}
                    </del>
                    <Typography
                      sx={{
                        fontSize: "18px",
                        color: "#000000",
                        marginLeft: "10px",
                        paddingTop: ".4rem",
                      }}
                    >
                      ₹ {addedData[elem]?.discountPrice}
                    </Typography>

                    <FMTypography
                      displayText={`${addedData[elem]?.offer}% OFF`}
                      styleData={{
                        color: "#008539",
                        fontSize: "12px",
                        marginLeft: "8px",
                        paddingTop: ".7rem",
                      }}
                    />
                  </Box>
                  <Typography variant="body2" sx={{ color: "#717171", textTransform: 'capitalize' }}>
                    {`${addedData[elem]?.deliveryDay}`}
                  </Typography>
                </Box>
              </Box>
            ))}
        </Col>

        {/* second col */}
        <Col style={{ marginLeft: "87px" }}>
          <Box
            sx={{
              boxShadow:
                "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
              borderRadius: "20px",
              padding: "40px",
            }}
          >
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FMTypography displayText={"Apply Coupons"} />
              <FMButton
                displayText={"Apply"}
                variant={"outlined"}
                styleData={{
                  border: " 1px solid #E6E6E6",
                  borderRadius: "10px",
                  color: "black",
                  "&:hover": {
                    border: " 1px solid #E6E6E6",
                    backgroundColor: "white",
                  },
                }}
              />
            </Box>
            <hr />
            <Box>
              <FMTypography displayText={`Price Details ${addedData && Object.keys(addedData)?.length > 0 ? Object.keys(addedData)?.length + " Items" : addedData && Object.keys(addedData)?.length === 1 ? "1 Item" : " 0 Item"}`} />
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FMTypography
                displayText={"Total MRP"}
                styleData={{ color: "#717171" }}
              />
              <FMTypography
                displayText={"₹1999"}
                styleData={{ color: "#717171" }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FMTypography
                displayText={"Discount on MRP"}
                styleData={{ color: "#717171" }}
              />
              <FMTypography
                displayText={"₹1999"}
                styleData={{ color: "#717171" }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FMTypography
                displayText={"Coupon Discount"}
                styleData={{ color: "#717171" }}
              />
              <FMTypography
                displayText={"₹1999"}
                styleData={{ color: "#717171" }}
              />
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FMTypography
                displayText={"Convenience Fee"}
                styleData={{ color: "#717171" }}
              />
              <FMTypography
                displayText={"₹1999"}
                styleData={{ color: "#717171" }}
              />
            </Box>
            <hr />
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FMTypography displayText={"Total Amount"} />
              <FMTypography displayText={"₹1999"} />
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
            //   onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Col>
      </Row>
    </>
  );
};

export default AddToCart;
