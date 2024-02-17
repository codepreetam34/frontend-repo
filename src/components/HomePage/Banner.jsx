import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../../Redux/Slices/LandingPageSlice/LandingPageSlice";
import { Box, useMediaQuery } from "@mui/material";
import mobile1 from "./Ram-Mandir_Msite_01_01.jpg";
import mobile2 from "./VALENTINE_Mobile-Banner_19jan.jpg";
const Banner = () => {
  const dispatch = useDispatch();
  const isMobile = useMediaQuery("(max-width: 600px)");

  const allCarouselsDesktop = useSelector(
    (state) => state?.getCarousel?.getCarouselData?.homePageBanners
  );
  const allCarouselsMobile = [
    {
      "title": "First Banner",
      "slug": "first-banner",
      "banner": mobile1,
      "imageAltText": "First Banner Alt Text",
      "createdBy": "<User ObjectId>",
      "createdAt": "<Creation Timestamp>",
      "updatedAt": "<Update Timestamp>"
    },
    {
      "title": "Second Banner",
      "slug": "second-banner",
      "banner": mobile2,
      "imageAltText": "Second Banner Alt Text",
      "createdBy": "<User ObjectId>",
      "createdAt": "<Creation Timestamp>",
      "updatedAt": "<Update Timestamp>"
    }
  ]


  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const settings = {
    dots: !isMobile,
    infinite: true,
    speed: 300,
    draggable: true,
    margin: isMobile ? "20px" : "100px",
   // autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  const finalData = isMobile ? allCarouselsMobile : allCarouselsDesktop || [];

  return (
    <div className="banner_slider">
      <Row className="m-0">
        <Col className="p-0">
          <Slider {...settings}>
            {finalData &&
              finalData?.map((imageName, index) => (
                <Box className="banner_img" key={index}>
                  <img
                    src={imageName?.banner}
                    alt=""
                    style={{
                      width: "100%",
                      height: isMobile ? "200px" : "50vh",
                      objectFit: "cover",
                    }}
                  />
                </Box>
              ))}
          </Slider>
        </Col>
      </Row>
    </div>
  );
};

export default Banner;
