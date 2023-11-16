import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Box } from "@mui/system";

import FMTypography from "../../components/FMTypography/FMTypography";

import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import { commonStyle } from "../../Styles/commonStyles";
import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";

const PrivacyPolicy = () => {
  return (
    <>
      <Box
        sx={{ ...commonStyle.flexDisplayStyle, padding: "1rem 50px 0 50px" }}
      >
        <img
          src={monkeyLogo}
          alt="monkeyLogo"
          style={HeaderStyle.monkeyLogoStyle}
        />
        <img
          src={VibezterLogo}
          alt="VibezterLogo"
          style={{ ...HeaderStyle.vibezterLogoStyle, marginTop: "0.6rem" }}
        />
      </Box>
      <Row style={{ width: "100%" }}>
        <Col
          style={{
            backgroundColor: "#FCEDEE",
            display: "flex",
            justifyContent: "center",
            algnItem: "center",
            padding: "50px 0",
          }}
        >
          <FMTypography
            displayText={"Privacy Policy"}
            styleData={{ fontSize: "60px", fontWeight: "500" }}
          />
        </Col>
      </Row>
      <Container>
        <Row style={{ marginTop: "40px" }}>
          <Col>
            <p style={{ fontWeight: "500", fontSize: "16px" }}>
              This Privacy Policy describes how IGP manage personal information
              and respect your privacy. This policy may be amended from time to
              time.
            </p>

            <ol>
              <li
                style={{
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "#717171",
                }}
              >
                Collection of Personal Information: As a visitor to the Site,
                you can engage in many activities without providing any Personal
                Information. Depending upon the activity, some of the
                information that we ask you to provide is identified as
                mandatory and some as voluntary. If you do not provide the
                mandatory data with respect to a particular activity, you will
                not be able to engage in that activity. However, when you
                register to use a IGP and order products as a IGP customer, in
                order to provide the services to you, we may collect your
                contact information such as your name, phone numbers, address
                and email address as well as profile information, including your
                password, details about your purchases and details about your
                interactions with us.
              </li>
              <li
                style={{
                  fontWeight: "400",
                  fontSize: "16px",
                  color: "#717171",
                }}
              >
                Collection of Personal Information: As a visitor to the Site,
                you can engage in many activities without providing any Personal
                Information. Depending upon the activity, some of the
                information that we ask you to provide is identified as
                mandatory and some as voluntary. If you do not provide the
                mandatory data with respect to a particular activity, you will
                not be able to engage in that activity. However, when you
                register to use a IGP and order products as a IGP customer, in
                order to provide the services to you, we may collect your
                contact information such as your name, phone numbers, address
                and email address as well as profile information, including your
                password, details about your purchases and details about your
                interactions with us.
              </li>
            </ol>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default PrivacyPolicy;
