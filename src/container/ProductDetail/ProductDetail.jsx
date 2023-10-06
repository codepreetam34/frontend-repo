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
import dayjs from "dayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import "react-image-gallery/styles/css/image-gallery.css";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import moment from "moment";

import Header from "components/SearchBar/Header";
import FMTypography from "components/FMTypography/FMTypography";
import FMButton from "components/FMButton/FMButton";
import FMRadioButtons from "components/FMRadioButton/FMRadioButton";
import FMDropdown from "components/FMDropdown/FMDropdown";

import ratingStart from "../../assets/ratingStart.svg";
import reviewBlackStar from "../../assets/reviewBlackStar.svg";

import {
  createUserOptions,
  egglessOrNot,
  ExpressDelivery,
  FixedDelivery,
  StandardDelivery,
} from "constants/AppConstant";
import { BLACK } from "constants/colors";
import "./ProductDetail.css";
import { commonStyle } from "Styles/commonStyles";
import {
  addToCart,
  getProductsDetail,
} from "Redux/Slices/ProductDetailPage/ProductDetailPageSlice";
import { addToCartSchema } from "validationSchema/addToCartSchema";
import { Col, Container, Row } from "react-bootstrap";
import { ADD_TO_CART } from "Routes/Routes";
import { addToCartProductsFinal } from "Redux/Slices/AddToCart/AddToCartSlice";

const ProductDetail = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const { pId } = params;

  const todaysDate = moment(new Date()).format("DDMMYY");

  const [productQuantity, setProductQuantity] = useState(createUserOptions);
  const [eggOrNot, setEggOrNot] = useState(egglessOrNot);
  const [pincodeData, setPincodeData] = useState("");
  const [disabledDate, setDisabledDate] = useState(true);
  const [standardActive, setStandardActive] = useState(false);
  const [fixedActive, setFixedActive] = useState(false);
  const [midNightActive, setMidNightActive] = useState(false);
  const [deliveryTime, setDeliveryTime] = useState();
  const [serviceId, setServiceId] = useState("");
  const [date, setDate] = useState(dayjs(Date()));

  const [isTodaysDate, setIsTodaysDate] = useState(true);

  useEffect(() => {
    setIsTodaysDate(() => date.format("DDMMYY") === todaysDate);
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
          navigate(`/add-to-cart`);
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
    // onServiceChange(e);
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
    setPincodeData(data);
    if (data?.pincode.length === 6) {
      setDisabledDate(false);
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

  return (
    <>
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
                  //   setPincodeData(data);
                  // }}
                  getData={getDataFunc}
                  showArea={pincodeData ? true : false}
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
                {/* <FMTypography
                styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                displayText={errors.pinCode?.message}
              /> */}
                <Box>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      // label="Date desktop"
                      // disabled={disabledDate}
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
                      marginLeft: "1rem",

                      ...(errors.cakeMessage && commonStyle.errorStyle),
                    }}
                    {...register("cakeMessage")}
                    error={errors.cakeMessage ? true : false}
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
                  {...register("cakeMessage")}
                  error={errors.cakeMessage ? true : false}
                >
                  <Box
                    sx={{
                      width: "132px",
                      height: "48px",
                      left: "843px",
                      top: "703px",
                      backgroundColor: isTodaysDate
                        ? "lightgray"
                        : standardActive
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
                    onClick={() => {
                      if (!isTodaysDate) {
                        setDeliveryTime(StandardDelivery);
                        setStandardActive(!standardActive);
                        setMidNightActive(false);
                        setFixedActive(false);
                      }
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
              </Box>
              {/* time dropdown */}
              <Box>
                <FMDropdown
                  options={deliveryTime}
                  dropdownvalue="label"
                  placeholder="Selecttime"
                  // onChange={serviceChangeHandler}
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

                  // value={serviceId}
                  // {...restServiceRegister}
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
                  // onClick={tempSub}
                  onClick={handleSubmit(onSubmit)}
                />
                <FMButton
                  displayText={"Buy Now"}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    width: "215px",
                  }}
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

              {/* reviews scrolls */}

              {/* right box end below */}
            </Col>
          </Row>
        </Grid>
      </Container>

      {/*review col start */}
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
                <Box>
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
                              Math.round(productDetailedData?.rating * 10) / 10
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
      <Grid sx={{ marginTop: "80px" }}>
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
                }}
              >
                <Box
                //  onClick={() => onCardClick(elem)}
                >
                  <Box
                    sx={{
                      backgroundColor: "#008539",
                      display: "flex",
                      padding: ".5rem",
                      width: "fit-content",
                      position: "relative",
                      top: "3.5rem",
                      left: "205px",
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
                          sx={{ fontSize: "18px", color: "#222222" }}
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
                          <Typography variant="body2" sx={{ color: "#717171" }}>
                            {elem?.deliveryDay}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#008539" }}>
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
    </>
  );
};

export default ProductDetail;
