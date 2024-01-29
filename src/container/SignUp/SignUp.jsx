import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Box, Grid, InputBase } from "@mui/material";

import { tests } from "../../constants/AppConstant";
import { EMAIL_VERIFY, FORGOTPASSWORD, LOGIN } from "../../Routes/Routes";

import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";

import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import { login } from "../../Redux/Slices/Login/auth.slice";

import { commonStyle } from "../../Styles/commonStyles";
import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";
import { setItem } from "../../services/commonService";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validationSchema/loginSchema";
import FMOutlinedInput from "../../components/FMOutlinedInput/FMOutlinedInput";
import { signUpSchema } from "../../validationSchema/signupSchema";
import { signUpUser } from "../../Redux/Slices/SignUp/SignUp";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [passwordType, setPasswordType] = useState(true);
  const [confirmPasswordType, setConfirmPasswordType] = useState(true);
  const [passwordErrors, setPassowordErrors] = useState({
    length: true,
    upperCase: true,
    lowerCase: true,
    symbol: true,
    digits: true,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
    mode: "onChange",
  });

  const passwordToggle = () => {
    setPasswordType(!passwordType);
  };
  const confirmPasswordToggle = () => {
    setConfirmPasswordType(!confirmPasswordType);
  };

  const handelPasswordChange = (e) => {
    const value = e.target.value;

    Object.keys(tests).forEach((error) => {
      const pattern = tests[error];
      setPassowordErrors((prev) => ({
        ...prev,
        [error]: !pattern.test(value),
      }));
    });
  };

  const registerField = (field, options = {}) => {
    const { onChange: fieldOnChange, ...restProps } = register(field);
    const { onChange } = options;

    const handleChange = (e) => {
      onChange?.(e);
      fieldOnChange(e);
    };

    return { onChange: handleChange, ...restProps };
  };

  const onSubmit = (data) => {
    const postData = {
      firstName: data?.firstName,
      lastName: data?.lastName,
      email: data?.email,
      password: data?.password,
      contactNumber: data?.contactNumber,
    };
    dispatch(signUpUser(postData))
      .unwrap()
      .then((res) => {
        if (res) {
          navigate(EMAIL_VERIFY);
        }
      });
  };

  return (
    <>
      <Box
        sx={{ ...commonStyle.flexDisplayStyle, padding: "1rem 50px 0 50px" }}
      >
        <Link to={"/"}>
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
        </Link>
      </Box>
      <Grid container sx={commonStyle.mainGridContainer}>
        <Grid item sx={{ ...commonStyle.innerGrid, width: "25rem" }}>
          <Box sx={commonStyle.formDetailsContainer}>
            <FMTypography
              displayText="Sign Up"
              styleData={commonStyle.headingStyle}
            />
          </Box>
          <Box sx={commonStyle.formOuterBoxStyle}>
            <Box component="form" xs={12} onSubmit={handleSubmit(onSubmit)}>
              <Box sx={commonStyle.flexStyle}>
                <Box sx={{ display: "flex" }}>
                  <Box sx={{ marginRight: "1rem" }}>
                    <InputBase
                      required
                      id="firstName"
                      name="firstName"
                      placeholder="Name"
                      sx={{
                        ...commonStyle.inputFieldStyle,

                        ...(errors.firstName && commonStyle.errorStyle),
                      }}
                      {...register("firstName")}
                      error={errors.firstName ? true : false}
                    />
                    {errors.lastName?.message && (
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.firstName?.message}
                      />
                    )}
                  </Box>
                  <Box>
                    <InputBase
                      required
                      id="lastName"
                      name="lastName"
                      placeholder="Last Name"
                      sx={{
                        ...commonStyle.inputFieldStyle,
                        ...(errors.lastName && commonStyle.errorStyle),
                      }}
                      {...register("lastName")}
                      error={errors.lastName ? true : false}
                    />
                    {errors.lastName?.message && (
                      <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.lastName?.message}
                      />
                    )}
                  </Box>
                </Box>

                <InputBase
                  required
                  id="contactNumber"
                  name="contactNumber"
                  placeholder="Enter your contact Number"
                  sx={{
                    ...commonStyle.inputFieldStyle,

                    ...(errors.contactNumber && commonStyle.errorStyle),
                  }}
                  {...register("contactNumber")}
                  error={errors.contactNumber ? true : false}
                />

                {errors.contactNumber?.message && (
                  <FMTypography
                    styleData={commonStyle.errorText}
                    displayText={errors.contactNumber?.message}
                  />
                )}

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
                {errors.email?.message && (
                  <FMTypography
                    styleData={commonStyle.errorText}
                    displayText={errors.email?.message}
                  />
                )}

                <FMOutlinedInput
                  // inputLabel="Password"
                  placeholder="New Password"
                  type={passwordType ? "password" : "text"}
                  register={registerField("password", {
                    onChange: handelPasswordChange,
                  })}
                  error={!!errors.password}
                  passwordToggle={passwordToggle}
                  passwordType={passwordType}
                  errors={errors}
                  errorKey="password"
                />

                <FMOutlinedInput
                  // inputLabel="Password"
                  placeholder="Confirm New Password"
                  type={confirmPasswordType ? "password" : "text"}
                  register={registerField("confirmPassword")}
                  error={!!errors.confirmPassword}
                  passwordToggle={confirmPasswordToggle}
                  passwordType={confirmPasswordType}
                  errors={errors}
                  errorKey="confirmPassword"
                />

                <FMButton
                  displayText={"Sign up"}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    marginTop: "5px",
                  }}
                  onClick={handleSubmit(onSubmit)}
                />
                <input type={"submit"} hidden />
              </Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  marginTop: "1rem",
                }}
              >
                <FMTypography displayText={"Already have an acoount?"} />
                <Link to={"/login"}>
                  <FMButton
                    variant={"outlined"}
                    displayText={"Log in"}
                    styleData={{
                      textTransform: "capitalize",
                      color: "#222222",
                      padding: "0",
                      fontSize: "1rem",
                      fontWeight: "600",
                      marginLeft: ".5rem",
                      marginTop: "-.1rem",

                    }}
                  />
                </Link>
              </Box>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </>
  );
};

export default Login;
