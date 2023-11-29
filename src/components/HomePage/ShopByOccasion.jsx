import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getHomePageShopByOccasion } from "Redux/Slices/ShopByOccasion/ShopByOccasionSlice";

const ShopByOccasion = () => {

  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState();

  const ShopByOccasionCarousels = useSelector(
    (state) => state.shopByOccasion?.shopByOccations?.homepageBanner
  );
  
  console.log("ShopByOccasionCarousels ", ShopByOccasionCarousels);

  // useEffect(() => {
  //   if (ShopByOccasionCarousels == [] || !ShopByOccasionCarousels || ShopByOccasionCarousels?.length === 0) {
  //     setIsLoading(true);
  //     dispatch(getHomePageShopByOccasion()).then((res) => {
  //       setIsLoading(false);
  //     }).catch((err) => {
  //       setIsLoading(false);
  //     });
  //   } else {
  //     setIsLoading(false);
  //   }
  // }, [dispatch]);

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
                <div className="heighautoimgfirst">
                  <a href="/product-page" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[8]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>Wedding</p>
                  </a>
                </div>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[7]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>Festivals</p>
                  </a>
                </div>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[6]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>Baby Shower</p>
                  </a>
                </div>
              </Col>

              <Col md={4}>
                <div className="heighautoimg forth_row">
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[5]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>Anniversary</p>
                  </a>
                </div>
                <div className="heighautoimg forth_row">
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[4]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>Best Wishes</p>
                  </a>
                </div>
              </Col>

              <Col md={4}>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[3]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>Party</p>
                  </a>
                </div>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[2]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>Holi</p>
                  </a>
                </div>
                <div className="heighautoimg">
                  <a href="/" className="overlay">
                    <img
                      src={
                        ShopByOccasionCarousels &&
                        ShopByOccasionCarousels[1]?.banner
                      }
                      className="img-fluid"
                      alt=""
                    />
                    <p>House Warming</p>
                  </a>
                </div>
              </Col>

            </Row>
          </Col>
          <Col md={6}>
            <div className=" position-relative">
              <div className="overlay"></div>
              <img
                src={
                  ShopByOccasionCarousels &&
                  ShopByOccasionCarousels[0]?.banner
                }
                alt=""
              />
              <div className="twobandatalowersection">
                <h4>Birthday</h4>
                <h4 style={{ paddingBottom: '2rem' }}>Celebration</h4>
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
