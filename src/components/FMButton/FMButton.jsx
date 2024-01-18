import * as React from "react";
import Button from "@mui/material/Button";

export default function FMButton({
  displayText,
  onClick,
  styleData,
  variant,
  onHover,
  componentClass,
  background,
  ...restProps
}) {
  const hoverEffect = {
    "&:hover": {
      background: background ? background : "",
      color: onHover ? onHover : "",
    },
  };

  return (
    <Button
      variant={variant || "contained"}
      disableRipple
      disableElevation
      sx={{ ...styleData, ...hoverEffect }}
      onClick={onClick}
      {...restProps}
    >
      {displayText}
    </Button>
  );
}
