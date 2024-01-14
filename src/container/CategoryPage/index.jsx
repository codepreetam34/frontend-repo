import React, { useEffect, useState, useRef } from "react";
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
import FMTypography from "../../components/FMTypography/FMTypography";
import ratingStart from "../../assets/ratingStart.svg";
import Header from "../../components/SearchBar/Header";
import {
  getProductByCategoryId,
  getProductByCategoryIdAndTags,
} from "../../Redux/Slices/ProductPage/ProductsPageSlice";
import { useDispatch, useSelector } from "react-redux";
import FMFilter from "../../components/FMFilters/FMFilter";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Footer from "../../components/Footer/Footer";
import "./CategoryPage.css";
import FMButton from "components/FMButton/FMButton";

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
    "&::-webkit-scrollbar": {
      display: "none",
    },
    height: "100%",
  },

  textLimit: {
    overflow: "hidden",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    display: "-webkit-box",
    "-webkit-line-clamp": 2,
    "-webkit-box-orient": "vertical",
  },
}));

const CategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [displayedProducts, setDisplayedProducts] = useState();
  const [sortingValue, setSortingValue] = useState("Sort By");
  const pincodeData = sessionStorage.getItem("pincode");
  const [pageTitle, setPageTitle] = useState();
  const [activeTag, setActiveTag] = useState("");

  // useEffect(() => {
  //   setActiveTag(tagName);
  // }, [tagName]);

  const classes = useStyles();
  const textRef = useRef(null);

  const TagOptions = [
    "Best Sellers",
    "Birthday Cakes",
    "Anniversary Cakes",
    "Same Day Delivery",
  ];

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

  const tagOptionsChangeHandler = (tag) => {
    setIsLoading(true);
    const payload = {
      tagName: tag,
      categoryId: params.id,
      pincodeData,
      sort: sortingValue,
    };
    dispatch(getProductByCategoryIdAndTags(payload))
      .then((response) => {
        const updatedActiveTag = response?.payload?.tagName;
        setActiveTag(updatedActiveTag);
        setPageTitle(response?.payload?.pageTitle);
        setDisplayedProducts(response?.payload?.products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

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
        className="pageGrid"
      >
        {pageTitle && (
          <Box
            sx={{
              display: "flex",
              transition:
                "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",
            }}
          >
            <Box
              sx={{ display: "flex", alignItems: "center", marginLeft: "1rem" }}
            >
              <FMTypography
                displayText={
                  pageTitle ? `${pageTitle} Products` : `No Products`
                }
                styleData={{
                  fontWeight: "500",
                  fontSize: "40px",
                  textTransform: "capitalize",
                }}
                className="categoryTitle"
              />

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
            pageInfo={"categoryPage"}
            pincodeData={pincodeData}
            sendCategoryId={params.id}
            setIsLoading={setIsLoading}
            setDisplayedProducts={setDisplayedProducts}
          />
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              marginTop: "20px",
              flexWrap: "wrap",
              justifyContent: "center",
            }}
          >
            {TagOptions &&
              TagOptions?.map((tag) => {
                return (
                  <FMButton
                    key={tag}
                    onClick={() => tagOptionsChangeHandler(tag)}
                    displayText={tag}
                    variant={"outlined"}
                    styleData={{
                      fontWeight: "600",
                      color: "#801317",
                      marginRight: "10px",
                      background:
                        activeTag != "" && activeTag == tag
                          ? "#f8d7da"
                          : "transparent",
                      borderRadius: "19px",
                    }}
                    btnClass={"btnsClass"}
                  />
                );
              })}
          </div>
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
          ) : displayedProducts && displayedProducts?.length > 0 ? (
            displayedProducts?.map((elem, index) => (
              <Box
                key={index}
                onClick={() => onCardClick(elem._id)}
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
                    styleData={{
                      color: "#FFFFFF",
                      fontSize: "12px",
                      fontWeight: "600",
                    }}
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
                        ref={textRef}
                        className={`${classes.textLimit}`}
                        sx={{
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

export default CategoryPage;
