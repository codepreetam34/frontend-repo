import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import monkeyLogo from "../../../assets/monkeyLogo.svg";
import VibezterLogo from "../../../assets/VibezterLogo.svg";
import AddToCart from "../AddToCart/AddToCart";
import ProductPayment from "../ProductPayment/ProductPayment";
import AddAddress from "../AddAddress/AddAddress";
import { Grid } from "@mui/material";
import { Col, Row } from "react-bootstrap";
import { commonStyle } from "Styles/commonStyles";
import { HeaderStyle } from "components/SearchBar/HeaderStyle";
import { Link } from "react-router-dom";

const steps = ["Cart", "Address", "Payment"];

export default function HorizontalLinearStepper() {
  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = () => {
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleReset = () => {
    setActiveStep(0);
  };
  var dataOnStepper;
  if (activeStep === 0 || activeStep === 1) {
    dataOnStepper = <AddToCart handleNext={handleNext} />;
  } else if (activeStep === 2) {
    dataOnStepper = <AddAddress handleNext={handleNext} />;
  } else if (activeStep === 3) {
    dataOnStepper = <ProductPayment />;
  }

  return (
    <Row style={{ width: "100%" }}>
      <Col
        style={{ ...commonStyle.flexDisplayStyle, padding: "1rem 50px 0 50px" }}
      >
        <Link to={"/"}>
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
        </Link>
      </Col>

      <Col style={{ width: "30%", margin: "2rem auto " }}>
        <Stepper
          activeStep={activeStep}
          sx={{
            ".MuiStepConnector-root": {
              top: 0,
            },
            ".MuiStepConnector-root span": {
              borderColor: "transparent",
            },
            ".MuiStepConnector-root span::before": {
              display: "flex",
              justifyContent: "center",
              content: '">"',
            },
          }}
        >
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps}>{label}</StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Col>
      <Col></Col>

      {dataOnStepper}

      {/* {activeStep === steps.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
            <Button onClick={handleReset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          <AddToCart />
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />

            <Button onClick={handleNext}>
              {activeStep === steps.length - 1 ? "Finish" : "Place ORder"}
            </Button>
          </Box>
        </React.Fragment>
      )} */}
    </Row>
  );
}
