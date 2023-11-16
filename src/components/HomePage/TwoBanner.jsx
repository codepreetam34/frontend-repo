import FMButton from "../../components/FMButton/FMButton";
import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../../Redux/Slices/LandingPageSlice/LandingPageSlice";

const TwoBanner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const twoBannerData = useSelector(
    (state) => state?.getCarousel?.getCarouselData?.homePageBanners
  );

  // Function to replace the URLs in the data
// function replaceUrls(data) {
//   return data?.map(item => ({
//     _id: item?._id,
//     img: item?.img.replace("http://localhost:5000", "https://backend-repo-vibezter-prod.onrender.com")
//   }));
// }

// // Call the function to replace URLs in the data
// const twoBannerData = replaceUrls(data);

  return (
    <div className="twobannersection">
      <Container fluid>
        <Row>
          <Col md={6}>
            <div className="overlay position-relative">
              <img src={twoBannerData && twoBannerData[1]?.banners[0]?.img} className="img-fluid" alt="" />
              <div className="twobandata">
                <h4 style={{ fontSize: "24px" }}>The Anniversary Edit</h4>
                <p style={{ fontSize: "14px" }}>
                  Send lots of blooms this anniversary
                </p>
                <FMButton
                  displayText={"Gift Now"}
                  styleData={{
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
          </Col>
          <Col md={6}>
            <div className="overlay position-relative">
              <img src={twoBannerData && twoBannerData[1]?.banners[1]?.img} className="img-fluid" alt="" />
              <div className="twobandata">
                <h4 style={{ fontSize: "24px" }}>Bespoke Hampers</h4>
                <p style={{ fontSize: "14px" }}>
                  To elevate your gifting experience
                </p>
                <FMButton
                  displayText={"Gift Now"}
                  styleData={{
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "capitalize",
                    fontWeight: "600",
                  }}
                />
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default TwoBanner;
