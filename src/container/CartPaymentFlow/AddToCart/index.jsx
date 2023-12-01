import React, { useEffect, useState } from "react";
import {
  Box, Typography,
  Card,
  CardContent,
} from "@mui/material";
import closeCrossIcon from "../../../assets/closeCrossIcon.svg";
import { Col, Row } from "react-bootstrap";
import FMTypography from "../../../components/FMTypography/FMTypography";
import FMDropdown from "../../../components/FMDropdown/FMDropdown";
import { quantityOpt } from "../../../constants/AppConstant";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartProductsFinal,
  deleteAddToCartProducts,
} from "../../../Redux/Slices/AddToCart/AddToCartSlice";
import { BLACK, CANCEL_GREY_BORDER, LIGHT_GREY_BORDER } from "../../../constants/colors";
import { addToCart } from "../../../Redux/Slices/ProductDetailPage/ProductDetailPageSlice";
import PriceDetails from "./PriceDetails";

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
      <Row style={{ padding: "1rem 8rem" }}>
        <Col>
          <FMTypography
            displayText={`Cart Items (${addedData && Object.keys(addedData)?.length > 0 ? Object.keys(addedData)?.length : "0"
              })`}
            styleData={{ fontSize: "40px", fontWeight: "500" }}
          />
        </Col>
      </Row>

      <Row style={{ padding: "10px 120px 0 120px", marginBottom: "2rem" }}>
        <Col>
          {addedData && Object.keys(addedData)?.length > 0 ?
            Object.keys(addedData)?.map((elem) => (
              <Box
                sx={{
                  borderRadius: "20px",
                  boxShadow:
                    "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                  display: "flex",
                  width: "auto",
                  padding: "32px",
                  marginBottom: "1rem",
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
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <FMTypography displayText={addedData[elem]?.name} sx={{ textTransform: 'capitalize' }} />
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
                        onChange={(e) => {
                          optionChangeHandler(e, elem);
                        }}
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
                      ₹ {addedData[elem]?.actualPrice}
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
                  <Typography
                    variant="body2"
                    sx={{ color: "#717171", textTransform: "capitalize" }}
                  >
                    {`${addedData[elem]?.deliveryDay}`}
                  </Typography>
                </Box>
              </Box>
            )) : <Box className="d-flex justify-content-center pb-4">
              <Card

                sx={{
                  width: "280px",
                  borderRadius: "20px",
                }}
              >
                <CardContent style={{ height: "4rem", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: "18px", color: "#801317" }}
                  >
                    Cart is empty!
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          }
        </Col>
        {addedData && Object.keys(addedData)?.length > 0 ? <Col style={{ marginLeft: "87px" }}>
          {/* Render the PriceDetails component and pass the addedData prop */}
          <PriceDetails cartList={addedData && Object.keys(addedData)?.length > 0 ? Object.keys(addedData)?.length : 0} addedData={addedData} handleNext={handleNext} />
        </Col> : <></>}
        {/* second col */}

      </Row>

    </>
  );
};

export default AddToCart;
