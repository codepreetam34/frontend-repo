import React, { forwardRef } from "react";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
// import FMTypography from "Components/FMTypography";
// import { commonStyles } from "Styles/commonStyles";
// import { CANCEL_GREY_BORDER } from "Constants/Colors";
import { commonStyle } from "Styles/commonStyles";
import FMTypography from "components/FMTypography/FMTypography";

const styles = {
  onHoverStyles: {
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderRadius: "0.5rem",
      border: `0.0625rem solid #1a1a1a1f`,
    },
  },
};

const FMDropdown = (props) => {
  const {
    styledata,
    options,
    dropdownvalue,
    value,
    placeholder,
    size,
    variant,
    formControlStyles,
    inputLabel,
    dropDownTypographyStyle,
  } = props;

  return (
    <>
      <FormControl
        // fullWidth
        size={size}
        variant={variant}
        sx={formControlStyles}
      >
        {inputLabel && (
          <InputLabel id="demo-simple-select-filled-label">
            {inputLabel}
          </InputLabel>
        )}
        <Select
          inputProps={{ "aria-label": "Without label" }}
          sx={{
            ...styles.onHoverStyles,
            ...styledata,
          }}
          value={value}
          {...props}
        >
          <MenuItem disabled value="">
            {placeholder}
          </MenuItem>
          {options?.length !== 0 ? (
            options?.map((item, index) => {
              return (
                <MenuItem key={index} value={item.id}>
                  <FMTypography
                    displayText={item[`${dropdownvalue}`]}
                    styleData={{
                      ...commonStyle.commonTypographyStyle,
                      ...dropDownTypographyStyle,
                    }}
                  />
                </MenuItem>
              );
            })
          ) : (
            <MenuItem disabled value="No option found">
              {"No data found"}
            </MenuItem>
          )}
        </Select>
      </FormControl>
    </>
  );
};

export default forwardRef((props, ref) => <FMDropdown {...props} />);
