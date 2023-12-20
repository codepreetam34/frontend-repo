import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getMenuBarList } from "Redux/Slices/HeaderMenuList/HeaderMenuListSlice";

import { makeStyles } from "@material-ui/core/styles";

// Create a makeStyles hook
const useStyles = makeStyles((theme) => ({
  imgStyle: {
    width: "100%",
    height: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "150px !important",
      height: "150px !important",
    },
    [theme.breakpoints.up("md")]: {
      width: "150px !important",
      height: "150px !important",
    },
    [theme.breakpoints.up("lg")]: {
      width: "190px",
      height: "190px",
    },
    [theme.breakpoints.up("xl")]: {
      width: "190px",
      height: "190px",
    },
  },
}));

const CategorySlider = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  useEffect(() => {
    dispatch(getMenuBarList());
  }, [dispatch]);

  const categoryList = useSelector(
    (state) => state?.menuList?.getMenuOptionsData?.categoryList
  );
  const category_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    draggable: true,
    centerPadding: "0px",
    autoplay: false,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="category_slider">
      <Container fluid className=" m-0 p-0">
        <Row className="m-0 p-0">
          <Col md={12}>
            <Slider {...category_settings}>
              {categoryList && categoryList ? (
                categoryList?.map((elem) => {
                  return (
                    <div
                      key={elem?._id}
                      className="zoomin-img"
                      style={{
                        padding: "0 8px",
                        display: "flex",
                        justifyContent: "center",
                        flexDirection: "column",
                        alignItems: "center",
                      }}
                    >
                      <a href={`/category-page/${elem?._id}`}>
                        <img
                          className={`zoomin img-fluid ${classes.imgStyle}`}
                          alt="categoryImg"
                          src={elem?.categoryImage}
                        />
                      </a>
                      <h4 className="text-center">{elem?.name}</h4>
                    </div>
                  );
                })
              ) : (
                <></>
              )}
            </Slider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default CategorySlider;
