import React, { useEffect, useState } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import Data from "../../JsonDatas/JsonData";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryCarousel } from "Redux/Slices/LandingPageSlice/LandingPageSlice";

const BestSeller = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryCarousel());
  }, [dispatch]);

  const bestSellerCarousels = useSelector(
    (state) => state?.getCarousel?.getProductCarouselData?.sliders?.[1]?.sliders
  );

  const category_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    draggable: true,
    centerPadding: "0px",
    centerMode: true,
    autoplay: false,
    arrows: true,
    slidesToShow: 6,
    slidesToScroll: 1,
  };

  return (
    <div className="bestseller samecard ">
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="heading_text">
              <h3>Best Seller</h3>
            </div>
          </Col>
          <Col md={12}>
            <Slider {...category_settings}>
              {bestSellerCarousels?.map((elem) => (
                <div className="banner_img text-center" key={elem?._id}>
                  <a href="/">
                    <img src={elem?.img} className="img-fluid" alt="" />
                    <div className="card_name">
                      <h4>Decoration</h4>
                      <p>start from INR 2999</p>
                    </div>
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
