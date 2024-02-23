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
import FMSort from "components/FMFilters/FMSort";
import FMBoth from "components/FMFilters/FMBoth";

const useStyles = makeStyles((theme) => ({
  rightInfoBox: {
    backgroundColor: "#008539",
    top: "3%",
    display: "flex",
    alignItems: "center",
    width: "40px",
    height: "30px",
    justifyContent: "center",
    position: "absolute",
    left: "76%",
    zIndex: "111",
    borderRadius: "10px",
    [theme.breakpoints.down("sm")]: {
      left: "74%",
      top: "4%",
      width: "35px",
      height: "25px",
    },
  },


  leftColumn: {
    flex: "0 0 280px",
    height: "100vh",
    maxWidth: "400px",
    overflowY: "hidden",
    position: "sticky",
    top: 0,
    zIndex: 1,
  },
  rightColumn: {
    flex: "1",
    overflowY: "auto",
    padding: "10px",
  },
  productList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0",

    [theme.breakpoints.down("sm")]: {

      justifyContent: "center",
    },
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

  const onCardClick = (id) => {
    navigate(`/product-detail/${id}`);
  };


  return (
    <>
      <Header />

      <Grid container>

        {/* Left column - fixed */}

        <aside item className={`${classes.leftColumn} d-none  d-md-block`}>
          <Box style={{
            background: "#fff", margin: '20px 1rem',
            padding: '1rem', borderRadius: "4px",
            boxShadow: "0px 3px 6px 0 rgb(212 212 212 / 35%)", height: "77vh"
          }}>
            <div role="heading" style={{
              display: "flex",
              alignItems: "center",
              marginRight: "10px",
              justifyContent: "space-between"
            }}><span style={{
              padding: "15px",
              fontSize: "1rem",
              fontFamily: "Poppins",
              fontWeight: "600"
            }}>Filters</span></div>
            <div style={{
              padding: "5px 0px",
              borderTop: "1px solid #E2E2E2", boxShadow: "none"
            }}></div>
            <FMFilter
              setPageTitle={setPageTitle}
              pageInfo={"categoryPage"}
              pincodeData={pincodeData}
              sendCategoryId={params.id}
              setIsLoading={setIsLoading}
              setDisplayedProducts={setDisplayedProducts}
            />
          </Box>
        </aside>

        <div className="d-md-none">
          <Box style={{
            background: "#fff", margin: '1rem 1rem',
            padding: '1rem 1rem', borderRadius: "4px",
            boxShadow: "0px 3px 6px 0 rgb(212 212 212 / 35%)",
          }}>

            {pageTitle && (
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  transition:
                    "color 0.5s cubic-bezier(0.645, 0.045, 0.355, 1), background 0.5s cubic-bezier(0.645, 0.045, 0.355, 1)",

                }}
              >
                <FMTypography
                  displayText={pageTitle ? `${pageTitle} Products` : `No Products`}
                  styleData={{
                    fontWeight: "600",
                    fontSize: isMobile ? "14px" : "1rem",
                    textTransform: "capitalize",
                  }}
                />
                &nbsp;
                <Box className={classes.boxContainer}>
                  <FMTypography
                    displayText={
                      displayedProducts && `| ${displayedProducts?.length} Products`
                    }
                    styleData={{
                      fontWeight: "300",
                      fontSize: isMobile ? "14px" : "1rem",
                      lineHeight: "30px",
                      color: "#717171",
                    }}
                  />
                </Box>
              </Box>
            )}
          </Box>

          <Box style={{
            background: "#fff", margin: '1rem 1rem',
            padding: '0 1rem 1rem', borderRadius: "4px",
            boxShadow: "0px 3px 6px 0 rgb(212 212 212 / 35%)",
          }}>

            <Box>
              <div role="heading" style={{
                display: "flex",
                alignItems: "center",
                marginRight: "10px",
                justifyContent: "space-between"
              }}><span style={{
                padding: "15px",
                fontSize: "18px",
                fontFamily: "Poppins",
                fontWeight: "600"
              }}>Filters</span></div>
              <div style={{
                padding: "5px 0px",
                borderTop: "2px solid #E2E2E2", boxShadow: "none"
              }}></div>
              <FMBoth
                setPageTitle={setPageTitle}
                pageInfo={"categoryPage"}
                pincodeData={pincodeData}
                sendCategoryId={params.id}
                setIsLoading={setIsLoading}
                setDisplayedProducts={setDisplayedProducts}
              />
            </Box>
          </Box>

        </div>

        {/* Right column - scrollable */}

        <Grid item className={classes.rightColumn}>

          <Box>
            <div className="d-none d-md-block" style={{ paddingRight: "1rem" }}>
              {pageTitle && (
                <Box style={{
                  display: 'flex', justifyContent: "space-between", padding: "1rem",
                  alignItems: 'center', background: "#fff", marginTop: "10px",
                  marginBottom: isMobile ? "10px" : "1rem", borderRadius: "4px",
                  boxShadow: "0px 3px 6px 0 rgb(212 212 212 / 35%)",
                }}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <FMTypography
                      displayText={pageTitle ? `${pageTitle} Products ` : `No Products`}
                      styleData={{
                        fontWeight: "600",
                        fontSize: isMobile ? "14px" : "1rem",
                        textTransform: "capitalize",
                      }}
                    />
                    &nbsp; &nbsp;
                    <Box className={classes.boxContainer}>
                      <FMTypography
                        displayText={
                          displayedProducts && ` | ${displayedProducts?.length} Products`
                        }
                        styleData={{
                          fontWeight: "300",
                          fontSize: isMobile ? "14px" : "1rem",
                          lineHeight: "30px",
                          color: "#717171",
                        }}
                      />
                    </Box>

                  </Box>

                  <Box>
                    <FMSort
                      setPageTitle={setPageTitle}
                      pageInfo={"categoryPage"}
                      pincodeData={pincodeData}
                      sendCategoryId={params.id}
                      setIsLoading={setIsLoading}
                      setDisplayedProducts={setDisplayedProducts}
                    />
                  </Box>
                </Box>
              )}
            </div>
            <Grid className={classes.productList} container spacing={2} style={{ justifyContent: displayedProducts && displayedProducts.length > 0 && !isMobile ? "left" : "center" }}>
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
                  <Grid key={index} item >
                    <Box
                      key={index}
                      onClick={() => onCardClick(elem._id)}
                      style={{ position: "relative", }}
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
                          width: isMobile ? "170px" : "225px",
                          borderRadius: "20px",
                          height: "auto",
                        }}
                      >
                        <CardActionArea>
                          <CardMedia
                            className="zoomin-img"
                            component="img"
                            height={isMobile ? "170px" : "210px"}
                            width={isMobile ? "170px" : "225px"}
                            image={elem?.productPictures[0]?.img}
                            alt="Product Image"
                          />
                          <CardContent
                            style={{ padding: isMobile ? "12px" : "16px" }}
                          >
                            <Typography
                              gutterBottom
                              variant="h5"
                              component="div"
                              ref={textRef}
                              sx={{
                                fontSize: isMobile ? "14px" : "14px",
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
                              <del
                                style={{
                                  fontSize: "14px",
                                  color: "#717171",
                                }}
                              >
                                ₹ {elem?.actualPrice}
                              </del>
                              <Typography
                                sx={{
                                  fontSize: "16px",
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
                                  fontSize: isMobile ? "12px" : "12px",
                                  textTransform: "capitalize",
                                }}
                              >
                                {elem?.deliveryDay}
                              </Typography>
                              <Typography
                                variant="body2"
                                sx={{
                                  color: "#008539",
                                  fontWeight: "400",
                                  fontSize: isMobile ? "12px" : "12px",
                                }}
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
                      width: "283px",
                      marginTop: "1rem",
                      borderRadius: "20px",
                      height: "auto",

                    }}
                  >
                    <CardContent
                      style={{ height: "4rem", textAlign: "center" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: "1rem", color: "#801317" }}
                      >
                        No data available!
                      </Typography>
                    </CardContent>
                  </Card>
                </Box>
              )}
            </Grid>
          </Box>

        </Grid>

      </Grid >

      <Footer />
    </>
  );
};

export default CategoryPage;
