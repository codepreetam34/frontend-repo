import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "components/SearchBar/Header";

const BecomeAMember = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <>
            <Header />
            <Container>
                <div>
                    Become A Member
                </div>
            </Container>
        </>
    );
};

export default BecomeAMember;
