import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Footer from '../../../components/Footer/Footer';
import Header from '../../../components/SearchBar/Header';
import AddToCart from "../AddToCart";
import ProductPayment from "../ProductPayment";
import AddAddress from "../AddAddress";
import { Col, Container, Row } from "react-bootstrap";
import FMButton from '../../../components/FMButton/FMButton';
import { commonStyle } from '../../../Styles/commonStyles';
import { ArrowBack } from '@material-ui/icons';
const steps = ["Cart", "Address", "Payment"];

import { makeStyles } from '@mui/styles';
import { useMediaQuery } from '@mui/material';

const useStyles = makeStyles((theme) => ({
  arrowBack: {
    fontSize: '1.5rem',
    [theme.breakpoints.down('sm')]: {
      fontSize: '1rem',
    },
  },
}));
export default function HorizontalLinearStepper() {

  const [activeStep, setActiveStep] = React.useState(0);
  const [skipped, setSkipped] = React.useState(new Set());
  const classes = useStyles();

  const isMobile = useMediaQuery("(max-width:600px)");
  const [totalAmount, setTotalAmount] = React.useState();
  const [discountCoupon, setDiscountCoupon] = React.useState();

  const isStepOptional = (step) => {
    return step === 1;
  };

  const isStepSkipped = (step) => {
    return skipped.has(step);
  };

  const handleNext = (totalAmt, discountCoupon) => {
    setTotalAmount(totalAmt)
    setDiscountCoupon(discountCoupon)
    let newSkipped = skipped;
    if (isStepSkipped(activeStep)) {
      newSkipped = new Set(newSkipped.values());
      newSkipped.delete(activeStep);
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped(newSkipped);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleSkip = () => {
    if (!isStepOptional(activeStep)) {
      // You probably want to guard against something like this,
      // it should never occur unless someone's actively trying to break something.
      throw new Error("You can't skip a step that isn't optional.");
    }

    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setSkipped((prevSkipped) => {
      const newSkipped = new Set(prevSkipped.values());
      newSkipped.add(activeStep);
      return newSkipped;
    });
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  const dataOnStepper = () => {
    if (activeStep === 0) {
      return (<AddToCart handleNext={handleNext} />);
    } else if (activeStep === 1) {
      return (<AddAddress handleNext={handleNext} totalAmount={totalAmount} discountCoupon={discountCoupon} />);
    } else if (activeStep === 2) {
      return (<ProductPayment totalAmount={totalAmount} />);
    }
  }

  return (
    <>
      <Header />
      <Container fluid className=" m-0 p-0">
        <Row className=" m-0 p-0" style={{ width: "100%", marginTop: '40px' }}>

          <Col style={{
            padding: "1rem 0", display: "flex", justifyContent: 'center', gap: "0.5",
            '@media (max-width: 600px)': {
              gap: '0.1rem'
            }
          }}>
            <Box>


              <FMButton
                variant={'outlined'}
                displayText={
                  <>
                    <ArrowBack className={classes.arrowBack} />&nbsp;{isMobile ? "" : "Back"}
                  </>

                }
                disabled={activeStep === 0}
                onHover={"#801319"}
                styleData={{
                  ...commonStyle.buttonStyles,
                  backgroundColor: "none",
                  borderRadius: "10px",
                  fontFamily: "Poppins",
                  color: "#000",
                  fontSize: "1rem",
                  fontStyle: "normal",
                  padding: isMobile ? "0" : "5px 15px",
                  fontWeight: "500",
                  '@media (max-width: 600px)': {
                    fontSize: "10px",
                  }
                }}
                onClick={handleBack}
              />

            </Box>
            <Stepper activeStep={activeStep} sx={{
              ".MuiStepConnector-root": {
                top: 0,
              },
              ".MuiStepConnector-root span": {
                borderColor: "transparent",
              },
              ".MuiStepConnector-root span::before": {
                display: "flex",
                justifyContent: "center",
                alignItems: 'center',
                content: '">"',
              },
            }}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};
                // if (isStepOptional(index)) {
                //   labelProps.optional = (
                //     <Typography variant="caption">Optional</Typography>
                //   );
                // }
                if (isStepSkipped(index)) {
                  stepProps.completed = false;
                }
                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}><span style={{ fontSize: isMobile ? "0.7rem" : "0.8rem" }}>{label}</span></StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {/* {activeStep === steps.length - 1 ?
            <Box>

              <FMButton
                displayText={activeStep === steps.length - 1 ? 'Pay Now' : ""}
                disabled={activeStep === 0}
                variant={"contained"}
                styleData={{
                  ...commonStyle.buttonStyles,
                  width: "100%",

                }}
                onClick={handleNext}
              />



            </Box>
            : <>
            </>} */}
            {activeStep === steps.length ? (

              <Box>
                <FMButton
                  displayText={activeStep === steps.length ? 'Reset' : ""}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    width: "100%",

                  }}
                  onClick={handleReset}
                />
              </Box>
            ) : <></>
            }
          </Col>
          {activeStep === steps.length ? (
            <Col md={12} style={{ display: 'flex', justifyContent: 'center' }}>
              <Typography sx={{ mt: 2, mb: 2, color: "green" }}>
                Payment has been done Successfully.
              </Typography>
              {/* <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button onClick={handleReset}>Reset</Button>
            </Box> */}
            </Col>
          ) : (
            <Col md={12} style={{ display: 'flex', justifyContent: 'center', gap: "1rem", }}>
              {/* <Typography sx={{ mt: 2, mb: 1 }}>Step {activeStep + 1}</Typography> */}

              {/* {isStepOptional(activeStep) && (
                <Button color="inherit" onClick={handleSkip} sx={{ mr: 1 }}>
                  Skip
                </Button>
              )} */}


              {/* {activeStep === steps.length - 1 ?
              <Box>

                <FMButton
                  displayText={activeStep === steps.length - 1 ? 'Finish' : ""}
                  disabled={activeStep === 0}
                  variant={"contained"}
                  styleData={{
                    ...commonStyle.buttonStyles,
                    width: "100%",

                  }}
                  onClick={handleNext}
                />



              </Box>
              : <>
              </>} */}
            </Col>
          )}

          {dataOnStepper()}
        </Row>
      </Container>
      <Footer />

    </>

  );
}