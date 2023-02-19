import * as React from "react";
import Box from "@mui/material/Box";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import { BORDER_GREY, BLACK } from "constants/colors";

const styles = {
  formLabelStyles: {
    fontWeight: 500,
    // "& .MuiFormLabel-asterisk": { color: PDSL_BLUE },
  },
  radioButtonBox: {
    margin: "0.375rem 1rem 0.3rem 0",
    border: `0.016rem solid ${BORDER_GREY}`,
    borderRadius: "0.375rem",
    height: "2.75rem",
    boxShadow: "0 0.25rem 0.5rem rgba(0,0,0,0.04)",
  },
  formControlLabelStyles: {
    ".MuiFormControlLabel-label": {
      color: BLACK,
      fontWeight: 400,
    },
  },
  radioStyles: {
    // marginLeft: "0.625rem",
    // color: GREY,
    color: "#000000",
    // "&.Mui-checked": { color: PDSL_BLUE },
    "&.Mui-checked": { color: "#000000" },
  },
};

export default function FMRadioButtons(props) {
  const {
    formLabel,
    radioButtons,
    onChecked,
    formLabelStyling,
    disabled,
    required,
    labelStyle,
    customRadioBoxStyle,
    customRadioStyle,
    customFormControlLabelStyles,
    ...restProps
  } = props;

  const onChangeHandler = (e) => {
    onChecked(e.target.value);
  };
  if (!radioButtons) return null;
  return (
    <FormControl>
      <FormLabel
        required={required}
        disabled={true}
        id="demo-row-radio-buttons-group-label"
        sx={{ ...styles.formLabelStyles, ...labelStyle, ...formLabelStyling }}
      >
        {formLabel}
      </FormLabel>
      <RadioGroup
        row
        aria-labelledby="demo-row-radio-buttons-group-label"
        name="row-radio-buttons-group"
        {...restProps}
      >
        {radioButtons.map((radio, index) => (
          <Box
            sx={{
              //   ...styles.radioButtonBox,
              ...customRadioBoxStyle,
            }}
            key={index}
          >
            <FormControlLabel
              key={index}
              value={radio.value}
              control={
                <Radio
                  disableRipple
                  sx={{ ...styles.radioStyles, ...customRadioStyle }}
                />
              }
              sx={{
                ...styles.formControlLabelStyles,
                ...customFormControlLabelStyles,
              }}
              label={radio.label}
              onChange={onChangeHandler}
            />
          </Box>
        ))}
      </RadioGroup>
    </FormControl>
  );
}
