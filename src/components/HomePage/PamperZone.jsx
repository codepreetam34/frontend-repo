import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../../Redux/Slices/LandingPageSlice/LandingPageSlice";

const PamperZone = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const pamperZoneData = useSelector(
    (state) => state?.getCarousel?.getCarouselData?.homePageBanners
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
  // const pamperZoneData = replaceUrls(data);
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
                //   src={pamperZoneData && pamperZoneData[2]?.banners[0]?.img}
                className="img-fluid"
                style={{ height: "300px" }}
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
                //  src={pamperZoneData && pamperZoneData[2]?.banners[1]?.img}
                className="img-fluid"
                alt=""
                style={{ height: "300px" }}
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
