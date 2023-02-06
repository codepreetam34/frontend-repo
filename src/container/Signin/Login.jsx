import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  OutlinedInput,
} from "@mui/material";
import { FORGOTPASSWORD } from "Routes/Routes";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";
import Header from "components/SearchBar/Header";

import { commonStyle } from "Styles/commonStyles";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const forgotPasswordNavigate = () => {
    navigate(FORGOTPASSWORD);
  };
  return (
    <>
      <Header />
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid item sx={commonStyle.innerGrid}>
          <Box sx={commonStyle.formDetailsContainer}>
            <FMTypography
              displayText="Log In"
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
                  placeholder="Enter your username"
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
                <OutlinedInput
                  placeholder="Enter your password"
                  // type={passwordType ? "password" : "text"}
                  sx={{
                    ...commonStyle.inputFieldStyle,
                    ...commonStyle.paddingZero,
                    //   ...(errors.password && commonStyle.errorStyle),
                  }}
                  // {...register("password")}
                  // error={errors.password ? true : false}
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        //   onClick={passwordToggle}
                        edge="end"
                        disableRipple={true}
                      >
                        {/* {passwordType ? <VisibilityOff /> : <Visibility />} */}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <Box sx={commonStyle.buttonBox}>
                  <FMButton
                    displayText={"Forgot Password?"}
                    variant={"text"}
                    styleData={{
                      ...commonStyle.textTransformStyle,
                      ...commonStyle.disableRippleStyle,
                    }}
                    onClick={forgotPasswordNavigate}
                  />
                </Box>
                <FMButton
                  displayText={"Login"}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                  }}
                  // onClick={handleSubmit(onSubmit)}
                />
                <input type={"submit"} hidden />

                {/* after ruler btns */}
                {/* <img src={OptLoginIcon} alt="otp-login" /> */}

                <FMButton
                  displayText={"Log In Via OTP"}
                  variant={"outlined"}
                  //   startIcon={<OptLoginIcon />}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    backgroundColor: "none",
                    marginTop: "29px",
                    color: "#222222",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "white",
                      border: "2px solid #E6E6E6",
                    },
                  }}

                  // onClick={handleSubmit(onSubmit)}
                />

                <FMButton
                  displayText={"Continue with Google"}
                  variant={"outlined"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    backgroundColor: "none",
                    marginTop: "29px",
                    color: "#222222",
                    border: "2px solid #E6E6E6",
                    "&:hover": {
                      backgroundColor: "white",
                      border: "2px solid #E6E6E6",
                    },
                  }}

                  // onClick={handleSubmit(onSubmit)}
                />
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
