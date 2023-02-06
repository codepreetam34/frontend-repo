import React from "react";
import { Box, Grid, InputBase } from "@mui/material";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";

import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";

import { commonStyle } from "Styles/commonStyles";
import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "Routes/Routes";

const SetupNewPassword = () => {
  const navigate = useNavigate();
  const afterResetPasswordNavigate = () => {
    navigate(LOGIN);
  };
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
          style={HeaderStyle.vibezterLogoStyle}
        />
      </Box>
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid item sx={commonStyle.innerGrid}>
          <Box sx={commonStyle.formDetailsContainer}>
            <FMTypography
              displayText="Reset Password"
              styleData={commonStyle.headingStyle}
            />
          </Box>
          <Box sx={commonStyle.formOuterBoxStyle}>
            <Box
              component="form"
              xs={12}
              //   onSubmit={handleSubmit(onSubmit)}
            >
              <Box sx={commonStyle.flexStyle}>
                <InputBase
                  required
                  id="userName"
                  name="userName"
                  placeholder="New Password"
                  sx={{
                    ...commonStyle.inputFieldStyle,
                    //   ...(errors.username && commonStyle.errorStyle),
                  }}
                  // {...register("username")}
                  // error={errors.username ? true : false}
                />
                {/* <FMTypography
          styleData={commonStyle.errorText}
          displayText={"errors.username?.message"}
        /> */}
                {/* <FMInputLabel
        styleData={commonStyle.inputLabelStyle}
        displayText={"Password"}
      /> */}

                {/* <FMTypography
          styleData={commonStyle.errorText}
          displayText={"errors.password?.message"}
        /> */}

                <InputBase
                  required
                  id="userName"
                  name="userName"
                  placeholder="Confirm New Password"
                  sx={{
                    ...commonStyle.inputFieldStyle,
                    //   ...(errors.username && commonStyle.errorStyle),
                  }}
                  // {...register("username")}
                  // error={errors.username ? true : false}
                />

                <FMButton
                  displayText={"Reset Password"}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    marginTop: "24px",
                  }}
                  // onClick={handleSubmit(onSubmit)}
                  onClick={afterResetPasswordNavigate}
                />
                <input type={"submit"} hidden />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default SetupNewPassword;
