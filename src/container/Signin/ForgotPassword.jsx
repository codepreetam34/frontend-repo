import React from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { useNavigate } from "react-router-dom";

import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";

import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";

import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";
import { commonStyle } from "../../Styles/commonStyles";

import { LANDING_PAGE, SETUP_NEW_PASSWORD } from "../../Routes/Routes";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { forgotOtpSchema } from "../../validationSchema/forgotOtpSchema";
import FMOutlinedInput from "../../components/FMOutlinedInput/FMOutlinedInput";

import { useDispatch } from "react-redux";
import { resetPasswordLink } from "../../Redux/Slices/Login/resetPasswordLink";
import HeaderWithoutNav from "components/HeaderWithoutNav/HeaderWithoutNav";

const ForgotPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const resetPasswordNavigate = () => {
    navigate(SETUP_NEW_PASSWORD);
  };

  const onSubmit = (data) => {
    dispatch(resetPasswordLink(data));
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(forgotOtpSchema),
    mode: "onChange",
  });
  return (
    <>
     <HeaderWithoutNav  />
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid item sx={commonStyle.innerGrid}>
          <Box sx={commonStyle.formDetailsContainer}>
            <FMTypography
              displayText="Forgot Password"
              styleData={commonStyle.headingStyle}
            />
          </Box>
          <Box sx={commonStyle.formOuterBoxStyle}>
            <Box component="form" xs={12} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={commonStyle.flexStyle}>
                <Box>
                  <InputBase
                    required
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    sx={{
                      ...commonStyle.inputFieldStyle,

                      ...(errors.email && commonStyle.errorStyle),
                    }}
                    {...register("email")}
                    error={errors.email ? true : false}
                  />
                  <FMTypography
                    styleData={commonStyle.errorText}
                    displayText={errors.email?.message}
                  />
                </Box>

                <FMButton
                  displayText={"Send reset link"}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                  }}
                  onClick={handleSubmit(onSubmit)}
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

export default ForgotPassword;
