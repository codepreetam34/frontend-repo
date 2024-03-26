import React from "react";
import HeaderWithoutNav from "../../components/HeaderWithoutNav/HeaderWithoutNav";
import { Col, Container, Row } from "react-bootstrap";
import FMTypography from "../../components/FMTypography/FMTypography";
import BlogsComponent from "../../components/BlogsComponent/BlogsComponent";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { BLOGS_DETAIL } from "../../Routes/Routes";

const Blogs = () => {

  const navigate = useNavigate();
  const openBlogHandler = () => {
    navigate(BLOGS_DETAIL);
  };

  return (
    <>
      <HeaderWithoutNav />
      <Row style={{ marginTop: "40px" }}>
        <Col>
          <FMTypography
            displayText={"Blogs"}
            styleData={{
              fontSize: "60px",
              textAlign: "center",
              fontWeight: "600",
            }}
          />
          <FMTypography
            displayText={"Make every moment a celebration"}
            styleData={{
              fontSize: "32px",
              fontWeight: "400",
              textAlign: "center",
            }}
          />
        </Col>
      </Row>

      <Container>
        <Row>
          <Col style={{ display: "flex", flexWrap: "wrap" }}>
            <Box
              sx={{ flex: "50%", marginTop: "1rem" }}
              onClick={openBlogHandler}
            >
              <BlogsComponent />
            </Box>
            <Box sx={{ flex: "50%", marginTop: "1rem" }}>
              <BlogsComponent />
            </Box>
            <Box sx={{ flex: "50%", marginTop: "1rem" }}>
              <BlogsComponent />
            </Box>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Blogs;
