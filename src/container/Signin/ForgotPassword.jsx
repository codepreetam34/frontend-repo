import React from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";

import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";

import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import { commonStyle } from "Styles/commonStyles";

import { SETUP_NEW_PASSWORD } from "Routes/Routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotOtpSchema } from "validationSchema/forgotOtpSchema";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const resetPasswordNavigate = () => {
    navigate(SETUP_NEW_PASSWORD);
  };
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotOtpSchema),
    mode: "onChange",
  });
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
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid sx={{ display: "block" }}>
          <Grid item sx={{ ...commonStyle.innerGrid, marginTop: "4rem" }}>
            <Box sx={commonStyle.formDetailsContainer}>
              <FMTypography
                displayText="Forgot Password"
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
                    placeholder="Enter your email"
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

                  <FMButton
                    displayText={"Send OTP"}
                    variant={"contained"}
                    styleData={{
                      ...commonStyle.buttonStyles,
                      marginTop: "24px",
                    }}
                    // onClick={handleSubmit(onSubmit)}
                  />
                  <input type={"submit"} hidden />
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* after getting otp screen */}

          <Grid item sx={commonStyle.innerGrid}>
            <Box sx={commonStyle.formDetailsContainer}>
              <FMTypography
                displayText="Forgot Password"
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
                    placeholder="Enter your email"
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
                    placeholder="Enter OTP"
                    sx={{
                      ...commonStyle.inputFieldStyle,
                      //   ...(errors.username && commonStyle.errorStyle),
                    }}
                    // {...register("username")}
                    // error={errors.username ? true : false}
                  />

                  <FMButton
                    displayText={"Send OTP"}
                    variant={"contained"}
                    styleData={{
                      ...commonStyle.buttonStyles,
                      marginTop: "24px",
                    }}
                    // onClick={handleSubmit(onSubmit)}
                    onClick={resetPasswordNavigate}
                  />
                  <input type={"submit"} hidden />

                  <Box
                    sx={{
                      ...commonStyle.buttonBox,
                      justifyContent: "center",
                      marginBottom: "0px",
                    }}
                  >
                    <FMButton
                      displayText={"Resend OTP in 00:23 sec"}
                      variant={"text"}
                      styleData={{
                        ...commonStyle.textTransformStyle,
                        ...commonStyle.disableRippleStyle,
                      }}
                      //   onClick={forgotPasswordNavigate}
                    />
                  </Box>
                  <Box
                    sx={{
                      ...commonStyle.buttonBox,
                      justifyContent: "center",
                      marginBottom: "0px",
                    }}
                  >
                    <FMButton
                      displayText={"Resend OTP"}
                      variant={"text"}
                      styleData={{
                        ...commonStyle.textTransformStyle,
                        ...commonStyle.disableRippleStyle,
                      }}
                      //   onClick={resetPasswordNavigate}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default ForgotPassword;
