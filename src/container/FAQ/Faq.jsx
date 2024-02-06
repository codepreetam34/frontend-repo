import React, { useState } from "react";
import { useMediaQuery } from "@mui/material";
import { Col, Container, Row } from "react-bootstrap";
import FMTypography from "../../components/FMTypography/FMTypography";
import FMButton from "../../components/FMButton/FMButton";
import FaqsComponent from "../../components/FMFaqs/FaqsComponent";
import Header from "components/SearchBar/Header";
import Footer from "components/Footer/Footer";

const Faq = () => {
  const [orderingActiveBtn, setOrderingActiveBtn] = useState(true);
  const [deliveriesActiveBtn, setDeliveriesActiveBtn] = useState(false);
  const [productsActiveBtn, setProductsActiveBtn] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  return (
    <>
      <Header />
      <Container fluid style={{ padding: "0" }}>
        <Row style={{ width: "100%", margin: "0" }}>
          <Col
            style={{
              backgroundColor: "#FCEDEE",
              margin: "0 auto",
              padding: isMobile ? "0px 20px 20px" : "50px 0 20px 20%",
              // display: "flex",
              // justifyContent: "center",
              // padding: "50px 0",
            }}
          >
            <FMTypography
              displayText={"Frequently Ask Questions"}
              styleData={{ fontSize: isMobile ? "1.5rem" : "60px", fontWeight: "500", textAlign: "center", }}
            />
            <FMTypography
              displayText={"Our FAQ’s"}
              styleData={{
                fontSize: isMobile ? "1rem" : "20px",
                fontWeight: "500",
                textAlign: "center",
                marginTop: isMobile ? "10px" : "20px",
                padding: isMobile ? "0" : "0 0 0 30%",
              }}
            />
            <FMTypography
              displayText={"Have any questions?"}
              styleData={{
                fontSize: isMobile ? "1rem" : "32px",
                fontWeight: "500",
                marginTop: "10px",
                textAlign: "center",
                padding: isMobile ? "0" : "0 0 0 20%",
              }}
            />
          </Col>
        </Row>
      </Container>
      <Container>
        <Row style={{ marginTop: "30px" }}>
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
                border: orderingActiveBtn ? "1px solid #801317" : "1px solid #E6E6E6",
                borderRadius: "19px",
                marginRight: "10px",
                color: "#717171",
                backgroundColor: orderingActiveBtn ? "#E6E6E6" : "white",
                "&:hover": {
                  backgroundColor: orderingActiveBtn ? "#fcedee" : "white",
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
                border: deliveriesActiveBtn ? "1px solid #801317" : "1px solid #E6E6E6",
                borderRadius: "19px",
                marginRight: "10px",
                color: "#717171",
                background: deliveriesActiveBtn ? "#fcedee" : "white",
                "&:hover": {
                  background: deliveriesActiveBtn ? "#fcedee" : "white",
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
                  backgroundColor: productsActiveBtn ? "#801317" : "white",
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
      <Footer />
    </>
  );
};

export default Faq;
