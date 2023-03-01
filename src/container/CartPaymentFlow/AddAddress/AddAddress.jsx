import React, { useEffect, useState } from "react";
import { Box, InputBase } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import Pincode from "react-pincode";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import FMRadioButtons from "components/FMRadioButton/FMRadioButton";
import FMDetailTypography from "components/FMDetailTypography/FMDetailTypography";

import { commonStyle } from "Styles/commonStyles";
import { locationHomeOrOffice } from "constants/AppConstant";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { addAddressSchema } from "validationSchema/addAddressSchema";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAddress } from "Redux/Slices/AddToCart/AddAddress";
import { addToCartAddAddress } from "Redux/Slices/AddToCart/AddToCartAddAddressSlice";

const AddAddress = ({ handleNext }) => {
  const dispatch = useDispatch();
  const [pincodeData, setPincodeData] = useState("");
  const [homeOfficeLocation, setHomeOfficeLocation] = useState("Home");
  const [displayFormData, setDisplayFormData] = useState(false);

  useEffect(() => {
    dispatch(addToCartAddress());
  }, [dispatch]);

  const addressDetailsAdded = useSelector((state) => state);
  // console.log(
  //   "addressDetailsAdded",
  //   addressDetailsAdded?.addToCartAddress?.getAddToCartAddress
  // );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addAddressSchema),
    mode: "onChange",
  });

  const getDataFunc = (data) => {
    setPincodeData(data);
    if (data?.pincode.length === 6) {
    }
  };

  // const onSubmit = (data) => {
  //   console.log("dara");
  //   // dispatch(addToCartAddAddress(data));
  //   // .unwrap()
  //   // .then((res) => {
  //   //   if (res) {
  //   //   }
  //   // });
  // };
  const onSubmit = () => {};

  const displayForm = () => {
    setDisplayFormData(true);
  };

  return (
    <>
      <Row style={{ padding: "10px 120px 0 120px" }}>
        <Col>
          <Box
            sx={{
              boxShadow:
                "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
              borderRadius: "20px",
              padding: "40px",
              display: displayFormData ? "none" : "block",
            }}
          >
            <Box sx={{ marginBottom: "2rem" }}>
              <FMTypography
                displayText={"Default Address"}
                styleData={{ fontSize: "20px", fontWeight: "400" }}
              />
            </Box>
            <Box sx={{ display: "flex", marginBottom: "1rem" }}>
              <FMTypography
                displayText={"Rohit"}
                styleData={{ fontSize: "1rem", fontWeight: "500" }}
              />
              <FMTypography
                displayText={"(Home)"}
                styleData={{
                  fontSize: "12px",
                  fontWeight: "500",
                  marginLeft: "12px",
                  marginTop: ".2rem",
                  color: "#222222",
                }}
              />
            </Box>
            <FMTypography
              displayText={"319, Netaji Subhash Place, New Delhi,Delhi 110034"}
              styleData={{
                fontSize: "1rem",
                color: "#717171",
                fontWeight: "400",
                marginBottom: "1rem",
              }}
            />
            <FMDetailTypography
              displayText1={"Mobile:"}
              displayText2={"8888888888"}
              styleData1={{ marginBottom: "1rem" }}
            />
            <FMTypography
              displayText={"Pay On Delivery Available"}
              styleData={{ fontSize: "1rem", color: "#717171" }}
            />
          </Box>

          {/* form below */}

          <Box
            sx={{
              boxShadow:
                "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
              borderRadius: "20px",
              marginTop: "24px",
              marginBottom: "24px",
              padding: "32px",
              display: displayFormData ? "block" : "none",
            }}
          >
            <Box
              component="form"
              xs={12}

              // onSubmit={handleSubmit(onSubmit)}
            >
              <Box sx={commonStyle.flexStyle}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ marginRight: "1rem" }}>
                    <InputBase
                      required
                      id="firstName"
                      name="firstName"
                      placeholder="Name"
                      sx={{
                        ...commonStyle.inputFieldStyle,

                        ...(errors.firstName && commonStyle.errorStyle),
                      }}
                      {...register("firstName")}
                      error={errors.firstName ? true : false}
                    />
                    <FMTypography
                      styleData={{
                        ...commonStyle.errorText,
                        fontSize: "11px",
                      }}
                      displayText={errors.firstName?.message}
                    />
                  </Box>
                  <Box>
                    <InputBase
                      required
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      sx={{
                        ...commonStyle.inputFieldStyle,
                        ...(errors.lastName && commonStyle.errorStyle),
                      }}
                      {...register("lastName")}
                      error={errors.lastName ? true : false}
                    />
                    <FMTypography
                      styleData={{
                        ...commonStyle.errorText,
                        fontSize: "11px",
                      }}
                      displayText={errors.lastName?.message}
                    />
                  </Box>
                </Box>

                <InputBase
                  required
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter your contact Number"
                  sx={{
                    ...commonStyle.inputFieldStyle,

                    ...(errors.contactNumber && commonStyle.errorStyle),
                  }}
                  {...register("contactNumber")}
                  error={errors.contactNumber ? true : false}
                />
                <FMTypography
                  styleData={commonStyle.errorText}
                  displayText={errors.contactNumber?.message}
                />

                <Pincode
                  showCity={false}
                  showDistrict={false}
                  showState={false}
                  invalidError="Please check pincode"
                  // lengthError="check length"
                  getData={getDataFunc}
                  showArea={pincodeData ? true : false}
                  pincodeInput={{
                    borderRadius: "10px",
                    width: "100%",
                    border: "1px solid grey",
                    height: "40px",
                    padding: "16.5px 14px",
                    marginRight: "1.7rem",
                    marginBottom: !pincodeData && "1.1rem",
                  }}
                  areaInput={{
                    backgroundColor: "white",
                    border: "none",
                    color: "red",
                    fontSize: "12px",
                  }}
                />

                <InputBase
                  required
                  id="address"
                  name="address"
                  placeholder="Enter your address"
                  sx={{
                    ...commonStyle.inputFieldStyle,

                    ...(errors.address && commonStyle.errorStyle),
                  }}
                  {...register("address")}
                  error={errors.address ? true : false}
                />
                <FMTypography
                  styleData={commonStyle.errorText}
                  displayText={errors.address?.message}
                />

                <InputBase
                  required
                  id="location"
                  name="location"
                  placeholder="Enter your location/Town"
                  sx={{
                    ...commonStyle.inputFieldStyle,

                    ...(errors.location && commonStyle.errorStyle),
                  }}
                  {...register("location")}
                  error={errors.location ? true : false}
                />
                <FMTypography
                  styleData={commonStyle.errorText}
                  displayText={errors.location?.message}
                />

                <FMRadioButtons
                  radioButtons={locationHomeOrOffice}
                  onChecked={(option) =>
                    option === "Office"
                      ? setHomeOfficeLocation("Office")
                      : setHomeOfficeLocation("Home")
                  }
                  formLabelStyling={{
                    radioButtonStyle: {
                      fontWeight: "600",
                      lineHeight: "1.3125rem",
                      fontSize: "0.875rem",
                      // color: `BLACK !important`,
                      color: "black !important",
                    },
                  }}
                  labelStyle={{
                    color: "black !important",
                    fontSize: "20px !important",
                    fontWeight: "500 !important",
                  }}
                  value={homeOfficeLocation}
                  // required={true}
                />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              ></Box>
            </Box>
          </Box>
          <Box
            sx={{
              boxShadow:
                "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
              borderRadius: "20px",
              marginTop: "24px",
              marginBottom: "24px",
              padding: "32px",
              display: displayFormData ? "none" : "block",
            }}
          >
            <FMButton
              displayText={"+ Add new Address"}
              variant="outlined"
              styleData={{
                fontSize: "1rem",
                fontWeight: "500",
                border: "none",
                backgroundColor: "white",
                color: "#000000",
                "&:hover": { border: "none", backgroundColor: "white" },
              }}
              onClick={displayForm}
            />
          </Box>
        </Col>
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
              displayText={"Continue"}
              variant={"contained"}
              styleData={{
                ...commonStyle.buttonStyles,
                width: "100%",
                marginTop: "32px",
              }}
              // onClick={() => console.log("hello")}
              onClick={handleSubmit(onSubmit)}
            />
          </Box>
        </Col>
      </Row>
    </>
  );
};

export default AddAddress;
