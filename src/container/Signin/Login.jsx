import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
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
import { FORGOTPASSWORD, LANDING_PAGE, SIGNUP } from "../../Routes/Routes";
import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";
import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";
import { login } from "../../Redux/Slices/Login/auth.slice";
import { commonStyle } from "../../Styles/commonStyles";
import { HeaderStyle } from "../../components/SearchBar/HeaderStyle";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validationSchema/loginSchema";
import { notify } from "../../components/FMToaster/FMToaster";
import { ErrorToaster, SuccessToaster } from "constants/util";
import googleButtonIcon from "../../assets/googleButtonIcon.png";
import messageButtonIcon from "../../assets/messageButtonIcon.png";
const Login = ({ showLoginPageModal, setShowLoginPageModal }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const showToastMessage = location?.state?.showToastMessage;
  const [showErrorToast, setShowErrorToast] = useState(false);
  const [showErrorToastMessage, setShowErrorToastMessage] = useState();
  const [showToast, setShowToast] = useState(false);

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
    if (showLoginPageModal) {
      dispatch(login(data))
        .unwrap()
        .then((res) => {
          if (res?.user) {
            setShowLoginPageModal(false);
            setShowToast(true)
            showToastMessage(`${res?.user?.fullName} login successfully`)

          }
        })
        .catch((err) => {
          setShowErrorToast(true);
          setShowErrorToastMessage(err?.error?.response?.data?.message);
        });

    }
    else {
      dispatch(login(data))
        .unwrap()
        .then((res) => {
          if (res) {
            navigate(LANDING_PAGE, { state: { showToastMessage: res?.user?.fullName } });
            notify({ type: "success", content: "Logged in successfully" });
          }
        })
        .catch((err) => {
          setShowErrorToast(true);
          setShowErrorToastMessage(err?.error?.response?.data?.message);
        });
    };
  }


  return (
    <>
      <Box
        sx={{ ...commonStyle.flexDisplayStyle, padding: "1rem 50px 0 50px" }}
      >
        <a href={"/"}>
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
        </a>
      </Box>
      <Grid container sx={{
        display: "flex",
        alignItems: "center",
        background: "white",
        justifyContent: "center",
      }}>
        <Grid item sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "2rem",
          marginTop: "3rem",
          marginBottom: '3rem',
          borderRadius: "20px",
          boxShadow:
            " 0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
        }}>

          {showLoginPageModal ? <>
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
                  {errors.email?.message &&
                    <FMTypography
                      styleData={commonStyle.errorText}
                      displayText={errors.email?.message}
                    />
                  }
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
                  {errors.password?.message &&
                    <FMTypography
                      styleData={commonStyle.errorText}
                      displayText={errors.password?.message}
                    />}
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

                </Box>
                <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                  <FMTypography displayText={"Don’t have an account?"} />
                  <FMButton
                    variant={"outlined"}
                    displayText={"Sign Up"}
                    styleData={{
                      color: "#222222",
                      padding: "0",
                      fontSize: "1rem",
                      fontWeight: "600",
                      border: "none",
                      marginLeft: ".5rem",
                      marginTop: "-.1rem",
                      "&:hover": {
                        backgroundColor: "white",
                        border: "none",
                      },
                    }}
                    onClick={() => navigate(SIGNUP)}
                  />
                </Box>
              </Box>
            </Box>
          </>
            :
            <>
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
                    {errors.email?.message &&
                      <FMTypography
                        styleData={commonStyle.errorText}
                        displayText={errors.email?.message}
                      />
                    }
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
                    {errors.password?.message &&
                      <FMTypography
                        styleData={commonStyle.errorText}
                        displayText={errors.password?.message}
                      />}
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
                      displayText={
                        <>
                          <img src={messageButtonIcon} alt="Message Button" />&nbsp;
                          {" Log In Via OTP"}
                        </>
                      }
                      variant={"outlined"}
                      styleData={{
                        ...commonStyle.buttonStyles,
                        backgroundColor: "none",
                        marginTop: "1rem",
                        color: "#222222",
                      }}
                    />


                    <FMButton
                      displayText={
                        <>
                          <img src={googleButtonIcon} alt="Google Button" /> &nbsp;
                          {" Continue with Google"}
                        </>
                      }
                      variant={"outlined"}
                      styleData={{
                        ...commonStyle.buttonStyles,
                        backgroundColor: "none",
                        marginTop: "1rem",
                        color: "#222222",
                      }}
                    />

                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center", marginTop: "1rem" }}>
                    <FMTypography displayText={"Don’t have an account?"}  styleData={{color:"#717171"} }/>
                    <FMButton
                      variant={"outlined"}
                      displayText={"Sign Up"}
                      styleData={{
                        color: "#222222",
                        padding: "0",
                        fontSize: "1rem",
                        fontWeight: "600",
                        border: "none",
                        marginLeft: ".5rem",
                        marginTop: "-.1rem",
                        "&:hover": {
                          backgroundColor: "white",
                          border: "none",
                        },
                      }}
                      onClick={() => navigate(SIGNUP)}
                    />
                  </Box>
                </Box>
              </Box>
            </>}
        </Grid>
        {showErrorToast &&
          <ErrorToaster
            showErrorToast={showErrorToast}
            setShowErrorToast={setShowErrorToast}
            showErrorToastMessage={showErrorToastMessage}
            customErrorMessage={
              "Incorrect login credentials. Please verify and retry."
            }
          />
        }
        {showToast && (
          <SuccessToaster
            showToast={showToast}
            setShowToast={setShowToast}
            showToastMessage={showToastMessage}
            customMessage={`Logout successful. Have a great day! `}
          />
        )}
      </Grid>
    </>
  );
};

export default Login;
