import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../../Redux/Slices/LandingPageSlice/LandingPageSlice";
import { Box, useMediaQuery } from "@mui/material";

const Banner = () => {
  const dispatch = useDispatch();
  const responsiveMobile = useMediaQuery("(max-width: 600px)");

  const allCarousels = useSelector(
    (state) => state?.getCarousel?.getCarouselData?.homePageBanners
  );
  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const settings = {
    dots: responsiveMobile ? false : true,
    infinite: true,
    speed: 300,
    draggable: true,
    margin: responsiveMobile ? "50px" : "100px",
    autoplay: true,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const finalData = allCarousels && allCarousels[3]?.banners || [];

  return (
    <div className="banner_slider">
      <Row className="m-0">
        <Col className="p-0">
          <Slider {...settings}>
            {finalData &&
              finalData?.map((imageName, index) => (
                <Box className="banner_img">
                  <img
                    src={imageName?.img}
                    alt=""
                    style={{
                      width: "100%",
                      height: "auto",
                    }}
                  />
                </Box>
              ))}
          </Slider>
        </Col>
      </Row>
    </div>

    // <div className="banner_slider">
    //   <Container fluid>
    //     <Row>
    //       <Col md={12}>
    //         <Slider {...settings}>
    //           {allCarousels &&
    //             allCarousels[3]?.banners.map((item) => (
    //               <div className="banner_img" key={item?._id}>
    //                 <img src={item?.img} className="img-fluid" alt="" />
    //               </div>
    //             ))}
    //         </Slider>
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
  );
};

export default Banner;
