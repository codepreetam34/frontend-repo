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
      padding: "20px 20px 0",
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
    slidesToScroll: 6,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: false,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          arrows: false,
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
                        padding: "0 4px",
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
                            ...(window.innerWidth <= 600 && {
                              width: "80px", height: "80px",
                            })
                          }}
                        />
                      </a>
                      <h4 className="text-center" style={{
                        fontSize: "14px",
                        ...(window.innerWidth <= 600 && {
                          fontSize: "12px",
                          fontWeight: "500"
                        })
                      }}>{elem?.name}</h4>
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
