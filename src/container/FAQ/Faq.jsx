import React, { useState } from "react";
import { Box } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";

import FMTypography from "../../components/FMTypography/FMTypography";
import FMButton from "../../components/FMButton/FMButton";
import FaqsComponent from "../../components/FMFaqs/FaqsComponent";

import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import { commonStyle } from "../../Styles/commonStyles";
import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";
import Header from "components/SearchBar/Header";

const Faq = () => {
  const [orderingActiveBtn, setOrderingActiveBtn] = useState(true);
  const [deliveriesActiveBtn, setDeliveriesActiveBtn] = useState(false);
  const [productsActiveBtn, setProductsActiveBtn] = useState(false);
  return (
    <>
      <Header />
      <Container fluid style={{ padding: "0" }}>
        <Row style={{ width: "100%", margin: "0" }}>
          <Col
            style={{
              backgroundColor: "#FCEDEE",
              margin: "0 auto",
              padding: "50px 0 20px 20%",
              // display: "flex",
              // justifyContent: "center",
              // padding: "50px 0",
            }}
          >
            <FMTypography
              displayText={"Frequently Ask Questions"}
              styleData={{ fontSize: "60px", fontWeight: "500" }}
            />
            <FMTypography
              displayText={"Our FAQ’s"}
              styleData={{
                fontSize: "20px",
                fontWeight: "500",
                marginTop: "20px",
                padding: "0 0 0 30%",
              }}
            />
            <FMTypography
              displayText={"Have any questions?"}
              styleData={{
                fontSize: "32px",
                fontWeight: "500",
                marginTop: "10px",
                padding: "0 0 0 20%",
              }}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row style={{ marginTop: "32px" }}>
          <Col
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <FMButton
              displayText={"Ordering"}
              variant="outlined"
              styleData={{
                border: " 1px solid #E6E6E6",
                borderRadius: "19px",
                marginRight: "10px",
                color: "#717171",
                backgroundColor: orderingActiveBtn ? "#E6E6E6" : "white",
                "&:hover": {
                  backgroundColor: orderingActiveBtn ? "#E6E6E6" : "white",
                  border: " 1px solid #E6E6E6",
                },
              }}
              onClick={() => {
                setOrderingActiveBtn(true);
                setDeliveriesActiveBtn(false);
                setProductsActiveBtn(false);
              }}
            />

            <FMButton
              displayText={"Deliveries"}
              variant="outlined"
              styleData={{
                border: " 1px solid #E6E6E6",
                borderRadius: "19px",
                marginRight: "10px",
                color: "#717171",
                backgroundColor: deliveriesActiveBtn ? "#E6E6E6" : "white",
                "&:hover": {
                  backgroundColor: deliveriesActiveBtn ? "#E6E6E6" : "white",
                  border: " 1px solid #E6E6E6",
                },
              }}
              onClick={() => {
                setOrderingActiveBtn(false);
                setDeliveriesActiveBtn(true);
                setProductsActiveBtn(false);
              }}
            />

            <FMButton
              displayText={"Products"}
              variant="outlined"
              styleData={{
                border: " 1px solid #E6E6E6",
                backgroundColor: productsActiveBtn ? "#E6E6E6" : "white",
                borderRadius: "19px",
                marginRight: "10px",
                color: "#717171",
                "&:hover": {
                  backgroundColor: productsActiveBtn ? "#E6E6E6" : "white",
                  border: " 1px solid #E6E6E6",
                },
              }}
              onClick={() => {
                setOrderingActiveBtn(false);
                setDeliveriesActiveBtn(false);
                setProductsActiveBtn(true);
              }}
            />
          </Col>
        </Row>

        <Row>
          <Col>
            <FaqsComponent
              type={
                orderingActiveBtn
                  ? "Ordering"
                  : deliveriesActiveBtn
                  ? "Delivery"
                  : "Products"
              }
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Faq;
