import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { getCategoryCarousel } from "Redux/Slices/LandingPageSlice/LandingPageSlice";
import { Link, useParams } from "react-router-dom";

const CategorySlider = () => {
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getCategoryCarousel());
  }, [dispatch]);

  const cateogryCarousels = useSelector(
    (state) => state?.getCarousel?.getProductCarouselData?.silders?.[3]?.sliders
  );

  //  Function to replace the URLs in the data
  // function replaceUrls(data) {
  //   return data?.map(item => ({
  //     _id: item?._id,
  //     img: item?.img.replace("http://localhost:5000", "https://backend-repo-vibezter-prod.onrender.com")
  //   }));
  // }

  //  Call the function to replace URLs in the data
  // const cateogryCarousels = replaceUrls(data);

  const category_settings = {
    dots: false,
    infinite: true,
    speed: 500,
    draggable: true,
    margin: "100px",
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
              {cateogryCarousels?.map((elem) => (
                <div
                  className="banner_img text-center"
                  key={elem?._id}
                  style={{ padding: "0 8px" }}
                >
                  <Link to={`/product-page/63e7408c4d118f475c8542c2`}>
                    <img src={elem?.img} className="img-fluid" alt="" />
                    <h4>Cake</h4>
                  </Link>
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
