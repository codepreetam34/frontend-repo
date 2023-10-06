import React, { useEffect, useState } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import Data from "../../JsonDatas/JsonData";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryCarousel } from "Redux/Slices/LandingPageSlice/LandingPageSlice";

const TopCategory = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryCarousel());
  }, [dispatch]);

  const topCategoriesCarousels = useSelector(
    (state) => state?.getCarousel?.getProductCarouselData?.silders?.[1]?.sliders
  );



  // function replaceUrls(data) {
  //   return data?.map((item) => ({
  //     _id: item?._id,
  //     img: item?.img.replace(
  //       "http://localhost:5000",
  //       "https://backend-repo-vibezter-prod.onrender.com"
  //     ),
  //   }));
  // }

  // // Call the function to replace URLs in the data
  // const topCategoriesCarousels = replaceUrls(data);
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
    <div className="topcategory samecard">
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="heading_text">
              <h3>Top Categories</h3>
            </div>
          </Col>
          <Col md={12}>
            <Slider {...category_settings}>
              {topCategoriesCarousels?.map((elem) => (
                <div
                  className="banner_img text-center"
                  key={elem?._id}
                  style={{ padding: "0 8px" }}
                >
                  <a href="/product-page">
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

export default TopCategory;
