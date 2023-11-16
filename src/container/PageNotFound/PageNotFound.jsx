import { Box } from "@mui/material";

import FMTypography from "../../components/FMTypography/FMTypography";
import HeaderWithoutNav from "../../components/HeaderWithoutNav/HeaderWithoutNav";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { LANDING_PAGE } from "../../Routes/Routes";
import notFoundDog from "../../assets/notFoundDog.svg";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <>
      <HeaderWithoutNav />
      <Container>
        <Row>
          <Col style={{ paddingTop: "100px" }}>
            <FMTypography
              displayText={"Sorry"}
              styleData={{ fontSize: "90px", fontWeight: "600" }}
            />
            <FMTypography
              displayText={"We couldn’t find that page"}
              styleData={{ fontSize: "30px", fontWeight: "500" }}
            />
            <Box sx={{ display: "flex" }}>
              <FMTypography
                displayText={`Try Searching or go to `}
                styleData={{ fontSize: "24px", fontWeight: "400" }}
              />
              <span
                style={{
                  fontSize: "24px",
                  fontWeight: "400",
                  marginLeft: ".5rem",
                  color: "#0095F6",
                  cursor: "pointer",
                }}
                onClick={() => navigate("/")}
              >
                Homepage
              </span>
            </Box>
          </Col>
          <Col style={{ paddingTop: "20px" }}>
            <img src={notFoundDog} alt="dog-img" width="644px" height="425px" />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PageNotFound;
