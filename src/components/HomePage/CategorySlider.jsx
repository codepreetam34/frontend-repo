import React, { useEffect, useState } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryCarousel } from "Redux/Slices/LandingPageSlice/LandingPageSlice";

const CategorySlider = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryCarousel());
  }, [dispatch]);

  const cateogryCarousels = useSelector(
    (state) => state?.getCarousel?.getProductCarouselData?.silders?.[3]?.sliders
  );

  const category_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    draggable: true,
    Margin: "100px",
    centerMode: true,
    centerPadding: "0px",
    autoplay: false,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div className="category_slider">
      <Container fluid>
        <Row>
          <Col md={12}>
            <Slider {...category_settings}>
              {cateogryCarousels?.map((elem) => (
                <div
                  className="banner_img text-center"
                  key={elem?._id}
                  style={{ padding: "0 8px" }}
                >
                  <a href="/">
                    <img src={elem?.img} className="img-fluid" alt="" />
                    <h4>Cake</h4>
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

export default CategorySlider;
