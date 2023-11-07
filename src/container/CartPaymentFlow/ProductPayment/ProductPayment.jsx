import FMButton from "components/FMButton/FMButton";
import React from "react";
import { Col, Row } from "react-bootstrap";

const ProductPayment = () => {
  return (
    <Row style={{ padding: "10px 120px 0 120px" }}>
      <Col className="col-sm-4" style={{padding:"1rem 1rem"}}>
        <FMButton
          displayText={"Cash On Delivery"}
          variant="outlined"
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            border: " 1px solid #E6E6E6",
            textTransform: "capitalize",
            color: "#222222",
            marginBottom: "1.5rem",
            "&:hover": {
              backgroundColor: "white",
              border: "1px solid black",
            },
          }}
        />
        <FMButton
          displayText={"Credit/Debit Card"}
          variant="outlined"
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            border: " 1px solid #E6E6E6",
            textTransform: "capitalize",
            color: "#222222",
            marginBottom: "1.5rem",
            "&:hover": {
              backgroundColor: "white",
              border: "1px solid black",
            },
          }}
        />
        <FMButton
          displayText={"PhonePe/Google Pay/BHIM UPI"}
          variant="outlined"
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            border: " 1px solid #E6E6E6",
            textTransform: "capitalize",
            color: "#222222",
            marginBottom: "1.5rem",
            "&:hover": {
              backgroundColor: "white",
              border: "1px solid black",
            },
          }}
        />
        <FMButton
          displayText={"Paytm/Wallets"}
          variant="outlined"
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            border: " 1px solid #E6E6E6",
            textTransform: "capitalize",
            color: "#222222",
            marginBottom: "1.5rem",
            "&:hover": {
              backgroundColor: "white",
              border: "1px solid black",
            },
          }}
        />
        <FMButton
          displayText={"Net Banking"}
          variant="outlined"
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            border: " 1px solid #E6E6E6",
            textTransform: "capitalize",
            color: "#222222",
            marginBottom: "1.5rem",
            "&:hover": {
              backgroundColor: "white",
              border: "1px solid black",
            },
          }}
        />
        <FMButton
          displayText={"EMI/Pay Later"}
          variant="outlined"
          styleData={{
            display: "block",
            width: "300px",
            boxShadow:
              "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
            borderRadius: "100px",
            border: " 1px solid #E6E6E6",
            textTransform: "capitalize",
            color: "#222222",
            marginBottom: "1.5rem",
            "&:hover": {
              backgroundColor: "white",
              border: "1px solid black",
            },
          }}
        />
      </Col>
      <Col
        style={{
          boxShadow:
            "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
          borderRadius: "20px",
        }}
      ></Col>
    </Row>
  );
};

export default ProductPayment;
