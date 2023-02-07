import React, { useState } from "react";
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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { FORGOTPASSWORD, LANDING_PAGE } from "Routes/Routes";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";

import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import { login } from "Redux/Slices/Login/auth.slice";

import { commonStyle } from "Styles/commonStyles";
import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import { setItem } from "services/commonService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "validationSchema/loginSchema";
import FMInputLabel from "components/FMInputLabel/FMInputLabel";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState(true);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const forgotPasswordNavigate = () => {
    navigate(FORGOTPASSWORD);
  };
  const passwordToggle = () => {
    setPasswordType(!passwordType);
  };

  const onSubmit = (data) => {
    localStorage.clear();
    dispatch(login(data))
      .unwrap()
      .then((res) => {
        if (res.success) {
          setItem("userData", res?.data);
          navigate(LANDING_PAGE);
        }
      });
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
          style={{ ...HeaderStyle.vibezterLogoStyle, marginTop: "0.6rem" }}
        />
      </Box>
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid item sx={commonStyle.innerGrid}>
          <Box sx={commonStyle.formDetailsContainer}>
            <FMTypography
              displayText="Log In"
              styleData={commonStyle.headingStyle}
            />
          </Box>
          <Box sx={commonStyle.formOuterBoxStyle}>
            <Box component="form" xs={12} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={commonStyle.flexStyle}>
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
                <FMInputLabel
                  styleData={commonStyle.inputLabelStyle}
                  displayText={"Password"}
                />
                <OutlinedInput
                  placeholder="Enter your password"
                  type={passwordType ? "password" : "text"}
                  sx={{
                    ...commonStyle.inputFieldStyle,
                    ...commonStyle.paddingZero,
                    ...(errors.password && commonStyle.errorStyle),
                  }}
                  {...register("password")}
                  error={errors.password ? true : false}
                  endAdornment={
                    <InputAdornment position="start">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={passwordToggle}
                        edge="end"
                        disableRipple={true}
                      >
                        {passwordType ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  }
                />
                <FMTypography
                  styleData={commonStyle.errorText}
                  displayText={errors.password?.message}
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
                  onClick={handleSubmit(onSubmit)}
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
