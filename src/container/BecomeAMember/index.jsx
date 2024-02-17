import { Box, useMediaQuery } from "@mui/material";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Header from "components/SearchBar/Header";
import MemberRegisterForm from "./MemberRegisterForm";
import Footer from "components/Footer/Footer";

const BecomeAMember = () => {
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");

    return (
        <>
            <Header />
            <Container fluid>
                <div>
                    <MemberRegisterForm />
                </div>
            </Container>
            <Footer />
        </>
    );
};

export default BecomeAMember;












