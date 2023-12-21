import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getTopCategoryProducts } from "Redux/Slices/ProductPage/ProductsPageSlice";
import { Box, useMediaQuery } from "@mui/material";

const TopCategory = () => {
  const dispatch = useDispatch();
  const responsiveMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    dispatch(getTopCategoryProducts());
  }, [dispatch]);

  const topCategoryCarousels = useSelector(
    (state) => state?.getProductsList?.getTopCategoryProducts?.products
  );
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    draggable: true,
    centerPadding: "0px",
    autoplay: false,
    arrows: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
    ],
  };

  const finalData = topCategoryCarousels && topCategoryCarousels || [];

  return (


    <div className="bestseller samecard ">
      <Container fluid >
        <Row>
          <Col md={12}>
            <div className="heading_text">
              <h3>Top Categories</h3>
            </div>
          </Col>

          <Col md={12}>
            <Slider  {...settings}>
              {finalData && finalData?.map((elem) => (
                <div key={elem?._id}
                  className="banner_img text-center zoomin-img-hover"
                  style={{ padding: "0 8px", display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}
                >
                  <a href={`/product-detail/${elem?._id}`}>
                    <Box className="banner_img">
                      <div className="background-overlay"></div>
                      <img src={elem?.productPictures[0].img} className="img-fluid" alt="" />
                      <div className="card_name">
                        <h4>{elem?.name}</h4>
                        <p>₹ {elem?.discountPrice}</p>
                      </div>
                    </Box>
                  </a>
                </div>
              ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </div >

  );
};

export default TopCategory;








