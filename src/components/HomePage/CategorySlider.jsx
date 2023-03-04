import React, { useEffect, useState } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import Data from "../../JsonDatas/JsonData";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryCarousel } from "Redux/Slices/LandingPageSlice/LandingPageSlice";

const CategorySlider = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategoryCarousel());
  }, [dispatch]);

  const allCarousels = useSelector((state) => state?.getCarousel);
  console.log("allCarousels", allCarousels);
  const [idata, setIdata] = useState(Data);

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
              {idata.map((idata, i) => (
                <div className="banner_img text-center" key={idata.id}>
                  <a href="/">
                    <img
                      src={idata.thumbnailUrl}
                      className="img-fluid"
                      alt=""
                    />
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
