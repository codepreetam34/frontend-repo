import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "Redux/Slices/LandingPageSlice/LandingPageSlice";

const PamperZone = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const pamperZoneData = useSelector(
    (state) => state?.getCarousel?.getCarouselData?.banners?.[1]?.banners
  );

  return (
    <div className="pamperzone">
      <Container fluid>
        <Row>
          <Col md={12}>
            <div className="heading_text">
              <h3>Pamper Zone</h3>
            </div>
          </Col>
          <Col md={6}>
            <div className="position-relative">
              <img
                src={pamperZoneData?.[0]?.img}
                className="img-fluid"
                alt=""
              />
              <div className="twobandata">
                <h4>Gift For Her</h4>
                <a href="/">Shop Now</a>
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="position-relative">
              <img
                src={pamperZoneData?.[1]?.img}
                className="img-fluid"
                alt=""
              />
              <div className="twobandata">
                <h4>Gift For Him</h4>
                <a href="/">Shop Now</a>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PamperZone;
