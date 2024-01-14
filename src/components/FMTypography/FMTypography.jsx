import React from "react";
import Typography from "@mui/material/Typography";
const style = {
  typographyStyle: {
    color: "black",
  },
};
const FMTypography = ({ displayText, styleData, className, ...restProps }) => {
  return (
    <Typography
      sx={{ ...style.typographyStyle, ...styleData }}
      {...restProps}
      className={className}
    >
      {displayText}
    </Typography>
  );
};

export default FMTypography;
