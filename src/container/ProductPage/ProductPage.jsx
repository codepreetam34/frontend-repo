import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import ratingStart from "../../assets/ratingStart.svg";
import Header from "components/SearchBar/Header";
import {
  getProductByCategoryId,
  getProductsList,
} from "Redux/Slices/ProductPage/ProductsPageSlice";
import { useDispatch, useSelector } from "react-redux";
import FMFilter from "components/FMFilters/FMFilter";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "components/Footer/Footer";

const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true); // Start loading
    dispatch(getProductByCategoryId(params)).then(() => {
      setLoading(false); // Stop loading after API call finishes
    });
  }, [dispatch]);

  const productPageData = useSelector(
    (state) => state?.getProductsList?.getProductsListByCategoryId?.products
  );
  const pageTitle = useSelector(
    (state) => state?.getProductsList?.getProductsListByCategoryId?.pageTitle
  );
  const onCardClick = (element) => {
    let pId = element?._id;
    navigate(`/product-detail/${pId}`);
  };

  return (
    <>
      <Header />
      <Grid sx={{ padding: "0 100px" }}>
        <Box sx={{ display: "flex" }}>
          <FMTypography
            displayText={`${pageTitle} Products`}
            styleData={{
              fontWeight: "500",
              fontSize: "40px",
              textTransform: "capitalize",
            }}
          />
          <Box
            sx={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}
          >
            <FMTypography
              displayText={`(${productPageData?.length} Products)`}
              styleData={{
                fontWeight: "300",
                fontSize: "20px",
                lineHeight: "30px",
                color: "#717171",
              }}
            />
          </Box>
        </Box>
        <Box>
          <FMFilter />
        </Box>

        {/* product box below */}
        <Grid
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexBasis: "33.333333%",
            justifyContent: "space-evenly",
            gap: "1rem",
            padding: "3rem 0",
          }}
        >
          {" "}
          {loading ? (
            // Display a loader while API calls are in progress
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
          ) : productPageData && productPageData.length > 0 ? (
            productPageData?.map((elem) => (
              <Box
                onClick={() => onCardClick(elem)}
                style={{ position: "relative" }}
              >
                <Box
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
                    <CardContent style={{ height: "7rem" }}>
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
            ))
          ) : (
            <Box>
              <Card
                sx={{
                  width: "260px",
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
                    No data available !
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          )}
          {/* prodct box ended */}
        </Grid>
      </Grid>{" "}
      <Footer />
    </>
  );
};

export default ProductPage;
