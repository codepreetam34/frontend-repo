import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  useMediaQuery
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import FMTypography from "../../components/FMTypography/FMTypography";
import ratingStart from "../../assets/ratingStart.svg";
import Header from "../../components/SearchBar/Header";
import { getProductByCategoryId } from "../../Redux/Slices/ProductPage/ProductsPageSlice";
import { useDispatch } from "react-redux";
import FMFilter from "../../components/FMFilters/FMFilter";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../../components/Footer/Footer";

const useStyles = makeStyles((theme) => ({
  root: {
    overflow: "hidden",
  },
  cardContainer: {
    width: "283px",
    borderRadius: "20px",
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
    left: "87%",
    zIndex: "111",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      left: "74%",
      top: "4%",
      width: "35px",
      height: "25px",
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

  textLimitTitle: {
    fontSize: "14px",
    color: "#222222",
    fontWeight: "500",
    textTransform: "capitalize",
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
  textLimitContent: {
    fontSize: "14px",
    color: "#000000",
    marginLeft: ".5rem",
    fontWeight: "600",
  },
  padding100px: {
    padding: "0 80px",
    transition:
      "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
    marginTop: "20px",
    [theme.breakpoints.down("sm")]: {
      padding: "0 20px 20px",
      marginTop: "10px",
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
      padding:'1rem 0 0 0',
      justifyContent: "center",
    },

  },
  boxContainer: {
    display: "flex",
    alignItems: "center",
    marginLeft: "10px",
  },
}));

const CategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState();
  const pincodeData = sessionStorage.getItem("pincode");
  const [pageTitle, setPageTitle] = useState();
  const classes = useStyles();
  const textRef = useRef(null);
  const isMobile = useMediaQuery("(max-width:600px)");
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

  const onCardClick = (id) => {
    navigate(`/product-detail/${id}`);
  };

  useEffect(() => {
    if (params.id) {
      const payload = {
        id: params.id,
        pincodeData: pincodeData,
      };
      setIsLoading(true);
      dispatch(getProductByCategoryId(payload))
        .then((response) => {
          setIsLoading(false);
          setDisplayedProducts(response?.payload?.products);
          setPageTitle(response?.payload?.pageTitle);
        })
        .catch((error) => {
          setIsLoading(false);
        });
    }
  }, [dispatch, params.id]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>
      <Header />

      <Grid className={classes.padding100px}>
        {pageTitle && (
          <Box
            sx={{
              display: "flex",
              alignItems:"center",
              transition:
                "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
                marginBottom: isMobile ? "10px" : '1rem'
            }}
          >
            <FMTypography
              displayText={pageTitle ? `${pageTitle} Products` : `No Products`}
              styleData={{
                fontWeight: "600",
                fontSize: isMobile ? "14px" : "2rem",
                textTransform: "capitalize",
              }}
            />

            <Box className={classes.boxContainer}>
              <FMTypography
                displayText={
                  displayedProducts && `| ${displayedProducts?.length} Products`
                }
                styleData={{
                  fontWeight: "300",
                  fontSize: isMobile ? "14px":"2rem",
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
            pageInfo={"categoryPage"}
            pincodeData={pincodeData}
            sendCategoryId={params.id}
            setIsLoading={setIsLoading}
            setDisplayedProducts={setDisplayedProducts}
          />
        </Box>
        <Grid className={classes.productList} container spacing={2}>
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
          ) : displayedProducts && displayedProducts?.length > 0 ? (
            displayedProducts?.map((elem, index) => (
              <Grid key={index} item xs={6} sm={4} md={3}>
                <Box
                  key={index}
                  onClick={() => onCardClick(elem._id)}
                  style={{ position: "relative" }}
                >
                  <Box className={classes.rightInfoBox}>
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
                      width: isMobile ? "160px" : "283px", // Adjusted width
                      borderRadius: "20px",
                      height: "auto",
                    }}
                  >
                    <CardActionArea>
                      <CardMedia
                        component="img"
                        height={isMobile ? "150px" : "283px"} // Adjusted height
                        width={isMobile ? "160px" : "283px"} // Adjusted width
                        image={elem?.productPictures[0]?.img}
                        alt="Product Image"
                      />
                      <CardContent>
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="div"
                          ref={textRef}
                          sx={{
                            fontSize: isMobile ? "14px" : "18px",
                            color: "#222222",
                            fontWeight: "500",
                            textTransform: "capitalize",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "-webkit-box",
                            "-webkit-line-clamp": 2,
                            "-webkit-box-orient": "vertical",
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
                            style={{
                              color: "#717171",
                              fontWeight: "300",
                              fontSize: isMobile ? "12px" : "0.875rem",
                              textTransform: "capitalize",
                            }}
                          >
                            {elem?.deliveryDay}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "#008539", fontWeight: "400", fontSize: isMobile ? "12px" : "0.875rem", }}
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
                sx={{ width: "283px", borderRadius: "20px", height: "auto" }}
              >
                <CardContent style={{ height: "4rem", textAlign: "center" }}>
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ fontSize: "18px", color: "#801317" }}
                  >
                    No data available!
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

export default CategoryPage;
