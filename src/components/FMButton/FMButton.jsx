import * as React from "react";
import Button from "@mui/material/Button";

export default function FMButton({
  displayText,
  onClick,
  styleData,
  variant,
  onHover,
  background,
  btnClass,
  ...restProps
}) {

  const hoverEffect = {
    ":hover": {
      backgound: background ? background : "",
      color: onHover ? onHover : "",
    },
  };

  return (
    <Button
      variant={variant || "contained"}
      className={btnClass}
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
