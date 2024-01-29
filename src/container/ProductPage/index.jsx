import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography, useMediaQuery
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FMTypography from "../../components/FMTypography/FMTypography";
import ratingStart from "../../assets/ratingStart.svg";
import Header from "../../components/SearchBar/Header";
import { getProductByCategoryIdAndTags } from "../../Redux/Slices/ProductPage/ProductsPageSlice";
import { useDispatch, useSelector } from "react-redux";
import FMFilter from "../../components/FMFilters/FMFilter";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },

  customScrollColumn: {
    overflowY: "scroll",
    scrollbarWidth: "thin",
    "&::-webkit-scrollbar": {
      width: "0.4rem",
    },
    "&::-webkit-scrollbar-thumb": {
      backgroundColor: "transparent",
    },
    "&::-webkit-scrollbar-track": {
      display: "none",
    },
  },

  rightInfoBox: {
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
    [theme.breakpoints.down("sm")]: {
      left: "72%",
      top: "5%",
    },
  },

  textLimit: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  padding80px: {
    padding: "0 80px",
    transition:
      "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
    marginTop: "40px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 20px",
    },
  },
  productList: {
    display: "flex",
    flexWrap: "wrap",
    flexBasis: "33.333333%",
    justifyContent: "space-evenly",
    gap: "2rem",
    padding: "3rem 0",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      gap: '0px',
      justifyContent: "start",
    },

  },
}));
const ProductPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [displayedProducts, setDisplayedProducts] = useState();
  const [pageTitle, setPageTitle] = useState();
  const classes = useStyles();
  const textRef = useRef(null);
  const { categoryId, pincodeData, tagName } = useParams();
  const isMobile = useMediaQuery("(max-width:600px)");
  const payload = {
    categoryId,
    pincodeData,
    tagName,
  };

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

  const onCardClick = (element) => {
    let pId = element?._id;
    navigate(`/product-detail/${pId}`);
  };

  useEffect(() => {
    setIsLoading(true);
    dispatch(getProductByCategoryIdAndTags(payload))
      .then((response) => {
        setIsLoading(false);
        setPageTitle(response?.payload?.pageTitle);
        setDisplayedProducts(response?.payload?.products);
      })
      .catch((error) => {
        setIsLoading(false);
        console.error("Error fetching data:", error);
      });
    setIsLoading(false);
  }, [dispatch]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Header />
      <Grid className={classes.padding80px}>
        {pageTitle && (
          <Box
            sx={{
              display: "flex",
              transition:
                "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
            }}
          >
            <FMTypography
              displayText={pageTitle ? `${pageTitle} Products` : `No Products`}
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
                displayText={
                  displayedProducts && `| ${displayedProducts?.length} Products`
                }
                styleData={{
                  fontWeight: "300",
                  fontSize: "20px",
                  lineHeight: "30px",
                  color: "#717171",
                }}
              />
            </Box>
          </Box>
        )}

        <Box>
          <FMFilter
            setPageTitle={setPageTitle}
            pincodeData={payload?.pincodeData}
            tagName={payload?.tagName}
            sendCategoryId={payload?.categoryId}
            pageInfo={"productPage"}
            setIsLoading={setIsLoading}
            setDisplayedProducts={setDisplayedProducts}
          />
        </Box>

        <Grid
          className={classes.productList} container spacing={2}
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
          ) : displayedProducts && displayedProducts.length > 0 ? (
            displayedProducts?.map((elem, index) => (
              <Grid key={index} item xs={6} sm={4} md={3}>
                <Box
                  key={index}
                  onClick={() => onCardClick(elem)}
                  style={{ position: "relative" }}
                >
                  <Box
                    className={classes.rightInfoBox}>

                    <img
                      src={ratingStart}
                      alt="rating-star"
                      style={{ width: "14px" }}
                    />
                    <FMTypography
                      displayText={Math.round(elem?.rating * 10) / 10}
                      styleData={{
                        color: "#FFFFFF",
                        fontSize: "12px",
                        fontWeight: "600",
                      }}
                    />
                  </Box>
                  <Card
                    sx={{
                      width: isMobile ? "180px" : "283px", // Adjusted width
                      borderRadius: "20px",
                      height: "auto",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={isMobile ? "180px" : "283px"} // Adjusted height
                        width={isMobile ? "180px" : "283px"} // Adjusted width
                        image={elem?.productPictures[0]?.img}
                        alt="Product Image"
                      />
                      <CardContent>
                        <Typography
                          ref={textRef}
                          className={`${classes.textLimit}`}
                          gutterBottom
                          variant="h5"
                          component="div"
                          sx={{
                            marginBottom: "0",
                            fontSize: "18px",
                            color: "#222222",
                            fontWeight: "500",
                            textTransform: "capitalize",
                          }}
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
                              fontWeight: "600",
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
                            sx={{
                              color: "#717171",
                              fontWeight: "300",
                              textTransform: "capitalize",
                              padding: "2px 0",
                            }}
                          >
                            {elem?.deliveryDay}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#008539", fontWeight: "400" }}
                          >
                            Reviews {elem?.numReviews}
                          </Typography>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Box>
              </Grid>
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
        </Grid>
      </Grid>
      <Footer />
    </>
  );
};

export default ProductPage;
