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
import { getProductByCategoryId } from "Redux/Slices/ProductPage/ProductsPageSlice";
import { useDispatch, useSelector } from "react-redux";
import FMFilter from "components/FMFilters/FMFilter";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import { getCategoryChildrens } from "Redux/Slices/HeaderMenuList/HeaderMenuListSlice";
import Footer from "components/Footer/Footer";

const CategoryPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [productPageData, setProductPageData] = useState(null);
  const [subCategoryList, setSubCategoryList] = useState(null);
  const params = useParams();
  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   setLoading(true);
  //   dispatch(getProductsList()).then(() => {
  //     setLoading(false);
  //   });
  // }, [dispatch]);

  // const productPageData = useSelector(
  //   (state) =>
  //     state?.getCategoryProductsList?.getCategoryProductsListData
  //       ?.categoryProducts
  // );

  const onCardClick = (id) => {
    navigate(`/product-page/${id}`);
  };

  useEffect(() => {
    setLoading(true);
  }, [params]);

  useEffect(() => {
    dispatch(getCategoryChildrens(params))
      .then((response) => {
        setProductPageData(response?.payload);
        setSubCategoryList(response?.payload?.subCategoryList);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [dispatch, params]);

  return (
    <>
      <Header />

      <Grid sx={{ padding: "0 100px" }}>
        <Box sx={{ display: "flex" }}>
          <FMTypography
            displayText={`${productPageData?.pageTitle} Category`}
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
              displayText={`(${productPageData?.totalProductCount} Products)`}
              styleData={{
                fontWeight: "300",
                fontSize: "20px",
                lineHeight: "30px",
                color: "#717171",
              }}
            />
          </Box>
        </Box>
        {/* 
        <Box>
          <FMFilter />
        </Box> */}

        <Grid
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexBasis: "33.333333%",
            justifyContent: "space-evenly",
            gap: "2rem",
            paddingTop: "2rem",
            paddingBottom: "2rem",
          }}
        >
          {loading ? (
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
          ) : subCategoryList && subCategoryList.length > 0 ? (
            subCategoryList?.map((elem) => (
              <Box onClick={() => onCardClick(elem?._id)}>
                <Card
                  sx={{
                    width: "280px",
                    height: "21.5rem",
                    borderRadius: "20px",
    //               paddingBottom: "1rem",
                  }}
                >
                  <CardActionArea style={{ height: "100%" }}>
                    <CardMedia
                      component="img"
                      height="260"
                      width="100%"
                      image={elem?.categoryImage}
                      alt="green iguana"
                    />
                    <CardContent
                      style={{ height: "4rem", textAlign: "center" }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        component="div"
                        sx={{ fontSize: "18px", color: "#222222" }}
                      >
                        {elem?.name}
                      </Typography>
                      <Typography
                        gutterBottom
                        component="div"
                        sx={{ fontSize: "14px", color: "#222222" }}
                      >
                        {`(${elem?.productCount} Products)`}
                      </Typography>
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
