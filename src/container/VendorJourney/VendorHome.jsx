import React from 'react';
import { Accordion, AccordionSummary, AccordionDetails, Typography, Box } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const VendorHome = () => {
    return (
        <div style={{ margin: '30px 20px' }}>
            <div style={{ marginBottom: '1rem' }}>
                {/* <Box>
                    <p style={{ fontWeight: "600" }}>Frequently Asked Question</p>
                </Box> */}
                <Accordion style={{ boxShadow: "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>       <strong>Question 1:</strong> What is Lorem Ipsum?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                            <strong>Answer:</strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <Accordion style={{ boxShadow: "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>                  <strong>Question 2:</strong> Why do we use it?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                            <strong>Answer:</strong> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <Accordion style={{ boxShadow: "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>                <strong>Question 3:</strong> Where does it come from?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                            <strong>Answer:</strong> Contrary to popular belief, Lorem Ipsum is not simply random text.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <Accordion style={{ boxShadow: "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography>                 <strong>Question 4:</strong> What is Lorem Ipsum?
                        </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>

                            <strong>Answer:</strong> Lorem Ipsum is simply dummy text of the printing and typesetting industry.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
            <div style={{ marginBottom: '1rem' }}>
                <Accordion style={{ boxShadow: "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)" }}>
                    <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography><strong>Question 5:</strong> Why do we use it?</Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                        <Typography>
                            <strong>Answer:</strong> It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
                        </Typography>
                    </AccordionDetails>
                </Accordion>
            </div>
        </div>
    );
};

export default VendorHome;
