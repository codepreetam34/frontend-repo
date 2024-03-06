import { Grid } from "@mui/material";
import FMTypography from "../../components/FMTypography/FMTypography";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";
import React from "react";
import { commonStyle } from "../../Styles/commonStyles";
import { Box } from "@mui/system";
import { Link, useNavigate } from "react-router-dom";
import FMButton from "../../components/FMButton/FMButton";
import HeaderWithoutNav from "components/HeaderWithoutNav/HeaderWithoutNav";

const EmailVerify = () => {
  const navigate = useNavigate();
  return (
    <>
   <HeaderWithoutNav  />
      <Grid container sx={{ display: "flex", justifyContent: "center" }}>
        <Grid item sx={{ ...commonStyle.innerGrid }}>
          <FMTypography
            displayText={
              "Please verify mail by clicking on link sent on your email id"
            }
            sx={{ fontWeight: "600" }}
          />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <FMButton
              displayText={"Go to Login Page"}
              variant={"contained"}
              styleData={{
                ...commonStyle.buttonStyles,
                width: "247px",
                marginTop: "32px",
              }}
              onClick={() => {
                navigate("/login");
              }}
            />
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default EmailVerify;
