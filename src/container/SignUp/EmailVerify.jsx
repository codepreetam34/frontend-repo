import { Grid } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import React from "react";
import { commonStyle } from "Styles/commonStyles";
import { Box } from "@mui/system";

const EmailVerify = () => {
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
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item sx={commonStyle.innerGrid}>
          <FMTypography
            displayText={
              "Please verify mail by clicking on link sent on your email id"
            }
            sx={{ fontWeight: "600" }}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default EmailVerify;
