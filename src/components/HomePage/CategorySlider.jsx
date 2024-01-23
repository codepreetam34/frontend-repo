import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getMenuBarList } from "Redux/Slices/HeaderMenuList/HeaderMenuListSlice";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  categorySlider: {
    padding: "20px 80px 0",
    [theme.breakpoints.down("sm")]: {
      padding: "30px 20px 0",
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
    <div className={classes.categorySlider}>
      <Container fluid className="m-0 p-0">
        <Row>
          <Col md={12} className="m-0 p-0">
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
                          alt="categoryImg"
                          src={elem?.categoryImage}
                          className={`zoomin img-fluid`}
                          style={{
                            width: "170px",
                            height: "170px",
                            borderRadius: "104px",
                            objectFit: "cover",
                          }}
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
