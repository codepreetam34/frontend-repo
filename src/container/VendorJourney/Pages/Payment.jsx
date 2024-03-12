import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Col, Row } from "react-bootstrap";

const Payment = () => {
    const dispatch = useDispatch();


    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Payments
                    </Typography>

                </CardContent>
            </Card>


            <Box>
                <Row>
                    <Col md={6}>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <Typography variant="body1">Payments to Date</Typography>
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h5" sx={{ mr: 1 }}>
                                        ₹0
                                    </Typography>
                                    <Button variant="outlined" color="primary" size="small">
                                        <Typography variant="button" color="primary" sx={{ '&:hover': { color: '#EDEAFF' } }}>
                                            View Details
                                        </Typography>
                                    </Button>
                                </Box>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body1">Last Payment:</Typography>
                                <Typography variant="h5">₹0</Typography>
                                <Box display="flex" alignItems="center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#3C29B7" rotate="right">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.293 15.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L12 10.414l-5.293 5.293a1 1 0 01-1.414 0z" fill="#5A5E66" />
                                    </svg>
                                </Box>
                            </CardContent>
                        </Card>
                    </Col>
                    <Col md={6}>
                        <Card variant="outlined">
                            <CardContent>
                                <Typography variant="body1">Total Outstanding Payment</Typography>
                                <Box display="flex" alignItems="center">
                                    <Typography variant="h5" sx={{ mr: 1 }}>
                                        ₹0
                                    </Typography>
                                    <Button variant="outlined" color="primary" size="small">
                                        <Typography variant="button" color="primary" sx={{ '&:hover': { color: '#EDEAFF' } }}>
                                            View Details
                                        </Typography>
                                    </Button>
                                </Box>
                            </CardContent>
                            <CardContent>
                                <Typography variant="body1">Next Payment:</Typography>
                                <Typography variant="h5">₹0</Typography>
                                <Box display="flex" alignItems="center">
                                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#3C29B7" rotate="right">
                                        <path fillRule="evenodd" clipRule="evenodd" d="M5.293 15.707a1 1 0 010-1.414l6-6a1 1 0 011.414 0l6 6a1 1 0 01-1.414 1.414L12 10.414l-5.293 5.293a1 1 0 01-1.414 0z" fill="#5A5E66" />
                                    </svg>
                                </Box>
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Box>
        </>
    );
};

export default Payment;
