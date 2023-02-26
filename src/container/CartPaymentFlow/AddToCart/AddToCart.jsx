import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";

import womanCard from "../../../assets/womanCard.svg";
import closeCrossIcon from "../../../assets/closeCrossIcon.svg";

import { commonStyle } from "Styles/commonStyles";
import { Col, Row } from "react-bootstrap";
import FMTypography from "components/FMTypography/FMTypography";
import FMDropdown from "components/FMDropdown/FMDropdown";
import { quantityOpt, StandardDelivery } from "constants/AppConstant";
import FMButton from "components/FMButton/FMButton";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCartProductsFinal,
  deleteAddToCartProducts,
} from "Redux/Slices/AddToCart/AddToCartSlice";

const AddToCart = ({ handleNext }) => {
  const dispatch = useDispatch();

  const [quantityOption, setQuantityOption] = useState("Qty 1");
  console.log("quantityOption", quantityOption);

  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );
  console.log("addedData", addedData?.img);
  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);

  const deleteProductOnClick = () => {
    dispatch(
      deleteAddToCartProducts({ productId: "63ee0a533103fd3588201003" })
    );
  };

  const optionChangeHandler = (e) => {
    console.log("e", e);
    // setQuantityOption(e.target.value);
  };

  return (
    <>
      <Row style={{ padding: "40px 120px" }}>
        <Col>
          <FMTypography
            displayText={"Cart"}
            styleData={{ fontSize: "40px", fontWeight: "500" }}
          />
        </Col>
      </Row>

      <Row style={{ padding: "10px 120px 0 120px" }}>
        <Col>
          {/* {addedData?.map((elem) => ( */}
          <Box
            sx={{
              borderRadius: "20px",
              boxShadow:
                "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
              display: "flex",
              width: "auto",
              padding: "32px",
              marginTop: "20px",
            }}
          >
            <Box>
              <img
                src={addedData?.img}
                alt="img"
                style={{ width: "150px", height: "150px" }}
              />
            </Box>
            <Box sx={{ marginLeft: "1rem", width: "100%" }}>
              <Box sx={{ display: "fllex", justifyContent: "space-between" }}>
                <FMTypography displayText={"Chocolate Truffle"} />
                <img
                  src={closeCrossIcon}
                  alt="close-icon"
                  style={{ cursor: "pointer" }}
                  onClick={deleteProductOnClick}
                />
              </Box>
              {/* dropdown row below */}
              <Row>
                <Col>
                  <FMDropdown
                    options={quantityOpt}
                    dropdownvalue="label"
                    // placeholder="Selecttime"
                    onChange={optionChangeHandler}
                    sx={{
                      ...commonStyle.dropdownStyle,
                      height: "2.75rem",
                      width: "81px",
                      borderRadius: "10px",
                      backgroundColor: "#E6E6E6",
                      marginTop: "1rem",
                      border: "1px solid #E6E6E6",
                    }}
                    // error={errors.service}

                    value={quantityOption}
                    // {...restServiceRegister}
                  />
                </Col>
              </Row>
              {/* dropdown row above */}
              <Box sx={{ display: "flex" }}>
                <del
                  style={{
                    fontSize: "1rem",
                    color: "#717171",
                    paddingTop: ".5rem",
                  }}
                >
                  ₹ {500}
                </del>
                <Typography
                  sx={{
                    fontSize: "18px",
                    color: "#000000",
                    marginLeft: "10px",
                    paddingTop: ".4rem",
                  }}
                >
                  ₹ {234}
                </Typography>

                <FMTypography
                  displayText={`${22}% OFF`}
                  styleData={{
                    color: "#008539",
                    fontSize: "12px",
                    marginLeft: "8px",
                    paddingTop: ".7rem",
                  }}
                />
              </Box>
              <Typography variant="body2" sx={{ color: "#717171" }}>
                {"Same day delivery"}
              </Typography>
            </Box>
          </Box>
          {/* ))} */}
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
              <FMTypography displayText={"Price Details (3 Iteams)"} />
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
