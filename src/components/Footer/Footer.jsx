import FMTypography from "components/FMTypography/FMTypography";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import androidIcon from "../../assets/androidIcon.svg";
import appleIcon from "../../assets/appleIcon.svg";

const Footer = () => {
  return (
    <Container fluid style={{ background: "#FCEDEE", padding: "50px" }}>
      <Row>
        <Col>
          <FMTypography
            displayText={"Subscribe"}
            styleData={{
              textAlign: "center",
              marginBottom: "20px",
              fontSize: "32px",
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <FMTypography
            displayText={"Shop on the go"}
            styleData={{
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            }}
          />
          <ul style={{ padding: "0 0 0 1.2rem", margin: "1rem 0 0 0" }}>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                marginLeft: "1.1rem",
                // textAlign: "center",
              }}
            >
              Download mobile app
            </li>
            <li style={{ listStyle: "none", padding: "0 1rem 0 2rem" }}>
              <img
                src={androidIcon}
                alt="android-icon"
                style={{ marginRight: "1rem" }}
              />
              <img src={appleIcon} alt="apple-icon" />
            </li>
            <li
              style={{
                listStyle: "none",
                fontSize: "9px",
                fontWeight: "300",
                marginTop: "25px",
              }}
            >
              All Copyright reserved by © Webgross Pvt Ltd.
            </li>
          </ul>
        </Col>
        <Col>
          <FMTypography
            displayText={"About Company"}
            styleData={{
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            }}
          />
          <ul style={{ padding: "0 0 0 1.2rem", margin: "1rem 0 0 0" }}>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              About Us
            </li>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              WebGross Team
            </li>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Disclaimer
            </li>
          </ul>
        </Col>
        <Col>
          <FMTypography
            displayText={"Business"}
            styleData={{
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            }}
          />
          <ul style={{ padding: "0 0 0 1.2rem", margin: "1rem 0 0 0" }}>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Terms & Conditions
            </li>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Privacy and Policy
            </li>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Terms & Conditions
            </li>
          </ul>
        </Col>
        <Col>
          <FMTypography
            displayText={"Help"}
            styleData={{
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            }}
          />
          <ul style={{ padding: "0 0 0 1.2rem", margin: "1rem 0 0 0" }}>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Contact Us
            </li>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Privacy and Policy
            </li>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Terms & Conditions
            </li>
          </ul>
        </Col>
        <Col>
          <FMTypography
            displayText={"Policy Info"}
            styleData={{
              fontSize: "20px",
              fontWeight: "500",
              textAlign: "center",
            }}
          />
          <ul style={{ padding: "0 0 0 1.2rem", margin: "1rem 0 0 0" }}>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Policy & Terms
            </li>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Careers
            </li>
            <li
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                textAlign: "center",
              }}
            >
              Franchise
            </li>
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
