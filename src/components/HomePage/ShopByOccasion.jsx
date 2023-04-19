import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "Redux/Slices/LandingPageSlice/LandingPageSlice";

const ShopByOccasion = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const ShopByOccasionCarousels = useSelector(
    (state) => state?.getCarousel?.getCarouselData?.banners?.[3]?.banners
  );

  return (
    <div className="shopbyocca">
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="heading_text">
              <h3>Shop By Occasions</h3>
            </div>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={4}>
                <div className="heighautoimg">
                  <a href="/product-page" className="overlay">
                    <img
                      src={ShopByOccasionCarousels?.[0]?.img}
                      className="img-fluid"
                      alt="first-img"
                    />
                    <p>Wedding</p>
                  </a>
                </div>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={ShopByOccasionCarousels?.[1]?.img}
                      className="img-fluid"
                      alt=""
                    />
                    <p>Festivals</p>
                  </a>
                </div>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={ShopByOccasionCarousels?.[2]?.img}
                      className="img-fluid"
                      alt=""
                    />
                    <p>Baby Shower</p>
                  </a>
                </div>
              </Col>

              <Col md={4}>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={ShopByOccasionCarousels?.[3]?.img}
                      className="img-fluid"
                      alt=""
                    />
                    <p>Party</p>
                  </a>
                </div>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={ShopByOccasionCarousels?.[4]?.img}
                      className="img-fluid"
                      alt=""
                    />
                    <p>Holi</p>
                  </a>
                </div>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={ShopByOccasionCarousels?.[5]?.img}
                      className="img-fluid"
                      alt=""
                    />
                    <p>House Warming</p>
                  </a>
                </div>
              </Col>
              <Col md={4}>
                <div className="heighautoimg forth_row">
                  <a href="/" className="overlay">
                    <img
                      src={ShopByOccasionCarousels?.[6]?.img}
                      className="img-fluid"
                      alt=""
                    />
                    <p>Anniversary</p>
                  </a>
                </div>
                <div className="heighautoimg forth_row">
                  <a href="/" className="overlay">
                    <img
                      src={ShopByOccasionCarousels?.[7]?.img}
                      className="img-fluid"
                      alt=""
                    />
                    <p>Best Wishes</p>
                  </a>
                </div>
              </Col>
            </Row>
          </Col>
          <Col md={6}>
            <div className="overlay position-relative">
              <img src={ShopByOccasionCarousels?.[8]?.img} alt="" />
              <div className="twobandata">
                <h4>Birthday Celebration</h4>
                <a href="/">Gift Now</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ShopByOccasion;
