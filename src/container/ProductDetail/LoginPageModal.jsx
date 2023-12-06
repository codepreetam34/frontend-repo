import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, TextField, Button, Typography, Modal, Alert } from "@mui/material";
import Login from "container/Signin/Login";

const LoginPageModal = ({ showLoginPageModal, setShowLoginPageModal }) => {

    const handleModalClose = () => {
        setShowLoginPageModal(false)
    };

    const containerStyle = {
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "400px", // Adjust the maximum width as needed
        margin: "auto", // Center the component
    };

    return (
        <>
            <Modal open={showLoginPageModal}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: "30rem",
                        bgcolor: "white",
                        borderRadius: 4,
                        transition: "0.5s all ease-in-out",
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "center",
                            padding: "1rem",
                            borderBottom: "1px solid #ccc",
                        }}
                    >
                        <Typography variant="h6">Login Page</Typography>
                        <IconButton onClick={handleModalClose}>
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    {/* Content */}
                    <Box sx={{ padding: "2rem", overflowY: "scroll", height: "25rem" }}>
                        <Box sx={containerStyle}>
                            <Login setShowLoginPageModal={setShowLoginPageModal} showLoginPageModal={showLoginPageModal} />
                            {/* {error && <Alert severity="error">{error}</Alert>} */}

                        </Box>
                    </Box>

                    {/* Footer */}
                    <Box
                        sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                            padding: "1rem",
                            borderTop: "1px solid #ccc",
                        }}
                    >
                        <Button
                            variant="contained"
                            color="primary"
                            //       disabled={!pincodeData}
                            onClick={handleModalClose}
                        >
                            Login
                        </Button>
                    </Box>
                </Box>
            </Modal>

        </>
    );
}

export default LoginPageModal;
