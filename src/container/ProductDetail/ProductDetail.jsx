import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  InputBase,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import ImageGallery from "react-image-gallery";
import Pincode from "react-pincode";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "react-image-gallery/styles/css/image-gallery.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from "moment";

import Header from "../../components/SearchBar/Header";
import FMTypography from "../../components/FMTypography/FMTypography";
import FMButton from "../../components/FMButton/FMButton";
import FMRadioButtons from "../../components/FMRadioButton/FMRadioButton";
//import FMDropdown from "../../components/FMDropdown/FMDropdown";

import ratingStart from "../../assets/ratingStart.svg";
import reviewBlackStar from "../../assets/reviewBlackStar.svg";

import {
  createUserOptions,
  egglessOrNot,
  ExpressDelivery,
  FixedDelivery,
  StandardDelivery,
} from "../../constants/AppConstant";
import { BLACK } from "../../constants/colors";
import "./ProductDetail.css";
import { commonStyle } from "../../Styles/commonStyles";
import {
  addToCart,
  getProductsDetail,
} from "../../Redux/Slices/ProductDetailPage/ProductDetailPageSlice";
import { addToCartSchema } from "../../validationSchema/addToCartSchema";
import { Col, Container, Row } from "react-bootstrap";
import { ADD_TO_CART } from "../../Routes/Routes";
import { addToCartProductsFinal } from "../../Redux/Slices/AddToCart/AddToCartSlice";
import Footer from "../../components/Footer/Footer";
import Layout from "../../components/Layout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import FMDeliveryDropdown from "../../components/FMDeliveryDropdown";
const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { pId } = params;
  const [storedPincode, setStoredPincode] = useState(sessionStorage.getItem("pincode"));

  console.log("storedPincode ", storedPincode)
  const [productQuantity, setProductQuantity] = useState(createUserOptions);
  const [eggOrNot, setEggOrNot] = useState(egglessOrNot);
  const [pincodeData, setPincodeData] = useState("");
  const [disabledDate, setDisabledDate] = useState(true);
  const [standardActive, setStandardActive] = useState(false);
  const [fixedActive, setFixedActive] = useState(false);
  const [midNightActive, setMidNightActive] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState();
  const [serviceId, setServiceId] = useState("");

  const todaysDate = moment(new Date()).format("DDMMYY");
  const [date, setDate] = useState(null);
  const [isTodaysDate, setIsTodaysDate] = useState(true);
  useEffect(() => {
    setIsTodaysDate(() => date && date.format && date.format("DDMMYY") === todaysDate);
  }, [date]);



  const handleChange = (newValue) => {
    setDate(newValue);
  };

  useEffect(() => {
    dispatch(getProductsDetail(pId));
  }, [dispatch, pId]);

  const productDetailedData = useSelector(
    (state) => state?.getProductsDetail?.getProductsListData?.product
  );

  const reviewsCarouselData = useSelector(
    (state) => state?.getProductsDetail?.getProductsListData?.product?.reviews
  );

  const similarProductDetailedData = useSelector(
    (state) => state?.getProductsDetail?.getProductsListData?.similarProducts
  );

  const categoryName = useSelector(
    (state) => state?.getProductsDetail?.getProductsListData?.categoryName
  );

  const {
    register,
    handleSubmit,
    getValues,
    setValue,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(addToCartSchema),
    mode: "onChange",
  });

  const navigate = useNavigate();

  const onSubmit = async (data) => {
    if (pId) {
      const cartItems = [];
      const payload = {
        cartItems: [
          {
            product: pId,
            quantity: 1,
          },
        ],
      };

      dispatch(addToCart(payload)).then((res) => {
        if (res) {
          //navigate(`/add-to-cart`);
          dispatch(addToCartProductsFinal());
        }
      });
      // navigate(`/add-to-cart`);
    }
  };

  const tempSub = () => {
    navigate(`/add-to-cart?${pId}`);
  };

  // const { onChange: onServiceChange, ...restServiceRegister } =
  //   register("service");
  const serviceChangeHandler = (e) => {
    setServiceId(e.target.value);
    setValue("service", e.target.value);
    //onServiceChange(e);
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
  const [showArea, setShowArea] = useState(false);

  const getDataFunc = (data) => {
    if (data?.pincode.length === 6 && data?.pincode.length > 0) {
      setPincodeData(data);
      setDisabledDate(false);
      // Show area when a valid PIN code is entered
      setShowArea(true);
    } else {
      setPincodeData(null);
      setDisabledDate(true);
      // Hide area when the PIN code is not valid or empty
      setShowArea(false);
    }
  };

  const reviewNavHandler = () => {
    navigate(`/add-review/${pId}`, {
      state: {
        productName: productDetailedData?.name,
        totalReviews: productDetailedData?.numReviews,
        totalRating: (productDetailedData?.rating * 10) / 10,
      },
    });
  };

  const responsive = {
    desktop: {
      breakpoint: {
        max: 3000,
        min: 1024,
      },
      items: 3,
      slidesToSlide: 2,
      // partialVisibilityGutter: 40,
    },
    mobile: {
      breakpoint: {
        max: 464,
        min: 0,
      },
      items: 2,
      slidesToSlide: 2,
      // partialVisibilityGutter: 30,
    },
    tablet: {
      breakpoint: {
        max: 1024,
        min: 200,
      },
      items: 1,
      slidesToSlide: 1,
      // partialVisibilityGutter: 30,
    },
  };

  const handleWeightChange = (option) => {
    setProductQuantity(option);
  };
  const [selectedTime, setSelectedTime] = useState(""); // State to track selected time

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };
  const title = productDetailedData?.name || "Vibezter";
  const description = "This is the home page of our MERN application.";

  ///////////

  dayjs.extend(customParseFormat);

  //datepicker
  const [filterFixedOptions, setFilterFixedOptions] = useState([]);
  const [filterStandardOptions, setFilterStandardOptions] = useState([]);
  const [insertDate, setInsertDate] = useState(false);
  const [currentTime, setCurrentTime] = useState();
  const [filterExpressOptions, setFilterExpressOptions] = useState([]);
  const [selectTodayDate, setSelectTodayDate] = useState(false);

  const [standard, setStandard] = useState(false);
  const [fixed, setFixed] = useState(false);
  const [express, setExpress] = useState(false);
  const [dateString, setDateString] = useState("");

  // const onDateChange = (date) => {
  //   console.log("date ", date)
  //   setDate(date);
  //   const newdate = new Date();
  //   let day = newdate.getDate();
  //   let newDay = day < 10 ? "0" + day : day;

  //   let month = newdate.getMonth() + 1;
  //   let newMonth = month < 10 ? (month = "0" + month) : month;

  //   let year = newdate.getFullYear();

  //   let curTime = newdate.getHours();
  //   setCurrentTime(curTime);
  //   console.log("current time ", curTime);

  //   // const selectedDate = new Date(newDate);
  //   // const year = selectedDate.getFullYear();
  //   // const month = (selectedDate.getMonth() + 1).toString().padStart(2, "0");
  //   // const day = selectedDate.getDate().toString().padStart(2, "0");
  //   const formattedDate = `${newDay}/${newMonth}/${year}`;

  //   setDateString(formattedDate);

  //   console.log("dateString ", dateString)
  //   let newFixedArray = FixedDelivery.filter(function (el) {
  //     return el.value > curTime + 1;
  //   });

  //   let newExpressArray = ExpressDelivery.filter(function (el) {
  //     return el.value > curTime + 1;
  //   });

  //   setFilterExpressOptions(newExpressArray);
  //   setFilterFixedOptions(newFixedArray);
  //   // console.log("new", newFixedArray);

  //   // This arrangement can be altered based on how we want the date's format to appear.
  //   let currentDate = `${newDay}/${newMonth}/${year}`;
  //   console.log("today", currentDate, "=", dateString);

  //   if (currentDate === date) {
  //     setSelectTodayDate(true);
  //     console.log(
  //       "cur date ",
  //       currentDate,
  //       "today date ",
  //       selectTodayDate,
  //       "datestring ",
  //       dateString
  //     );
  //   } else {
  //     setSelectTodayDate(false);
  //   }

  //   dateString ? setInsertDate(true) : setInsertDate(false);

  //   console.log("date", date, dateString);
  // };

  const onDateChange = (date) => {
    setDate(date);
    const newdate = new Date();
    let day = newdate.getDate();
    let newDay = day < 10 ? "0" + day : day;

    let month = newdate.getMonth() + 1;
    let newMonth = month < 10 ? "0" + month : month;

    let year = newdate.getFullYear();

    let curTime = newdate.getHours();
    setCurrentTime(curTime);

    const todayDate = `${newDay}/${newMonth}/${year}`;
    setDateString(todayDate);
    let currentDate;

    if (date) {
      const selectedDate = new Date(date);
      const selectedDay = selectedDate.getDate();
      const selectedMonth = (selectedDate.getMonth() + 1)
        .toString()
        .padStart(2, "0");
      const selectedYear = selectedDate.getFullYear();
      const selectedDateFormatted = `${selectedDay}/${selectedMonth}/${selectedYear}`;

      // Set currentDate to the selected date in DD/MM/YYYY format
      currentDate = selectedDateFormatted;
    }

    let newFixedArray = FixedDelivery.filter(function (el) {
      return el.value > curTime + 1;
    });

    let newExpressArray = ExpressDelivery.filter(function (el) {
      return el.value > curTime + 1;
    });

    let newStandardArray = StandardDelivery.filter(function (el) {
      return el.value >= curTime;
    });

    if (currentDate === todayDate) {
      setFilterExpressOptions(newExpressArray);
      setFilterFixedOptions(newFixedArray);
      setFilterStandardOptions(newStandardArray);
      setSelectTodayDate(true);
    } else {
      setSelectTodayDate(false);
    }
    todayDate ? setInsertDate(true) : setInsertDate(false);
  };

  const disabledDateHandle = (current) => {
    //console.log('disabled ',current);
    // Can not select days before today and today
    //console.log("current Date", current);
    return current && current.add(1, "d") < dayjs().endOf("day");
  };

  //end

  const standardDelivery = () => {
    setStandard(true);
    setExpress(false);
    setFixed(false);
    setMidNightActive(false);
    setStandardActive(true);
    setFixedActive(false);
  };

  const fixedDelivery = () => {
    setStandard(false);
    setExpress(false);
    setFixed(true);
    setMidNightActive(false);
    setStandardActive(false);
    setFixedActive(true);
  };

  const expressDelivery = () => {
    setStandard(false);
    setExpress(true);
    setFixed(false);
    setMidNightActive(true);
    setStandardActive(false);
    setFixedActive(false);
  };

  const onStandardDeliveryChange = (e) => {
    console.log(`onStandardDeliveryChange ${e.target.value}`);
    setSelectedTime(e.target.value);
  };

  const onFixedDeliveryChange = (e) => {
    console.log(`onFixedDeliveryChange ${e.target.value}`);
    setSelectedTime(e.target.value);
  };
  const onExpressDeliveryChange = (e) => {
    console.log(`onExpressDeliveryChange ${e.target.value}`);
    setSelectedTime(e.target.value);
  };

  const onCardClick = (productId) => {
    navigate(`/product-detail/${productId}`)
  }

  return (
    <>
      <Layout title={title} description={description}>
        <Header />
        <Container>
          <Grid sx={{ display: "flex" }}>
            <Row>
              <Col style={{ display: "flex" }}>
                <ImageGallery {...properties} />
              </Col>

              {/* info box right */}
              <Col
                // xs={6}
                component="form"
                className="right-info-box"
                // style={{ marginLeft: "3.125rem" }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <FMTypography
                  displayText={productDetailedData?.name}
                  styleData={{ fontSize: "40px", fontWeight: "600" }}
                />

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
                      displayText={
                        Math.round(productDetailedData?.rating * 10) / 10
                      }
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
                    ₹{" "}
                    {productQuantity == "0.5 Kg"
                      ? productDetailedData?.halfkgprice
                      : productQuantity == "1 Kg"
                        ? productDetailedData?.onekgprice
                        : productQuantity == "2 Kg"
                          ? productDetailedData?.twokgprice
                          : productDetailedData?.discountPrice}
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
                {categoryName && categoryName?.toLowerCase() === "cakes" ? (
                  <Box sx={{ marginTop: "17px" }}>
                    <FMRadioButtons
                      formLabel="Select Weight"
                      radioButtons={createUserOptions}
                      onChecked={
                        (option) => handleWeightChange(option)

                        // option === "0.5 Kg"
                        //   ? setProductQuantity("0.5 Kg")
                        //   : option === "1 Kg"
                        //     ? setProductQuantity("1 Kg")
                        //     : setProductQuantity("2 Kg")
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
                      value={productQuantity}
                      required={true}
                    />
                  </Box>
                ) : (
                  <></>
                )}

                {/* pincode and date selector */}
                <Box sx={{ marginTop: "1rem", display: "flex" }}>
                  <Box>
                    <Pincode

                      value={storedPincode}
                      showCity={false}
                      showDistrict={false}
                      showState={false}
                      invalidError="Please check pincode"
                      // lengthError="check length"
                      // lengthError={() => console.log("hellooooooo")}
                      // getData={(data) => {
                      //   setPincodeData(data);
                      // }}
                      getData={getDataFunc}
                      showArea={showArea}
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
                    />
                  </Box>
                  {/* <FMTypography
                styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                displayText={errors.pinCode?.message}
              /> */}
                  <Box>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        label="Select Date"
                        disabled={disabledDate}
                        disablePast
                        inputFormat="DD/MM/YYYY"
                        value={date}
                        onChange={onDateChange}
                        //onChange={(e) => console.log(e)}
                        renderInput={(startProps) => (
                          <>
                            <TextField
                              {...startProps}
                              id="date-picker"

                            />
                          </>
                        )}
                        className="datePickerStyle"
                        sx={{ height: "48px" }}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                {/* msg box */}
                {categoryName?.toLowerCase() === "cakes" ? (
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
                        marginLeft: "1rem",

                        ...(errors.cakeMessage && commonStyle.errorStyle),
                      }}
                      {...register("cakeMessage")}
                      error={errors.cakeMessage ? true : false}
                    />
                  </Box>
                ) : (
                  <></>
                )}

                {/* <Box>
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
                    {...register("cakeMessage")}
                    error={errors.cakeMessage ? true : false}
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
                        cursor: isTodaysDate ? "not-allowed" : "pointer", // Change cursor style
                        border: "1px solid #E6E6E6",
                        "&:hover": {
                          border: isTodaysDate ? "1px solid #E6E6E6" : "1px solid black", // Adjust border on hover
                        },
                        opacity: isTodaysDate ? 0.5 : 1, // Adjust opacity for disabled state
                      }}
                      onClick={() => {
                        if (!isTodaysDate) {
                          setDeliveryTime(StandardDelivery);
                          setStandardActive(!standardActive);
                          setMidNightActive(false);
                          setFixedActive(false);
                        }
                      }}
                    >
                      <FMTypography displayText={"Standard"} styleData={{ fontSize: "12px" }} />
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
                        border: "1px solid #E6E6E6",
                        "&:hover": { border: "1px solid black" },
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
                        border: "1px solid #E6E6E6",
                        "&:hover": { border: "1px solid black" },
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
                </Box> */}

                {/* {deliveryTime ?
                  <Box>

                    <FMDropdown
                      options={deliveryTime}
                      name="deliveryTime"
                      id="deliveryTime"
                     onChange={handleTimeChange}
                      onChange={onExpressDeliveryChange}
                      options={
                        selectTodayDate
                          ? filterExpressOptions
                          : expressOptions
                      }
                      sx={{
                        ...commonStyle.dropdownStyle,
                        width: "215px",
                        marginTop: "1rem",

                      }}
                      defaultValue={deliveryTime[0].label}
                    />
                  </Box>
                  : <></>
                }  */}

                {insertDate ? (
                  <Row className="my-2">
                    <Col md={12}>
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
                          {...register("cakeMessage")}
                          error={errors.cakeMessage ? true : false}
                        >
                          <Box
                            className={
                              selectTodayDate ? "standard-is-disabled" : ""
                            }
                            sx={{
                              width: "132px",
                              height: "48px",
                              left: "843px",
                              top: "703px",
                              backgroundColor: standardActive
                                ? "#E6E6E6"
                                : "white",
                              borderRadius: "100px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: isTodaysDate ? "not-allowed" : "pointer", // Change cursor style
                              border: "1px solid #E6E6E6",
                              "&:hover": {
                                border: isTodaysDate
                                  ? "1px solid #E6E6E6"
                                  : "1px solid black", // Adjust border on hover
                              },
                              opacity: isTodaysDate ? 0.5 : 1, // Adjust opacity for disabled state
                            }}
                            onClick={standardDelivery}
                          >
                            <FMTypography
                              displayText={"Standard"}
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
                              backgroundColor: fixedActive
                                ? "#E6E6E6"
                                : "white",
                              borderRadius: "100px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              border: "1px solid #E6E6E6",
                              "&:hover": { border: "1px solid black" },
                            }}
                            onClick={fixedDelivery}
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
                              backgroundColor: midNightActive
                                ? "#E6E6E6"
                                : "white",
                              borderRadius: "100px",
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              cursor: "pointer",
                              border: "1px solid #E6E6E6",
                              "&:hover": { border: "1px solid black" },
                            }}
                            onClick={expressDelivery}
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
                    </Col>

                    <Col>
                      {selectTodayDate && !fixed && !express ? (
                        <div
                          class="my-2 alert alert-danger"
                          role="alert"
                          style={{ width: "150px" }}
                        >
                          Not Applicable for Standard Delivery!
                        </div>
                      ) : (
                        <></>
                      )}

                      {standard && !selectTodayDate ? (
                        <>
                          <div className="mt-3">
                            <div className="fw-bold">
                              <h6
                                style={{ color: "#636363", fontSize: "18px" }}
                              >
                                Select Standard Time Slot
                              </h6>
                            </div>
                          </div>
                          <FMDeliveryDropdown
                            sx={{
                              ...commonStyle.dropdownStyle,
                              width: "15rem",
                              marginTop: ".5rem",
                            }}
                            defaultValue={"Select Time Slot"}
                            onChange={onStandardDeliveryChange}
                            options={
                              selectTodayDate
                                ? filterStandardOptions
                                : StandardDelivery
                            }
                          />
                        </>
                      ) : fixed ? (
                        <>
                          <div className="mt-3">
                            <div className="fw-bold">
                              <h6
                                style={{ color: "#636363", fontSize: "18px" }}
                              >
                                Select Fixed Time Slot
                              </h6>
                            </div>
                          </div>
                          <FMDeliveryDropdown
                            sx={{
                              ...commonStyle.dropdownStyle,
                              width: "15rem",
                              marginTop: ".5rem",
                            }}
                            defaultValue="Select Time Slot"
                            onChange={onFixedDeliveryChange}
                            options={
                              selectTodayDate
                                ? filterFixedOptions
                                : FixedDelivery
                            }
                          />
                        </>
                      ) : express ? (
                        <>
                          <div className="mt-3">
                            <div className="fw-bold">
                              <h6
                                style={{ color: "#636363", fontSize: "18px" }}
                              >
                                Select Express Time Slot
                              </h6>
                            </div>
                          </div>

                          <FMDeliveryDropdown
                            sx={{
                              ...commonStyle.dropdownStyle,
                              width: "15rem",
                              marginTop: ".5rem",
                            }}
                            defaultValue={"Select Time Slot"}
                            onChange={onExpressDeliveryChange}
                            options={
                              selectTodayDate
                                ? filterExpressOptions
                                : ExpressDelivery
                            }
                          />

                          {/* <FMDropdown
                            style={{ width: "10rem" }}
                            className="mb-2"
                            placeholder="Select Time Slot"
                            optionFilterProp="children"
                            onChange={onExpressDeliveryChange}
                            options={
                              selectTodayDate
                                ? filterExpressOptions
                                : ExpressDelivery
                            }
                          />{" "} */}
                        </>
                      ) : (
                        <></>
                      )}
                    </Col>
                  </Row>
                ) : (
                  <></>
                )}

                {/* cart and buy btns */}

                <Box sx={{ marginTop: "50px" }}>
                  <FMButton
                    disabled={disabledDate}
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
                    // onClick={tempSub}
                    onClick={handleSubmit(onSubmit)}
                  />
                  <Link to={"/add-to-cart"}>
                    <FMButton
                      disabled={disabledDate}
                      displayText={"Buy Now"}
                      variant={"contained"}
                      styleData={{
                        ...commonStyle.buttonStyles,
                        width: "215px",
                      }}
                    />
                  </Link>
                  <input type={"submit"} hidden />
                </Box>


                {/* prod desc */}
                <Box sx={{ marginTop: "50px" }}>
                  <FMTypography
                    displayText={"Product Description"}
                    styleData={{ fontSize: "20px", fontWeight: "500" }}
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "300",
                      color: "#717171",
                    }}
                  >
                    {productDetailedData?.description}
                  </p>
                </Box>
                <Box sx={{ marginTop: "50px", marginBottom: "50px" }}>
                  <FMTypography
                    displayText={"Product Specifications"}
                    styleData={{ fontSize: "20px", fontWeight: "500" }}
                  />
                  <p
                    style={{
                      fontSize: "16px",
                      fontWeight: "300",
                      color: "#717171",
                    }}
                  >
                    {productDetailedData?.specifications}
                  </p>
                </Box>

                {/* reviews scrolls */}

                {/* right box end below */}
              </Col>
            </Row>
          </Grid>
        </Container>

        {/*review col start */}
        {/* <Grid sx={{ padding: "50px 100px" }}>
        <Box>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ display: "flex" }}>
              <img
                src={reviewBlackStar}
                alt="star"
                style={{ paddingBottom: "19px" }}
              />
              <FMTypography
                displayText={Math.round(productDetailedData?.rating * 10) / 10}
                styleData={{ fontSize: "20px", paddingTop: "6px" }}
              />
              <FMButton
                displayText={`${productDetailedData?.numReviews} Reviews `}
                variant={"outlined"}
                styleData={{
                  textDecoration: "underline",
                  fontWeight: "500",
                  textTransform: "capitalize",
                  color: "#222222",
                  border: "none",
                  fontSize: "20px",
                  marginBottom: "1rem",
                  "&:hover": {
                    border: "none",
                    backgroundColor: "white",
                    textDecoration: "underline",
                  },
                }}
              />
            </Box>
            <Box>
              <FMButton
                displayText={"Rate Product"}
                variant="outlined"
                styleData={{
                  border: "1px solid #E6E6E6",
                  borderRadius: "10px",
                  textTransform: "capitalize",
                  color: "black",
                  fontWeight: "600",

                  "&:hover": {
                    backgroundColor: "white",
                    border: "1px solid #E6E6E6",
                  },
                }}
                onClick={reviewNavHandler}
              />
            </Box>
          </Box>

          {reviewsCarouselData && (
            <Carousel
              showDots={false}
              deviceType={responsive.deviceType}
              // arrows={false}
              // autoPlay={responsive.deviceType !== "mobile" ? true : false}
              ssr
              slidesToSlide={1}
              containerClass="carousel-with-custom-dots"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              responsive={responsive}
              partialVisible
              infinite
              // customDot={<CustomDot />}
            >
              {reviewsCarouselData?.map((elem) => (
                <Box
                  style={{
                    paddingBottom: "1rem",
                  }}
                >
                  <Box
                    sx={{
                      border: "1px solid #E6E6E6",
                      borderRadius: "20px",
                      width: "100%",
                      padding: "24px",
                    }}
                  >
                    <Stack
                      direction="row"
                      spacing={2}
                      sx={{ margin: " 0 12px" }}
                    >
                      <Avatar src="/broken-image.jpg" />
                    </Stack>
                    <Box>
                      <FMTypography displayText={elem?.name} />
                      <Box sx={{ display: "flex" }}>
                        <FMTypography
                          displayText={moment(elem?.createdAt).format(
                            "DD.MM.YYYY"
                          )}
                        />
                        <Box
                          sx={{
                            backgroundColor: "#008539",
                            display: "flex",
                            padding: ".3rem .5rem",
                            width: "auto",
                            marginLeft: "1rem",
                            borderRadius: "4px",
                          }}
                        >
                          <img
                            src={ratingStart}
                            alt="rating-star"
                            style={{ width: "14px" }}
                          />
                          <FMTypography
                            displayText={
                              Math.round(productDetailedData?.rating * 10) / 10
                            }
                            styleData={{ color: "#FFFFFF", fontSize: "12px" }}
                          />
                        </Box>
                      </Box>
                    </Box>

                    <p style={{ marginTop: "15px" }}>{elem?.comment}</p>
                  </Box>
                </Box>
              ))}
            </Carousel>
          )}
        </Box>
      </Grid> */}
        <Grid sx={{ padding: "0 100px" }}>
          <Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Box sx={{ display: "flex" }}>
                <img
                  src={reviewBlackStar}
                  alt="star"
                  style={{ paddingBottom: "19px" }}
                />
                <FMTypography
                  displayText={
                    Math.round(productDetailedData?.rating * 10) / 10
                  }
                  styleData={{ fontSize: "20px", paddingTop: "6px" }}
                />
                <FMButton
                  displayText={`${productDetailedData?.numReviews} Reviews `}
                  variant={"outlined"}
                  styleData={{
                    textDecoration: "underline",
                    fontWeight: "500",
                    textTransform: "capitalize",
                    color: "#222222",
                    border: "none",
                    fontSize: "20px",
                    marginBottom: "1rem",
                    "&:hover": {
                      border: "none",
                      backgroundColor: "white",
                      textDecoration: "underline",
                    },
                  }}
                />
              </Box>
              <Box>
                <FMButton
                  displayText={"Rate Product"}
                  variant="outlined"
                  styleData={{
                    border: "1px solid #E6E6E6",
                    borderRadius: "10px",
                    textTransform: "capitalize",
                    color: "black",
                    fontWeight: "600",

                    "&:hover": {
                      backgroundColor: "white",
                      border: "1px solid #E6E6E6",
                    },
                  }}
                  onClick={reviewNavHandler}
                />
              </Box>
            </Box>

            {reviewsCarouselData && (
              <Carousel
                showDots={false}
                deviceType={responsive.deviceType}
                // arrows={false}
                autoPlay={responsive.deviceType !== "mobile" ? true : false}
                ssr
                slidesToSlide={1}
                containerClass="carousel-with-custom-dots"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                responsive={responsive}
                partialVisible
                infinite
              // customDot={<CustomDot />}
              >
                {reviewsCarouselData?.map((elem) => (
                  <Box style={{ paddingBottom: "1rem" }}>
                    <Box
                      sx={{
                        display: "flex",
                        border: "1px solid #E6E6E6",
                        // margin: "0 1rem",
                        borderRadius: "20px",
                        width: "283px",
                        padding: "24px",
                      }}
                    >
                      <Stack
                        direction="row"
                        spacing={2}
                        sx={{ margin: " 0 12px" }}
                      >
                        <Avatar src="/broken-image.jpg" />
                      </Stack>
                      <Box>
                        <FMTypography displayText={elem?.name} />
                        <Box sx={{ display: "flex" }}>
                          <FMTypography
                            displayText={moment(elem?.createdAt).format(
                              "DD.MM.YYYY"
                            )}
                          />
                          <Box
                            sx={{
                              backgroundColor: "#008539",
                              display: "flex",
                              padding: ".3rem .5rem",
                              width: "auto",
                              marginLeft: "1rem",
                              borderRadius: "4px",
                            }}
                          >
                            <img
                              src={ratingStart}
                              alt="rating-star"
                              style={{ width: "14px" }}
                            />
                            <FMTypography
                              displayText={
                                Math.round(productDetailedData?.rating * 10) /
                                10
                              }
                              styleData={{ color: "#FFFFFF", fontSize: "12px" }}
                            />
                          </Box>
                        </Box>

                        <p style={{ marginTop: "15px" }}>{elem?.comment}</p>
                      </Box>
                    </Box>
                  </Box>
                ))}
              </Carousel>
            )}
          </Box>
        </Grid>
        {/* moere suggestions */}
        <Grid sx={{ padding: "80px 0" }}>
          <FMTypography
            displayText={"You may also Like"}
            styleData={{
              textAlign: "center",
              fontWeight: "600",
              fontSize: "40px",
            }}
          />
          {similarProductDetailedData && (
            <Carousel
              showDots={false}
              deviceType={responsive.deviceType}
              // arrows={false}
              autoPlay={responsive.deviceType !== "mobile" ? true : false}
              ssr
              slidesToSlide={1}
              containerClass="carousel-with-custom-dots"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              responsive={responsive}
              partialVisible
              infinite
            // customDot={<CustomDot />}
            >
              {similarProductDetailedData?.map((elem) => (
                <Grid
                  sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    flexBasis: "33.333333%",
                    justifyContent: "space-evenly",
                    padding: "0px 0px 10px 0px",
                  }}
                >
                  <Box
                    onClick={() => onCardClick(elem?._id)}
                  >
                    <Box
                      sx={{
                        backgroundColor: "#008539",
                        display: "flex",
                        padding: ".5rem",
                        width: "fit-content",
                        position: "relative",
                        top: "3.1rem",
                        left: "14rem",
                        zIndex: "111",
                        borderRadius: "4px",
                      }}
                    >
                      <img
                        src={ratingStart}
                        alt="rating-star"
                        style={{ width: "14px" }}
                      />
                      <FMTypography
                        displayText={Math.round(elem?.rating * 10) / 10}
                        styleData={{ color: "#FFFFFF", fontSize: "12px" }}
                      />
                    </Box>
                    <Card sx={{ width: "283px", borderRadius: "20px" }}>
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          height="283"
                          width="283"
                          image={elem?.productPictures[0]?.img}
                          alt="green iguana"
                        />
                        <CardContent>
                          <Typography
                            gutterBottom
                            variant="h5"
                            component="div"
                            sx={{ fontSize: "18px", color: "#222222", textTransform: 'capitalize' }}
                          >
                            {elem?.name}
                          </Typography>
                          <span style={{ display: "flex" }}>
                            <del style={{ fontSize: "14px", color: "#717171" }}>
                              ₹ {elem?.actualPrice}
                            </del>
                            <Typography
                              sx={{
                                fontSize: "14px",
                                color: "#000000",
                                marginLeft: ".5rem",
                              }}
                            >
                              ₹ {elem?.discountPrice}
                            </Typography>
                          </span>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <Typography
                              variant="body2"
                              sx={{ color: "#717171", textTransform: 'capitalize' }}
                            >
                              {elem?.deliveryDay}
                            </Typography>
                            <Typography
                              variant="body2"
                              sx={{ color: "#008539" }}
                            >
                              Reviews {elem?.numReviews}
                            </Typography>
                          </Box>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Box>
                </Grid>
              ))}
            </Carousel>
          )}
        </Grid>
        <Footer />
      </Layout>
    </>
  );
};

export default ProductDetail;
