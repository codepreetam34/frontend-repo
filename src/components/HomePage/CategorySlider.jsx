import React, { useEffect } from "react";
import Slider from "react-slick-slider";
import { Container, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMenuBarList } from "Redux/Slices/HeaderMenuList/HeaderMenuListSlice";

const CategorySlider = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getMenuBarList());
  }, [dispatch]);

  const categoryList = useSelector(
    (state) => state?.menuList?.getMenuOptionsData?.categoryList
  );

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

  console.log("category List ", categoryList)

  const handleCategoryClick = async (categoryId) => {
    navigate(`/category-page/${categoryId}`);
  };

  return (
    <div className="category_slider">
      <Container fluid>
        <Row>
          <Col md={12}>
            <Slider {...category_settings}>
              {categoryList && categoryList?.map((elem) => (
                <div
                  className="banner_img text-center"
                  key={elem?._id}
                  style={{ padding: "0 8px" }}
                >
                  <div onClick={() => handleCategoryClick(elem?._id)}>
                    <img src={elem?.categoryImage} className="img-fluid" alt="" />
                    <h4>{elem?.name}</h4>
                  </div>
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
