import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCarousel } from "../../Redux/Slices/LandingPageSlice/LandingPageSlice";

const Banner = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCarousel());
  }, [dispatch]);

  const data = useSelector(
    (state) => state?.getCarousel?.getCarouselData?.banners?.[0]?.banners
  );
  function replaceUrls(data) {
    return data?.map((item) => ({
      _id: item?._id,
      img: item?.img.replace(
        "http://localhost:5000",
        "https://backend-repo-vibezter-prod.onrender.com"
      ),
    }));
  }

  // Call the function to replace URLs in the data
  const allCarousels = replaceUrls(data);


  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    draggable: true,
    Margin: "100px",
    autoplay: false,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="banner_slider">
      <Container fluid>
        <Row>
          <Col md={12}>
            <Slider {...settings}>
              {allCarousels?.map((item) => (
                <div className="banner_img" key={item?._id}>
                  <img src={item?.img} className="img-fluid" alt="" />
                  {/* <div className="banner_content">
                    <h3>{bd.title}</h3>
                    <p>Cake | Flowers | Personalized Gift | Hampers</p>
                    <a href="/">Gift Now</a>
                  </div> */}
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Banner;
