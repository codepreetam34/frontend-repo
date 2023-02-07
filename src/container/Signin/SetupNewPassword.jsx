import React, { useState } from "react";
import { Box, Grid, InputBase } from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import FMButton from "components/FMButton/FMButton";
import FMTypography from "components/FMTypography/FMTypography";

import monkeyLogo from "../../assets/monkeyLogo.svg";
import VibezterLogo from "../../assets/VibezterLogo.svg";

import { commonStyle } from "Styles/commonStyles";
import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "Routes/Routes";
import FMOutlinedInput from "components/FMOutlinedInput/FMOutlinedInput";
import { tests } from "constants/AppConstant";

const SetupNewPassword = () => {
  const [passwordType, setPasswordType] = useState(true);
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
    watch,
    trigger,
    formState: { errors },
  } = useForm({
    resolver: yupResolver("setupPasswordSchema"),
    mode: "onChange",
  });

  const navigate = useNavigate();
  const afterResetPasswordNavigate = () => {
    navigate(LOGIN);
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
  const passwordToggle = () => setPasswordType(!passwordType);
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
                <Box>
                  <FMOutlinedInput
                    inputLabel="Password"
                    placeholder="Enter your password"
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
                </Box>

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
