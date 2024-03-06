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
import { FORGOTPASSWORD, LANDING_PAGE, SIGNUP, VENDOR_REGISTRATION, VENDOR_SIGN_UP } from "../../Routes/Routes";
import FMButton from "../../components/FMButton/FMButton";
import FMTypography from "../../components/FMTypography/FMTypography";
import { login } from "../../Redux/Slices/Login/auth.slice";
import { commonStyle } from "../../Styles/commonStyles";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../validationSchema/loginSchema";
import { notify } from "../../components/FMToaster/FMToaster";
import { ErrorToaster, SuccessToaster } from "constants/util";
import HeaderWithoutNav from "components/HeaderWithoutNav/HeaderWithoutNav";
import { vendorSignInUser } from "Redux/Slices/RegisterAVendor/RegisterAVendorSlice";

const VendorJourney = ({ showLoginPageModal, setShowLoginPageModal }) => {
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

        console.log("data ", data)

        dispatch(vendorSignInUser(data))
            .unwrap()
            .then((res) => {
                if (res) {
                    console.log("res ", res)
                    navigate(VENDOR_REGISTRATION);
      //              notify({ type: "success", content: "Logged in successfully" });
                }
            })
            .catch((err) => {
                setShowErrorToast(true);
                setShowErrorToastMessage(err?.error?.response?.data?.message);
            });

    };

    return (
        <>
            <HeaderWithoutNav />

            <Grid
                container
                sx={{
                    display: "flex",
                    alignItems: "center",
                    background: "white",
                    justifyContent: "center",
                    padding: "1rem 3rem",
                }}
            >
                <Grid
                    item
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        padding: "2rem",
                        marginTop: "3rem",
                        marginBottom: "3rem",
                        borderRadius: "20px",
                        boxShadow: "rgba(11, 43, 158, 0.15) 0px 6px 20px -6px",
                        borderRadius: "24px",
                        border: "1px solid rgba(91, 105, 135, 0.22)",
                    }}
                >
                    {showLoginPageModal ? (
                        <>
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
                                        {errors.email?.message && (
                                            <FMTypography
                                                styleData={commonStyle.errorText}
                                                displayText={errors.email?.message}
                                            />
                                        )}
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
                                        {errors.password?.message && (
                                            <FMTypography
                                                styleData={commonStyle.errorText}
                                                displayText={errors.password?.message}
                                            />
                                        )}
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
                                            displayText={"Vendor Login"}
                                            variant={"contained"}
                                            styleData={{
                                                ...commonStyle.buttonStyles,
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
                                        <FMTypography displayText={"Don’t have an account?"} />
                                        <FMButton
                                            variant={"outlined"}
                                            displayText={"Vendor Sign Up"}
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
                                            onClick={() => navigate(VENDOR_SIGN_UP)}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    ) : (
                        <>
                            <Box sx={commonStyle.formDetailsContainer}>
                                <FMTypography
                                    displayText="Vendor Log In"
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
                                        {errors.email?.message && (
                                            <FMTypography
                                                styleData={commonStyle.errorText}
                                                displayText={errors.email?.message}
                                            />
                                        )}
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
                                        {errors.password?.message && (
                                            <FMTypography
                                                styleData={commonStyle.errorText}
                                                displayText={errors.password?.message}
                                            />
                                        )}
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
                                                marginBottom: "1rem"
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
                                        <FMTypography
                                            displayText={"Don’t have an account?"}
                                            styleData={{ color: "#717171" }}
                                        />
                                        <FMButton
                                            variant={"outlined"}
                                            displayText={"Vendor Sign Up"}
                                            styleData={{
                                                color: "#222222",
                                                padding: "2px 5px",
                                                fontSize: "1rem",
                                                fontWeight: "600",
                                                marginLeft: ".5rem",
                                                marginTop: "-.1rem",
                                            }}
                                            onClick={() => navigate(VENDOR_SIGN_UP)}
                                        />
                                    </Box>
                                </Box>
                            </Box>
                        </>
                    )}
                </Grid>

                {showErrorToast && (
                    <ErrorToaster
                        showErrorToast={showErrorToast}
                        setShowErrorToast={setShowErrorToast}
                        showErrorToastMessage={showErrorToastMessage}
                        customErrorMessage={
                            "Incorrect login credentials. Please verify and retry."
                        }
                    />
                )}
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

export default VendorJourney;
