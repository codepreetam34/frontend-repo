import React from "react";
import InputLabel from "@mui/material/InputLabel";

const styles = {
  inputTitleStyle: {
    fontStyle: "normal",
    fontWeight: "500",
    fontSize: "0.875rem",
    lineHeight: "1.25rem",
    color: "#A3A3A3",
    opacity: 0.9,
    marginBottom: "0.375rem",
  },
  asterisk: {
    "& .MuiFormLabel-asterisk ": {
      color: "blue",
    },
  },
};

const FMInputLabel = (props) => {
  return (
    <InputLabel
      required={props.required}
      sx={{ ...styles.inputTitleStyle, ...styles.asterisk, ...props.styleData }}
    >
      {" "}
      {props.displayText}
    </InputLabel>
  );
};

export default FMInputLabel;
