import * as React from "react";
import { Box } from "@mui/system";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";

export default function FMLoader(props) {
  const { showLoader } = props;
  const [open] = React.useState(false);

  return (
    <Box sx={props.styleData}>
      <Backdrop
        sx={{ color: "blue", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={showLoader || open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </Box>
  );
}
