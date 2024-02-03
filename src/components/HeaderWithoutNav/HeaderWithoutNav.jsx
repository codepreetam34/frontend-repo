import { Grid } from "@mui/material";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { HeaderStyle } from "../SearchBar/HeaderStyle";
import { commonStyle } from "../../Styles/commonStyles";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import { LANDING_PAGE } from "Routes/Routes";

const HeaderWithoutNav = () => {
  return (
    <>
      <Grid sx={HeaderStyle.headerFullStyle}>
        <Row style={{ ...HeaderStyle.iconGridContainer, margin: "0" }}>

          <Col style={{...commonStyle.flexDisplayStyle,justifyContent:"center"}}>
            <a href={LANDING_PAGE} style={{ display: "flex", alignItems: "center" }}>
              <img
                src={monkeyLogo}
                alt="monkeyLogo"
                style={HeaderStyle.monkeyLogoStyle}
              />
              <img
                src={VibezterLogo}
                alt="VibezterLogo"
                style={{ ...HeaderStyle.vibezterLogoStyle }}
              />
            </a>
          </Col>

        </Row>
      </Grid>
    </>
  );
};

export default HeaderWithoutNav;
