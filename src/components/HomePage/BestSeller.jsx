import React, { useEffect, useRef } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBestSellerProducts } from "Redux/Slices/ProductPage/ProductsPageSlice";
import { Box, Typography } from "@mui/material";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  bestseller: {
    padding: "50px 80px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
    },
  },
  headingText: {
    textAlign: "center",
    fontSize: "2.1875rem",
    fontWeight: 600,
    margin: 0,
    padding: "0 0 35px",
  },
  samecard: {
    "& .slick-slide img": {
      width: "225px",
      height: "300px",
      borderRadius: "20px",
      objectFit: "cover",
    },
    "& .slick-prev": {
      left: 0,
    },
    "& .slick-next": {
      right: "0px",
    },
    "& .slick-slide a": {
      display: "grid",
    },
    "& .slick-slide .card_name": {
      position: "absolute",
      bottom: "-5px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "100%",
    },
    "& .slick-slide .card_name h4": {
      color: "#fff",
      padding: "0",
      margin: "0 10px",
      fontSize: "0.7rem",
      fontWeight: 500,
    },
    "& .slick-slide .card_name p": {
      color: "#fff",
      padding: 0,
      fontSize: "1rem",
      fontWeight: 500,
      padding: "3px 0px",
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
}));

const BestSeller = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
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
    dispatch(getBestSellerProducts());
  }, [dispatch]);

  const bestSellerCarousels = useSelector(
    (state) => state?.getProductsList?.getBestSellerProducts?.products
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
          slidesToScroll: 1,
          initialSlide: 2,
          infinite: true,
          arrows: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          arrows: false,
        },
      },
    ],
  };

  const finalData = (bestSellerCarousels && bestSellerCarousels) || [];

  return (
    <div className={`${classes.bestseller} ${classes.samecard}`}>
      <Container fluid className="m-0 p-0">
        <Row>
          <Col md={12}>
            <div>
              <h3 className={classes.headingText}>Best Seller</h3>
            </div>
          </Col>
          <Col md={12} className="m-0 p-0">
            <Slider {...settings}>
              {finalData &&
                finalData?.map((elem) => (
                  <div
                    key={elem?._id}
                    className={`text-center `}
                    style={{
                      padding: "0 4px",
                      display: "flex",
                      justifyContent: "center",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <a href={`/product-detail/${elem?._id}`}>
                      <Box className="banner_img zoomin-img">
                      
                        <img
                          src={elem?.productPictures[0].img}
                          className="img-fluid"
                          alt=""
                          style={{
                            width: "225px",
                            height: "300px",
                            objectFit: "cover",
                            ...(window.innerWidth <= 600 && {
                              width: "110px", height: "150px",
                            })
                          }}
                        />
                        <div className="card_name">
                        <div className="background-overlay-image"></div>
                        <h4 className={classes.cardNameH4} ref={textRef} style={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap",
                            display: "-webkit-box",
                            "-webkit-line-clamp": 2,
                            "-webkit-box-orient": "vertical",
                          }}>{elem?.name}</h4>
                          <p>₹ {elem?.discountPrice}</p>
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

export default BestSeller;
