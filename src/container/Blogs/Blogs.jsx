import React from "react";
import HeaderWithoutNav from "../../components/HeaderWithoutNav/HeaderWithoutNav";
import { Col, Container, Row } from "react-bootstrap";
import FMTypography from "../../components/FMTypography/FMTypography";
import BlogsComponent from "../../components/BlogsComponent/BlogsComponent";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BLOGS_DETAIL } from "../../Routes/Routes";
import "./Blogs.css";

const Blogs = () => {
  const navigate = useNavigate();
  const openBlogHandler = () => {
    navigate(BLOGS_DETAIL);
  };
  return (
    <>
      <HeaderWithoutNav />
      <Row style={{ marginTop: "40px", width:'95%' }}>
        <Col>
          <FMTypography
            displayText={"Blogs"}
            styleData={{
              fontSize: "60px",
              textAlign: "center",
              fontWeight: "600",
            }}
            className={"blogMain"}
          />
          <FMTypography
            displayText={"Make every moment a celebration"}
            styleData={{
              fontSize: "32px",
              fontWeight: "400",
              textAlign: "center",
            }}
            className={"blogSub"}
          />
        </Col>
      </Row>
      <Container>
        <Row>
          <Col sm={6} onClick={openBlogHandler}>
            <BlogsComponent />
          </Col>
          <Col sm={6} onClick={openBlogHandler}>
            <BlogsComponent />
          </Col>
          <Col sm={6} onClick={openBlogHandler}>
            <BlogsComponent />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Blogs;
