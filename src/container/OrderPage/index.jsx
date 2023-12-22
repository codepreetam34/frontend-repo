import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import Header from "../../components/SearchBar/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../../components/Footer/Footer";
import FMTypography from "components/FMTypography/FMTypography";
import { getOrders } from "Redux/Slices/OrderSlice/Order";
import ratingStart from "../../assets/ratingStart.svg";

const useStyles = makeStyles((theme) => ({}));

const OrderPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const pincodeData = sessionStorage.getItem("pincode");
  const classes = useStyles();
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    if (element) {
      if (
        element.scrollHeight > element.clientHeight ||
        element.scrollWidth > element.clientWidth
      ) {
        element.classList.add("ellipsis"); // Add ellipsis class if overflow
      }
    }
  }, []);
  useEffect(() => {
    dispatch(getOrders());
  }, [dispatch]);

  const orderData = useSelector(
    (state) => state?.myOrders?.getOrderDetails?.orders
  );

  console.log("order data ", orderData);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Header />

      <Grid
        sx={{
          padding: "0 100px",
          transition:
            "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
          marginTop: "40px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            transition:
              "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
          }}
        >
          <FMTypography
            displayText={`Orders`}
            styleData={{
              fontWeight: "500",
              fontSize: "40px",
              textTransform: "capitalize",
              paddingBottom: "1rem",
            }}
          />

          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}
          >
            <FMTypography
              displayText={orderData && `| ${orderData?.length} Orders`}
              styleData={{
                fontWeight: "300",
                fontSize: "20px",
                lineHeight: "30px",
                color: "#717171",
              }}
            />
          </Box>
        </Box>

        <Grid
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexBasis: "33.333333%",
            justifyContent: "space-evenly",
            gap: "2rem",
            padding: "3rem 0",
          }}
        >
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "300px",
              }}
            >
              <CircularProgress color="primary" />
            </div>
          ) : orderData && orderData?.length > 0 ? (
            orderData?.map((elem, index) => (
              <Box
                key={index}
                //     onClick={() => onCardClick(elem._id)}
                style={{ position: "relative" }}
              >
                {/* <Box
                  sx={{
                    backgroundColor: "#008539",
                    top: "3%",
                    display: "flex",
                    alignItems: "center",
                    width: "40px",
                    height: "30px",
                    justifyContent: "center",
                    position: "absolute",
                    left: "83%",
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
                    //      displayText={Math.round(elem?.rating * 10) / 10}
                    styleData={{
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
                  />
                </Box> */}
                <Card sx={{ width: "283px", borderRadius: "20px" }}>
                  <CardActionArea>
                    <CardMedia
                      component="img"
                      height="283"
                      width="283"
                      image={
                        elem?.items[0]?.productId?.productPictures[0]?.img ||
                        "default_image_url"
                      }
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        ref={textRef}
                        className={`${classes.textLimit}`}
                        sx={{
                          fontSize: "18px",
                          color: "#222222",
                          fontWeight: "500",
                          textTransform: "capitalize",
                        }}
                      >
                        {elem?.items[0]?.productId?.name || "N/A"}
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <span style={{ display: "flex" }}>
                          <Typography
                            sx={{
                              fontSize: "14px",
                              color: "#000000",
                              fontWeight: "600",
                            }}
                          >
                            ₹ {elem?.items[0]?.payablePrice || "N/A"}
                          </Typography>
                        </span>
                        <Typography
                          variant="body2"
                          sx={{ color: "#801317", fontWeight: "400" }}
                        >
                          Qty {elem?.items[0]?.purchasedQty || "N/A"}
                        </Typography>
                      </Box>
                      <hr style={{ margin: "4px 0" }} />
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "12px",
                            color: "#717171",
                            fontWeight: "400",
                            textTransform: "capitalize",
                          }}
                        >
                          Payment Status{" "}
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.paymentStatus || "N/A"}
                          </span>
                        </Typography>

                        <Typography
                          variant="body2"
                          sx={{
                            fontSize: "12px",
                            color: "#717171",
                            fontWeight: "400",
                            textAlign: "end",
                            textTransform: "capitalize",
                          }}
                        >
                          Order Status{" "}
                          <span
                            style={{
                              fontSize: "14px",
                              color: "#008539",
                              fontWeight: "500",
                              textTransform: "capitalize",
                            }}
                          >
                            {" "}
                            {elem?.orderStatus.find((ele) => ele.isCompleted)
                              ?.type || "N/A"}
                          </span>
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Box>
            ))
          ) : (
            <Box>
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
                    No orders available!
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default OrderPage;
