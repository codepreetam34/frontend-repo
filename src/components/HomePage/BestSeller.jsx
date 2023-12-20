import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getBestSellerProducts } from "Redux/Slices/ProductPage/ProductsPageSlice";
import { Box, useMediaQuery } from "@mui/material";

const BestSeller = () => {
  const dispatch = useDispatch();
  const responsiveMobile = useMediaQuery("(max-width: 600px)");

  useEffect(() => {
    dispatch(getBestSellerProducts());
  }, [dispatch]);

  const bestSellerCarousels = useSelector(
    (state) => state?.getProductsList?.getBestSellerProducts?.products
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

  const finalData = bestSellerCarousels && bestSellerCarousels || [];


  return (


    <div className="bestseller samecard ">
      <Container fluid className="m-0 p-0">
      <Row className="m-0 p-0">
          <Col md={12}>
            <div className="heading_text">
              <h3>Best Seller</h3>
            </div>
          </Col>

          <Col md={12}>
            <Slider  {...settings}>
              {finalData && finalData?.map((elem) => (
                <div key={elem?._id}
                  className="banner_img text-center"
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

export default BestSeller;








