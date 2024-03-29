import React, { useEffect, useState } from "react";
import {
  Box, Typography,
  Card,
  CardContent,
  useMediaQuery,
} from "@mui/material";
import closeCrossIcon from "../../../assets/closeCrossIcon.svg";
import { Col, Container, Row } from "react-bootstrap";
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
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme) => ({
  boxContainer: {
    borderRadius: "20px",
    boxShadow:
      "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
    display: "flex",
    width: "auto",
    padding: "32px",
    background: "#fff",
    marginBottom: "1rem",
    [theme.breakpoints.down('sm')]: {
      padding: "1rem", // Change padding to 1rem for screens smaller than 'sm'
    },
  },
  boxContainer2: {
    borderRadius: "20px",
    // boxShadow:
    //   "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
    display: "flex",
    width: "auto",
    padding: "2rem 1rem",
    [theme.breakpoints.down('sm')]: {
      padding: "1rem", // Change padding to 1rem for screens smaller than 'sm'
    },
  },
  columnContainer: {
    padding: "10px 50px",
    [theme.breakpoints.down('sm')]: {
      padding: "10px 20px"
    }
  },
}));
const AddToCart = ({ handleNext }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width:600px)");

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
          vendorName:value,
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

      <Row className="m-0" style={{
        padding: "0rem ",
        ...(window.innerWidth <= 600 && {
          padding: "0"
        })
      }}>

        <Col style={{ padding: "0 3rem" }}>
          {/* <FMTypography
            displayText={`Cart Items (${addedData && Object.keys(addedData)?.length > 0 ? Object.keys(addedData)?.length : "0"
              })`}
            styleData={{ fontSize: isMobile ? "2rem" : "40px", fontWeight: "500", textAlign: "center" }}
          /> */}


          <Box style={{
            display: 'flex', justifyContent: "space-between",
            alignItems: 'center', background: "#fff", marginTop: "10px",
            marginBottom: isMobile ? "10px" : "1rem", borderRadius: "4px",
            boxShadow: "0px 3px 6px 0 rgb(212 212 212 / 35%)",
          }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                padding: "0 1rem",
              }}
            >
              <FMTypography
                displayText={`Your Cart
                `}
                styleData={{
                  fontWeight: "600",
                  fontSize: isMobile ? "14px" : "1.5rem",
                  textTransform: "capitalize",
                }}
              />
              <Box className={classes.boxContainer2}>
                <FMTypography
                  displayText={`| ${addedData && Object.keys(addedData)?.length > 0 ? Object.keys(addedData)?.length : "0"
                    } Items`}
                  styleData={{
                    fontWeight: "300",
                    fontSize: isMobile ? "14px" : "1.5rem",
                    lineHeight: "30px",
                    color: "#717171",
                  }}
                />
              </Box>

            </Box>


          </Box>
        </Col>
      </Row >

      <Row className="m-0 p-0" style={{
        marginBottom: "2rem",
      }}>
        <Col className={classes.columnContainer
        }>
          {addedData && Object.keys(addedData)?.length > 0 ?
            Object.keys(addedData)?.map((elem, index) => (
              <Box
                key={index}
                className={classes.boxContainer}
              >
                <Box style={{ display: "flex", alignItems: "center" }}>
                  <img
                    src={addedData[elem]?.img}
                    alt="img"
                    style={{ width: isMobile ? "110px" : "150px", height: isMobile ? "110px" : "150px", borderRadius: "10px" }}
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
                        value={`${addedData && addedData[elem]?.qty}`}
                        options={quantityOpt}
                        dropdownvalue="label"
                        sx={{
                          boxShadow: `0rem 0.0625rem 0.125rem ${LIGHT_GREY_BORDER}`,
                          borderRadius: "0.5rem",
                          height: isMobile ? "1.5rem" : "2.75rem",
                          "& .MuiOutlinedInput-notchedOutline": {
                            border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
                          },
                          "&.Mui-focused": {
                            "& .MuiOutlinedInput-notchedOutline": {
                              border: `0.0625rem solid ${CANCEL_GREY_BORDER}`,
                            },
                          },
                          width: isMobile ? "100%" : "10rem",
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
                        fontSize: isMobile ? "12px" : "1rem",
                        color: "#717171",
                        paddingTop: ".3rem",
                      }}
                    >
                      ₹ {addedData[elem]?.actualPrice}
                    </del>
                    <Typography
                      sx={{
                        fontSize: isMobile ? "14px" : "18px",
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
            )) :
            <Box className="d-flex justify-content-center pb-4">
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
        {addedData && Object.keys(addedData)?.length > 0 ? <Col
          className={classes.columnContainer
          }
        >
          <PriceDetails cartList={addedData && Object.keys(addedData)?.length > 0 ? Object.keys(addedData)?.length : 0} addedData={addedData} handleNext={handleNext} />
        </Col> : <></>}

      </Row>
    </>
  );
};

export default AddToCart;
