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
import { addToCartProductsFinal } from "../../Redux/Slices/AddToCart/AddToCartSlice";
import Footer from "../../components/Footer/Footer";
import Layout from "../../components/Layout";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import FMDeliveryDropdown from "../../components/FMDeliveryDropdown";
import { notify } from "components/FMToaster/FMToaster";
import PincodeInputWrapper from "./PincodeInputWrapper";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { pId } = params;
  const [productQuantity, setProductQuantity] = useState(createUserOptions);
  const [eggOrNot, setEggOrNot] = useState(egglessOrNot);
  const [pincodeData, setPincodeData] = useState(sessionStorage.getItem("pincode"));
  const [disabledDate, setDisabledDate] = useState(true);
  const [standardActive, setStandardActive] = useState(false);
  const [fixedActive, setFixedActive] = useState(false);
  const [midNightActive, setMidNightActive] = useState(false);
  const todaysDate = moment(new Date()).format("DDMMYY");
  const [date, setDate] = useState(null);
  const [isTodaysDate, setIsTodaysDate] = useState(true);

  useEffect(() => {
    setIsTodaysDate(() => date && date.format && date.format("DDMMYY") === todaysDate);
  }, [date]);

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
          dispatch(addToCartProductsFinal());
        }
      });
    }
  };
  const handleBuyNow = async (data) => {
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
        if (res?.payload?.error?.response?.status === 400 || res?.payload?.error?.response?.status === 500) {
          notify({ type: "error", content: `Failed to add items: ${res?.payload?.error?.response?.data?.message}` });
        } else {
          dispatch(addToCartProductsFinal())
          notify({ type: "success", content: `Items added successfully to cart` });
          navigate(`/add-to-cart`);
        }
      });
    }
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
  const onDateChange = (date) => {
    setDate(date);
    const newdate = new Date();
    const curTime = newdate.getHours();
    const formatDate = (date) => {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const formattedDay = day < 10 ? "0" + day : day;
      const formattedMonth = month < 10 ? "0" + month : month;
      const year = date.getFullYear();
      return `${formattedDay}/${formattedMonth}/${year}`;
    };
    const todayDate = formatDate(newdate);
    let currentDate;
    if (date) {
      const selectedDate = new Date(date);
      currentDate = formatDate(selectedDate);
    }

    const newFixedArray = FixedDelivery.filter(el => el.value > curTime + 1);
    const newExpressArray = ExpressDelivery.filter(el => el.value > curTime + 1);
    const newStandardArray = StandardDelivery.filter(el => el.value >= curTime);

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

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

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
                      style={{ width: "14px", }}
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
                      marginLeft: '6px',
                      lineHeight: "0.3px",
                      textTransform: "capitalize",
                      color: "#717171",
                      border: "none",
                      fontSize: "18px",
                      "&:hover": {
                        border: "none",
                        color: "#fff",
                        backgroundColor: "#801317",
                        textDecoration: "none",
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
                <Box sx={{ marginTop: "1rem", display: "flex", gap: "10px" }}>

                  <PincodeInputWrapper setDisabledDate={setDisabledDate} setPincodeData={setPincodeData} pincodeData={pincodeData} />

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
                          <div className="mt-3 mb-2">
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
                          <div className="mt-3 mb-2">
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
                          <div className="mt-3 mb-2">
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

                  <FMButton
                    disabled={disabledDate}
                    displayText={"Buy Now"}
                    variant={"contained"}
                    styleData={{
                      ...commonStyle.buttonStyles,
                      width: "215px",
                    }}
                    onClick={handleBuyNow}
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
                  styleData={{ fontSize: "20px", paddingTop: "6px", paddingRight: "6px" }}
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
                      color: "#fff",
                      backgroundColor: "#801317",
                      textDecoration: "none",
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
