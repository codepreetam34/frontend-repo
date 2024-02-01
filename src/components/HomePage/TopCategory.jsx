import React, { useEffect, useRef } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Box, useMediaQuery } from "@mui/material";
import { getTopCategoryProducts } from "Redux/Slices/ProductPage/ProductsPageSlice";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  topCategory: {
    padding: "50px 80px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
    },
  },
  headingText: {
    textAlign: "center",
    fontSize: "2.1875rem",
    fontWeight: "600",
    margin: "0",
    padding: "0 0 35px",
  },

  slickSlideImg: {
    width: "225px",
    height: "300px",
    borderRadius: "20px",
    objectFit: "cover",
  },
  slickPrev: {
    left: "0",
  },
  slickNext: {
    right: "0px",
  },
  slickSlideA: {
    display: "grid",
  },
  cardName: {
    position: "absolute",
    bottom: "-5px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "100%",
  },
  cardNameH4: {
    color: "#fff",
    padding: "0 !important",
    margin: "0 10px !important",
    fontSize: "1rem !important",
    fontWeight: "500 !important",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7rem !important",
    },
  },
  cardNameP: {
    color: "#fff",
    padding: "0",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "3px 0px",
  },
}));

const TopCategory = () => {
  const dispatch = useDispatch();
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
    dispatch(getTopCategoryProducts());
  }, [dispatch]);

  const topCategoryCarousels = useSelector(
    (state) => state?.getProductsList?.getTopCategoryProducts?.products
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    draggable: true,
    centerPadding: "0px",
    autoplay: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          initialSlide: 2,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  const finalData = topCategoryCarousels && topCategoryCarousels || [];

  return (
    <div className={`${classes.topCategory} samecard`}>
      <Container fluid className="m-0 p-0">
        <Row>
          <Col md={12}>
            <div>
              <h3 className={classes.headingText}>Top Categories</h3>
            </div>
          </Col>

          <Col md={12} className="m-0 p-0">
            <Slider {...settings}>
              {finalData &&
                finalData.map((elem) => (
                  <div
                    key={elem?._id}
                    className={`text-center`}
                    style={{
                      padding: "0 4px",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <a
                      href={`/product-detail/${elem?._id}`}
                      className={classes.slickSlideA}
                    >
                      <Box className="banner_img zoomin-img">
                        <div className="background-overlay"></div>
                        <img
                          src={elem?.productPictures[0].img}
                          className="img-fluid"
                          alt=""
                          style={{
                            width: "225px",
                            height: "300px",
                            objectFit: "cover",
                            ...(window.innerWidth <= 600 && {
                              width: "125px", height: "160px",
                            })
                          }}
                        />
                        <div className={classes.cardName}>
                          <h4 className={classes.cardNameH4} ref={textRef} style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "-webkit-box",
                            "-webkit-line-clamp": 2,
                            "-webkit-box-orient": "vertical",
                          }}>{elem?.name}</h4>
                          <p className={classes.cardNameP}>
                            ₹ {elem?.discountPrice}
                          </p>
                        </div>
                      </Box>
                    </a>
                  </div>
                ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TopCategory;
