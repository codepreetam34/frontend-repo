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
import AllAddressComponent from "./AllAddressComponent";
import PriceDetails from "../AddToCart/PriceDetails";
import { addToCartProductsFinal } from "Redux/Slices/AddToCart/AddToCartSlice";

const AddAddress = ({ handleNext }) => {
  const dispatch = useDispatch();
  const [pincodeData, setPincodeData] = useState("");
  const [homeOfficeLocation, setHomeOfficeLocation] = useState("Home");
  const [displayFormData, setDisplayFormData] = useState(false);

  useEffect(() => {
    dispatch(addToCartAddress());
  }, [dispatch]);

  const addressDetailsAdded = useSelector(
    (state) =>
      state?.addToCartAddress?.getAddToCartAddress?.userAddress?.address
  );

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

  const onSubmit = (data) => {
    const payload = {
      address: {
        name: data?.firstName,
        mobileNumber: data?.contactNumber,
        pinCode: pincodeData?.pincode,
        locality: data?.location,
        address: data?.address,
        cityDistrictTown: data?.cityDistrict,
        state: data?.state,
        landmark: data?.landmark,
        alternatePhone: data?.alternateNum,
        addressType: homeOfficeLocation,
      },
    };


    dispatch(addToCartAddAddress(payload));
    dispatch(addToCartProductsFinal());
    setDisplayFormData(false);
  };

  const displayForm = () => {
    setDisplayFormData(true);
  };

  const addedData = useSelector(
    (state) => state?.addToCartProducts?.getAddToCartProductsListData?.cartItems
  );

  useEffect(() => {
    dispatch(addToCartProductsFinal());
  }, [dispatch]);

  return (
    <>
      <Row style={{ padding: "10px 120px 0 120px" }}>
        <Col>
          <AllAddressComponent
            addressDetailsAdded={addressDetailsAdded}
            styleData={{ display: displayFormData ? "none" : "block" }}
          />

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
                      id="contactNumber"
                      name="contactNumber"
                      placeholder="Contact Number"
                      sx={{
                        ...commonStyle.inputFieldStyle,

                        ...(errors.contactNumber && commonStyle.errorStyle),
                      }}
                      {...register("contactNumber")}
                      error={errors.contactNumber ? true : false}
                    />
                    <FMTypography
                      styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                      displayText={errors.contactNumber?.message}
                    />
                  </Box>
                </Box>

                {/* pincode below */}
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ marginRight: "2rem" }}>
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
                        width: "110%",
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
                  </Box>
                  <Box>
                    <InputBase
                      required
                      id="location"
                      name="location"
                      placeholder="location/Town"
                      sx={{
                        ...commonStyle.inputFieldStyle,
                        marginTop: "-.1rem",

                        ...(errors.location && commonStyle.errorStyle),
                      }}
                      {...register("location")}
                      error={errors.location ? true : false}
                    />
                    <FMTypography
                      styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                      displayText={errors.location?.message}
                    />
                  </Box>
                </Box>
                {/* pincode aboe */}

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

                <Box sx={commonStyle.flexStyle}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ marginRight: "1rem" }}>
                      <InputBase
                        required
                        id="cityDistrict"
                        name="cityDistrict"
                        placeholder="city/District"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          ...(errors.cityDistrict && commonStyle.errorStyle),
                        }}
                        {...register("cityDistrict")}
                        error={errors.cityDistrict ? true : false}
                      />
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.cityDistrict?.message}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        required
                        id="state"
                        name="state"
                        placeholder="State"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          ...(errors.state && commonStyle.errorStyle),
                        }}
                        {...register("state")}
                        error={errors.state ? true : false}
                      />
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.state?.message}
                      />
                    </Box>
                  </Box>
                </Box>

                <Box sx={commonStyle.flexStyle}>
                  <Box sx={{ display: "flex" }}>
                    <Box sx={{ marginRight: "1rem" }}>
                      <InputBase
                        // required
                        id="landmark"
                        name="landmark"
                        placeholder="Landmark"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          ...(errors.landmark && commonStyle.errorStyle),
                        }}
                        {...register("landmark")}
                        error={errors.landmark ? true : false}
                      />
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.landmark?.message}
                      />
                    </Box>
                    <Box>
                      <InputBase
                        required
                        id="alternateNum"
                        name="alternateNum"
                        placeholder="Alternate Num"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          ...(errors.alternateNum && commonStyle.errorStyle),
                        }}
                        {...register("alternateNum")}
                        error={errors.alternateNum ? true : false}
                      />
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.alternateNum?.message}
                      />
                    </Box>
                  </Box>
                </Box>

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
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <FMButton
                displayText={"Save & Delivery here"}
                variant={"contained"}
                styleData={{
                  ...commonStyle.buttonStyles,
                  width: "247px",
                  marginTop: "32px",
                }}
                onClick={handleSubmit(onSubmit)}
              />
              <FMButton
                displayText={"Cancel"}
                variant={"outlined"}
                styleData={{
                  ...commonStyle.buttonStyles,
                  // width: "100%",
                  marginTop: "32px",
                  backgroundColor: "white",
                  border: "none",
                  color: "black",
                  "&:hover": {
                    backgroundColor: "white",
                    border: "none",
                    color: "black",
                  },
                }}
                onClick={() => setDisplayFormData(false)}
              />
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
            // onClick={displayForm}
            />
          </Box>
        </Col>
        <Col style={{ marginLeft: "87px", paddingBottom: '2rem' }}>



          {/* Render the PriceDetails component and pass the addedData prop */}
          <PriceDetails addedData={addedData} handleNext={handleNext} />

        </Col>
      </Row>
    </>
  );
};

export default AddAddress;
