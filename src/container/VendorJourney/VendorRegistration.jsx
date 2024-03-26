import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Button, Box, Accordion, AccordionSummary, AccordionDetails, Typography, Card, CardContent, useMediaQuery } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Step1 from './Step1';
import Step2 from './Step2';
import Step3 from './Step3';
import Step4 from './Step4';
import { Col, Container, Row } from 'react-bootstrap';
import HeaderWithoutNav from 'components/HeaderWithoutNav/HeaderWithoutNav';
import FMTypography from 'components/FMTypography/FMTypography';
import VendorFaqs from './VendorFaqs';
import FMButton from 'components/FMButton/FMButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import { useNavigate } from 'react-router';
import { VENDOR_HOME } from 'Routes/Routes';

const MultiStepForm = ({ steps, onFinish }) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [isBackDisabled, setIsBackDisabled] = React.useState(true);
  const isMobile = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const [taxOption, setTaxOption] = useState('');
  const [inputValue, setInputValue] = useState('');


  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setIsBackDisabled(false);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
    if (activeStep === 1) setIsBackDisabled(true);
  };

  const handleFinish = () => {
    onFinish();
    navigate(VENDOR_HOME)
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <HeaderWithoutNav />

      <Container fuild>
        <Row>

          <div style={{ padding: "0 2.8rem", textAlign: 'center' }}>
            <Box style={{
              display: 'flex', justifyContent: "space-between",
              alignItems: 'center', background: "#fff", marginTop: "10px",
              marginBottom: isMobile ? "10px" : "0rem", borderRadius: "4px",
              boxShadow: "0px 3px 6px 0 rgb(212 212 212 / 35%)",
              padding: "12px"
            }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "0 1rem",
                }}
              >
                <FMTypography
                  displayText={`Vendor Registration
                `}
                  styleData={{
                    fontWeight: "600",
                    fontSize: isMobile ? "14px" : "1.5rem",
                    textTransform: "capitalize",
                  }}
                />

              </Box>

            </Box>
          </div>

          <Col md={6}>
            <Box style={{ margin: '30px 30px' }}>
              <Card>
                <CardContent>
                  <Stepper activeStep={activeStep} alternativeLabel>
                    {steps.map((label, index) => (
                      <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                      </Step>
                    ))}
                  </Stepper>
                </CardContent>
              </Card>
              <Box sx={{ marginTop: 2 }}>

                <div>
                  {activeStep === 0 && <Step1 taxOption={taxOption} setTaxOption={setTaxOption} inputValue={inputValue} setInputValue={setInputValue} />}
                  {activeStep === 1 && <Step2 />}
                  {activeStep === 2 && <Step3 taxOption={taxOption} setTaxOption={setTaxOption} inputValue={inputValue} setInputValue={setInputValue} />}
                  {activeStep === 3 && <Step4 taxOption={taxOption} setTaxOption={setTaxOption} inputValue={inputValue} setInputValue={setInputValue} />}
                </div>

                <div className='d-flex gap-2'>
                  <FMButton
                    displayText={
                      <>
                        <ArrowBackIcon
                          style={{
                            marginRight: "8px",
                            color: "#801317",
                          }}
                        />
                        Back
                      </>
                    }
                    disabled={isBackDisabled}
                    variant="outlined"
                    styleData={{
                      borderRadius: "10px",
                      textTransform: "capitalize",
                      color: "black",
                      fontWeight: "600",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                    onClick={handleBack}
                  />

                  <FMButton
                    displayText={
                      <>
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                        <ArrowForwardIcon
                          style={{
                            marginLeft: "8px",
                            color: "#801317",
                          }}
                        />
                      </>
                    }
                    variant="outlined"
                    styleData={{
                      borderRadius: "10px",
                      textTransform: "capitalize",
                      color: "black",
                      fontWeight: "600",
                      fontSize: isMobile ? "12px" : "14px",
                    }}
                    onClick={activeStep === steps.length - 1 ? handleFinish : handleNext}
                    disabled={activeStep === steps.length - 1 && isBackDisabled}

                  />
                </div>
              </Box>
            </Box>
          </Col>

          <Col md={6}>
            <div style={{ margin: '30px 20px' }}>

              <VendorFaqs />
            </div>
          </Col>

        </Row>
      </Container>
    </div>
  );
};

const MyForm = () => {
  const steps = ['Tax Details', 'Pick Up Details', 'Bank Details', 'Supplier Details'];

  const handleFinish = () => {
    console.log('Finish button clicked!');
  };

  return <MultiStepForm steps={steps} onFinish={handleFinish} />;
};

export default MyForm;
