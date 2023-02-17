import React, { useEffect, useState } from "react";
import { Box, Grid, InputBase, TextField, Typography } from "@mui/material";
import ImageGallery from "react-image-gallery";
import Pincode from "react-pincode";
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "react-image-gallery/styles/css/image-gallery.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import Header from "components/SearchBar/Header";
import FMTypography from "components/FMTypography/FMTypography";
import FMButton from "components/FMButton/FMButton";
import FMRadioButtons from "components/FMRadioButton/FMRadioButton";
import FMDropdown from "components/FMDropdown/FMDropdown";

import ratingStart from "../../assets/ratingStart.svg";
import {
  createUserOptions,
  egglessOrNot,
  ExpressDelivery,
  FixedDelivery,
  StandardDelivery,
  trainingAndConformanceStatus,
} from "constants/AppConstant";
import { BLACK } from "constants/colors";
import "./ProductDetail.css";
import { commonStyle } from "Styles/commonStyles";
import { getProductsDetail } from "Redux/Slices/ProductDetailPage/ProductDetailPageSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { pId } = params;

  const [productQuantity, setProductQuantity] = useState(createUserOptions);
  const [eggOrNot, setEggOrNot] = useState(egglessOrNot);
  const [pincodeData, setPincodeData] = useState("");
  const [disabledDate, setDisabledDate] = useState(true);

  const [standardActive, setStandardActive] = useState(false);
  const [fixedActive, setFixedActive] = useState(false);
  const [midNightActive, setMidNightActive] = useState(false);

  const [deliveryTime, setDeliveryTime] = useState();

  const [serviceId, setServiceId] = useState("");

  // const [value, setValue] = useState(dayjs(Date()));

  const [date, setDate] = useState(dayjs(Date()));

  const handleChange = (newValue) => {
    setDate(newValue);
  };

  useEffect(() => {
    dispatch(getProductsDetail(pId));
  }, [dispatch, pId]);

  const productDetailedData = useSelector(
    (state) => state?.getProductsDetail?.getProductsListData?.product
  );
  console.log("productDetailedData", productDetailedData);
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(),
    mode: "onChange",
  });
  const { onChange: onServiceChange, ...restServiceRegister } =
    register("service");
  const serviceChangeHandler = (e) => {
    setServiceId(e.target.value);
    setValue("service", e.target.value);
    onServiceChange(e);
  };
  const apiImgs = productDetailedData?.productPictures?.map((elem) => ({
    original: elem?.img,
    thumbnail: elem?.img,
  }));

  const properties = {
    thumbnailPosition: "left",
    // infinite: false,
    autoPlay: true,

    useBrowserFullscreen: false,
    showPlayButton: false,
    // renderItem: this.myRenderItem.bind(this),
    originalHeight: "100px",
    items: apiImgs || [],
  };

  // useEffect(()=>{

  // })

  const getDataFunc = (data) => {
    console.log("first", data);

    setPincodeData(data);
    if (data?.pincode.length === 6) {
      setDisabledDate(false);
    }
  };

  return (
    <>
      <Header />
      <Grid sx={{ padding: "0 100px", display: "flex" }}>
        <Box xs={6} sx={{ display: "flex" }}>
          <ImageGallery {...properties} />
        </Box>
        <Box sx={{ marginLeft: "50px" }}>
          <FMTypography
            displayText={productDetailedData?.name}
            styleData={{ fontSize: "40px", fontWeight: "600" }}
          />

          {/* rating and review box below */}
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                backgroundColor: "#008539",
                display: "flex",
                padding: ".5rem",
                width: "auto",
                borderRadius: "4px",
              }}
            >
              <img
                src={ratingStart}
                alt="rating-star"
                style={{ width: "14px" }}
              />
              <FMTypography
                displayText={productDetailedData?.rating}
                styleData={{ color: "#FFFFFF", fontSize: "12px" }}
              />
            </Box>
            <FMButton
              displayText={`Reviews ${productDetailedData?.numReviews}`}
              variant={"outlined"}
              styleData={{
                textDecoration: "underline",
                lineHeight: "0.3px",
                textTransform: "capitalize",
                color: "#717171",
                border: "none",
                fontSize: "18px",
                "&:hover": {
                  border: "none",
                  backgroundColor: "white",
                  textDecoration: "underline",
                },
              }}
            />
          </Box>
          {/* price below */}
          <Box sx={{ display: "flex" }}>
            <del
              style={{
                fontSize: "24px",
                color: "#717171",
                paddingTop: ".5rem",
              }}
            >
              ₹ {productDetailedData?.actualPrice}
            </del>
            <Typography
              sx={{
                fontSize: "32px",
                color: "#000000",
                marginLeft: "1rem",
              }}
            >
              ₹ {productDetailedData?.discountPrice}
            </Typography>

            <FMTypography
              displayText={`${productDetailedData?.offer}% OFF`}
              styleData={{
                color: "#008539",
                fontSize: "18px",
                marginLeft: "1rem",
                paddingTop: ".7rem",
              }}
            />
          </Box>

          {/* weight radio */}
          {productDetailedData?.category === "63e7408c4d118f475c8542c2" && (
            <Box sx={{ marginTop: "17px" }}>
              <FMRadioButtons
                formLabel="Select Weight"
                radioButtons={createUserOptions}
                onChecked={(option) =>
                  option === "0.5 Kg"
                    ? setProductQuantity("0.5 Kg")
                    : option === "1 Kg"
                    ? setProductQuantity("1 Kg")
                    : setProductQuantity("2 Kg")
                }
                formLabelStyling={{
                  radioButtonStyle: {
                    fontWeight: "600",
                    lineHeight: "1.3125rem",
                    fontSize: "0.875rem",
                    color: BLACK,
                  },
                }}
                value={productQuantity}
                required={false}
              />
            </Box>
          )}

          {/* pincode and date selector */}
          <Box sx={{ marginTop: "1rem", display: "flex" }}>
            <Pincode
              showCity={false}
              showDistrict={false}
              showState={false}
              invalidError="Please check pincode"
              // lengthError="check length"
              // lengthError={() => console.log("hellooooooo")}
              // getData={(data) => {
              //   console.log("helloooo", data);
              //   setPincodeData(data);
              // }}
              getData={getDataFunc}
              pincodeInput={{
                borderRadius: "10px",
                width: "215px",
                border: "1px solid grey",
                height: "55px",
                padding: "16.5px 14px",
                marginRight: "1.7rem",
              }}
              areaInput={{
                backgroundColor: "white",
                border: "none",
                color: "red",
                fontSize: "12px",
              }}
              // onChange={() => console.log("helloooo")}
            />

            <Box>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DesktopDatePicker
                  // label="Date desktop"
                  disabled={disabledDate}
                  // disableFuture
                  disablePast
                  inputFormat="MM/DD/YYYY"
                  value={date}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                  className="datePickerStyle"
                  sx={{ height: "48px" }}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          {/* msg box */}
          {productDetailedData?.category === "63e7408c4d118f475c8542c2" && (
            <Box sx={{ display: "flex", marginTop: "1rem" }}>
              <FMRadioButtons
                radioButtons={egglessOrNot}
                onChecked={(option) =>
                  option === "Eggless"
                    ? setEggOrNot("Eggless")
                    : setEggOrNot("With Egg")
                }
                formLabelStyling={{
                  radioButtonStyle: {
                    fontWeight: "600",
                    lineHeight: "1.3125rem",
                    fontSize: "0.875rem",
                    color: BLACK,
                  },
                }}
                value={eggOrNot}
                required={false}
              />
              <InputBase
                required
                id="text"
                name="text"
                placeholder="Message on Cake"
                sx={{
                  ...commonStyle.inputFieldStyle,
                  width: "215px",

                  // ...(errors.email && commonStyle.errorStyle),
                }}
                // {...register("email")}
                // error={errors.email ? true : false}
              />
            </Box>
          )}

          {/* delivery type */}
          <Box>
            <FMTypography
              displayText={"Select Delivery Type"}
              styleData={{
                fontSize: "20px",
                fontWeight: "500",
                marginTop: "1rem",
                marginBottom: "1rem",
              }}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                padding: "8px 16px",
                border: "1px solid #E6E6E6",
                borderRadius: "10px",
              }}
            >
              <Box
                sx={{
                  width: "132px",
                  height: "48px",
                  left: "843px",
                  top: "703px",
                  backgroundColor: standardActive ? "#E6E6E6" : "white",
                  borderRadius: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDeliveryTime(StandardDelivery);
                  setStandardActive(!standardActive);
                  setMidNightActive(false);
                  setFixedActive(false);
                }}
              >
                <FMTypography
                  displayText={"Standard "}
                  styleData={{ fontSize: "12px" }}
                />
                <FMTypography
                  displayText={"(Free)"}
                  styleData={{ fontSize: "10px", color: "#178013" }}
                />
              </Box>

              <Box
                sx={{
                  width: "132px",
                  height: "48px",
                  left: "843px",
                  top: "703px",
                  backgroundColor: fixedActive ? "#E6E6E6" : "white",
                  borderRadius: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDeliveryTime(FixedDelivery);
                  setFixedActive(!fixedActive);
                  setMidNightActive(false);
                  setStandardActive(false);
                }}
              >
                <FMTypography
                  displayText={"Fixed time"}
                  styleData={{ fontSize: "12px" }}
                />
                <FMTypography
                  displayText={"₹ 200"}
                  styleData={{ fontSize: "10px", color: "#178013" }}
                />
              </Box>

              <Box
                sx={{
                  width: "132px",
                  height: "48px",
                  left: "843px",
                  top: "703px",
                  backgroundColor: midNightActive ? "#E6E6E6" : "white",
                  borderRadius: "100px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => {
                  setDeliveryTime(ExpressDelivery);
                  setMidNightActive(!midNightActive);
                  setStandardActive(false);
                  setFixedActive(false);
                }}
              >
                <FMTypography
                  displayText={"Mid night"}
                  styleData={{ fontSize: "12px" }}
                />
                <FMTypography
                  displayText={"₹ 250"}
                  styleData={{ fontSize: "10px", color: "#178013" }}
                />
              </Box>
            </Box>
          </Box>
          {/* time dropdown */}
          <Box>
            <FMDropdown
              options={deliveryTime}
              dropdownvalue="label"
              placeholder="Selecttime"
              onChange={serviceChangeHandler}
              sx={{
                ...commonStyle.dropdownStyle,
                height: "2.75rem",
                width: "215px",
                borderRadius: "0.5rem",
                marginTop: "1rem",
                border: "1px solid #E6E6E6",
                "&:hover": {
                  border: "1px solid black",
                },
              }}
              // error={errors.service}

              value={serviceId}
              {...restServiceRegister}
            />
          </Box>
          {/* cart and buy btns */}
          <Box sx={{ marginTop: "40px" }}>
            <FMButton
              displayText={"Add To Cart"}
              variant="outlined"
              styleData={{
                borderRadius: "10px",
                border: "1px solid #E6E6E6",
                width: "215px",
                color: "black",
                fontWeight: "600",
                fontSize: "1rem",
                textTransform: "capitalize",
                marginRight: "27px",
                "&:hover": {
                  border: "1px solid black",
                  backgroundColor: "white",
                },
              }}
            />
            <FMButton
              displayText={"Buy Now"}
              variant={"contained"}
              styleData={{
                ...commonStyle.buttonStyles,
                width: "215px",
              }}
              // onClick={handleSubmit(onSubmit)}
            />
            <input type={"submit"} hidden />
          </Box>

          {/* prod desc */}
          <Box sx={{ marginTop: "50px" }}>
            <FMTypography
              displayText={"Product Description"}
              styleData={{ fontSize: "20px", fontWeight: "500" }}
            />
            <p
              style={{ fontSize: "16px", fontWeight: "300", color: "#717171" }}
            >
              {productDetailedData?.description}
            </p>
          </Box>

          {/* right box end below */}
        </Box>
      </Grid>
    </>
  );
};

export default ProductDetail;
