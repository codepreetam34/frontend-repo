import {
  Box,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
// import { commonStyles } from "MuiStyles";
import React, { useState } from "react";

const FMDropdown = ({
  name,
  options,
  id,
  // onChange,
  onBlur,
  error,
  errorSx,
  // value,
  defaultValue,
  sx,
  labelSx,
  controlSx,
  required,
  inputTagProps,
  inputProps,
  label,
  inputRef,
  disabled,
  IconComponent,
}) => {
  const [quantityOption, setQuantityOption] = useState(1);

  const optionChangeHandler = (e) => {
    setQuantityOption(e.target.value);
  };

  return (
    <Box sx={{ ...controlSx }}>
      {label && (
        <InputLabel sx={labelSx}>
          <Typography component="span">{label}</Typography>
          {required && (
            <Typography
              component="span"
              // sx={commonStyles.requiredInput}
            >
              *
            </Typography>
          )}
        </InputLabel>
      )}
      <Select
        required={required}
        id={id || name}
        name={name}
        onChange={optionChangeHandler}
        onBlur={onBlur}
        defaultValue={defaultValue}
        value={quantityOption}
        error={Boolean(error)}
        inputProps={inputTagProps}
        inputRef={inputRef}
        disabled={disabled}
        {...inputProps}
        // sx={value === "" ? { color: "grey" } : sx}
        sx={sx}
        displayEmpty
        notched={false}
        IconComponent={IconComponent}
      >
        <MenuItem disabled value="">
          Select
        </MenuItem>
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.id}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
      {typeof error === "string" &&
        {
          /* <FormHelperText sx={{ ...commonStyles.errorText, ...errorSx }}>
          {error}
        </FormHelperText> */
        }}
    </Box>
  );
};

export default FMDropdown;
