import FMTypography from "../../components/FMTypography/FMTypography";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import androidIcon from "../../assets/androidIcon.svg";
import appleIcon from "../../assets/appleIcon.svg";
import footerLogo from "../../assets/FooterLogo.png"
import { Box, InputBase } from "@mui/material";
import FMButton from "../../components/FMButton/FMButton";
const Footer = () => {
  return (
    <Container fluid>
      {/* <Row>
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
      </Row> */}
      <Row style={{ background: "#FCEDEE", padding: "20px 50px 20px 50px" }}>
        <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>

          <div
            style={{
              fontSize: "14px",
              color: "#717171",
              fontWeight: "400",
              listStyle: "none",
              textAlign: "center",
              paddingBottom: "0.8rem"
            }}
          >
            <FMTypography
              displayText={"Subscribe"}
              styleData={{
                fontSize: "20px",
                fontWeight: "600",
                textAlign: "center",
                paddingBottom: "5px",
              }}
            />
            <Box sx={{ display: "flex", paddingTop: '10px', }}>

              <InputBase
                required
                id="text"
                name="text"
                placeholder="Enter Email"
                sx={{
                  width: "279px",
                  marginLeft: '10px',
                  height: "55px",
                  flexShrink: "0",
                  borderRadius: "16px 0px 0px 16px",
                  background: "#FFF",
                  padding: '5px 40px 5px'

                }}

              />
              <FMButton displayText={"Submit"} styleData={{
                width: "120px",
                height: "55px",
                flexShrink: "0",
                borderRadius: "0px 10px 10px 0px",
                background: "#801317",
                fontFamily: "Poppins",
                fontSize: "18px",
                fontStyle: "normal",
                fontWeight: "500",

              }}
                style={{ textTransform: "capatilize !important", }}
              />
            </Box>
          </div>
          <div>

          </div>
        </Col>
        <Col md={3}>
          <div
            style={{
              fontSize: "14px",
              color: "#717171",
              fontWeight: "400",
              listStyle: "none",
              marginLeft: "1.1rem", paddingBottom: "0.8rem"
              // textAlign: "center",
            }}
          >
            <img src={footerLogo} style={{ width: '100%' }} />
          </div>
          <div>

            <div
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                marginLeft: "1.1rem",
                // textAlign: "center",
              }}
            >
              319, Aggarwal Millennium Tower 1, above bittu tikki wala, Netaji Subhash Place, Pitam Pura, New Delhi, Delhi 110034
            </div>
            <div
              style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400",
                listStyle: "none",
                marginLeft: "1.1rem",
                padding: "1rem 0"
                // textAlign: "center",
              }}
            >
              hr@thewebgross.com</div>
            <div style={{ listStyle: "none", padding: "0 1rem 0 1rem", display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <div style={{
                fontSize: "14px",
                color: "#717171",
                fontWeight: "400"
                // textAlign: "center",
              }}>Available on:</div>
              <div>
                <img
                  src={androidIcon}
                  alt="android-icon"
                  style={{ marginRight: "1rem", width: '25px' }}
                />
                <img src={appleIcon} alt="apple-icon" style={{ width: '25px' }} />
              </div>
            </div>
          </div>
        </Col>
        <Col md={9} style={{ paddingTop: '1rem' }}>
          <Row>
            <Col>
              <div
                style={{
                  fontSize: "14px",
                  color: "#717171",
                  fontWeight: "400",
                  listStyle: "none",
                  textAlign: "center", paddingBottom: "0.8rem"
                }}
              >
                <FMTypography
                  displayText={"About Company"}
                  styleData={{
                    fontSize: "20px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                /> </div>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center",
                    paddingBottom: '5px'
                  }}
                >
                  About Us
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center",
                    paddingBottom: '5px'
                  }}
                >
                  Disclaimer
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center",
                    paddingBottom: '5px'
                  }}
                >
                  WebGross Team
                </div>
              </div>
            </Col>
            <Col>

              <div
                style={{
                  fontSize: "14px",
                  color: "#717171",
                  fontWeight: "400",
                  listStyle: "none",
                  textAlign: "center",
                  paddingBottom: "0.8rem"
                }}
              >
                <FMTypography
                  displayText={"Policy Info"}
                  styleData={{
                    fontSize: "20px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                />
              </div>
              <div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center", paddingBottom: '5px'
                  }}
                >
                  Careers
                </div>

                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center", paddingBottom: '5px'
                  }}
                >
                  Franchise
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center", paddingBottom: '5px'
                  }}
                >
                  Terms & Policy
                </div>
              </div>
            </Col>
            <Col>

              <div
                style={{
                  fontSize: "14px",
                  color: "#717171",
                  fontWeight: "400",
                  listStyle: "none",
                  textAlign: "center",
                  paddingBottom: "0.8rem"
                }}
              >
                <FMTypography
                  displayText={"Help"}
                  styleData={{
                    fontSize: "20px",
                    fontWeight: "500",
                    textAlign: "center",
                  }}
                />
              </div>
              <div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center", paddingBottom: '5px'
                  }}
                >
                  Contact Us
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center", paddingBottom: '5px'
                  }}
                >
                  Privacy Policy
                </div>
                <div
                  style={{
                    fontSize: "14px",
                    color: "#717171",
                    fontWeight: "400",
                    listStyle: "none",
                    textAlign: "center", paddingBottom: '5px'
                  }}
                >
                  Terms & Conditions
                </div>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row style={{ background: "#EAB6B8", padding: "15px 50px 15px 50px" }}>
        <Col style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ fontSize: '12px', color: "#801317", fontWeight: "700" }}>
            All Copyrght reserved by © Webgross Pvt Ltd.
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Footer;
