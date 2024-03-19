import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Col, Container } from "react-bootstrap";
import AddProductForm from "./AddProductForm";
import { useNavigate } from "react-router";

const AddSingleCatalog = ({
    setAddShowErrorToast,
    setAddShowErrorToastMessage,
    setAddShowToast,
    setAddShowToastMessage, }) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState();
    const personLoggedInId = JSON.parse(
        localStorage.getItem("Sidebar_Module_Assigned_Vendor")
    )?._id;


    return (
        <>
            <Card variant="outlined" style={{ margin: "0 3rem" }}>
                <CardContent>
                    <Typography variant="h5" component="h2" onClick={() => navigate(-1)} style={{ cursor: 'pointer' }}>
                        <ChevronLeftIcon /> Add Single Catalog
                    </Typography>
                </CardContent>
            </Card>

            <Col md={12}>
                <Container className="pt-4">
                    <div className="user_table">
                        <div className="nftstable">
                            <div
                                className="tablearea"
                                style={{ margin: "0 auto", maxWidth: "62.375rem", padding: "0" }}
                            >
                                <Card variant="outlined" style={{ margin: "0 3rem" }}>
                                    <CardContent>
                                        <AddProductForm
                                            personLoggedInId={personLoggedInId}
                                            setIsLoading={setIsLoading}
                                            setAddShowErrorToast={setAddShowErrorToast}
                                            setAddShowErrorToastMessage={setAddShowErrorToastMessage}
                                            setAddShowToast={setAddShowToast}
                                            setAddShowToastMessage={setAddShowToastMessage}
                                        />
                                    </CardContent>
                                </Card>
                            </div>
                        </div>
                    </div>
                </Container>
            </Col>
        </>
    );
};

export default AddSingleCatalog;
