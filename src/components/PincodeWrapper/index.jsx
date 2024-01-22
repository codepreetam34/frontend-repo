import React, { useState, useEffect } from "react";
import axios from "axios";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import {
  Box,
  IconButton,
  TextField,
  Button,
  Typography,
  Modal,
  Alert,
} from "@mui/material";
import StartupScreen from "components/StartpScreen";
import FMTypography from "components/FMTypography/FMTypography";
import { LocationOn } from "@material-ui/icons";
const PincodeWrapper = ({
  setHeaderPageModalOpen,
  headerPageModalOpen,
  pincodeData,
  setPincodeData,
  landingPageModalOpen,
  setLandingPageModalOpen,
  pincodeModalOpen,
  setPincodeModalOpen,
}) => {
  const [area, setArea] = useState("");
  const [error, setError] = useState("");
  const [checkedStoredPincode, setCheckedStoredPincode] = useState(true);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate an asynchronous operation (e.g., fetching data) that takes some time
    const simulateAsyncOperation = () => {
      setTimeout(() => {
        setLoading(false);
      }, 1000); // Adjust the duration as needed
    };

    simulateAsyncOperation();
  }, []);

  useEffect(() => {
    const storedPincode = sessionStorage.getItem("pincode");

    if (storedPincode) {
      setPincodeData(storedPincode);
      // Set pincodeModalOpen to false after processing stored pincode
      setPincodeModalOpen(false);
    } else if (checkedStoredPincode) {
      // Set pincodeModalOpen to true only during the initial render
      setCheckedStoredPincode(false);
      setPincodeData("");
    } else {
      setPincodeModalOpen(false);
      setPincodeData("");
    }
  }, []);
  const handleModalClose = () => {
    setPincodeModalOpen(false);
    if (pincodeData) {
      sessionStorage.setItem("pincode", pincodeData);
    }
  };

  const containerStyle = {
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    maxWidth: "400px", // Adjust the maximum width as needed
    margin: "auto", // Center the component
  };

  useEffect(() => {
    if (pincodeData?.length === 6) {
      setError("");
      axios
        .get(`https://api.postalpincode.in/pincode/${pincodeData}`)
        .then((res) => {
          const data = res.data[0].PostOffice[0];
          setArea(data.Name); // Change to data.City if you want to display the city instead
          setError("");
        })
        .catch((err) => {
          setError("Invalid PIN Code");
        });
    } else if (
      pincodeData.length === 0 ||
      pincodeData.length !== 6 ||
      pincodeData.length > 6 ||
      pincodeData.length < 6
    ) {
      setArea("");
      setError("ZIP code must be of 6 digits");
    }
  }, [pincodeData]);

  return (
    <>
      {loading ? (
        <StartupScreen />
      ) : (
        <>
          <Modal
            open={
              (pincodeModalOpen && landingPageModalOpen) ||
              (pincodeModalOpen && headerPageModalOpen)
            }
            sx={{}}
          >
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
                <Typography variant="h6">Select Delivery Location</Typography>
                <IconButton onClick={handleModalClose}>
                  <CloseIcon />
                </IconButton>
              </Box>

              {/* Content */}
              <Box sx={{ padding: "1rem 2rem" }}>
                <FMTypography
                  displayText={
                    "Please enter the correct delivery location or pincode to view available products and delivery options"
                  }
                  styleData={{
                    fontSize: "14px",
                    fontWeight: "600",
                    textAlign: "center",
                    marginBottom: "1rem",
                  }}
                />
                <Box sx={containerStyle}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    label="Pin Code"
                    value={pincodeData}
                    onChange={(e) => setPincodeData(e.target.value)}
                    id="pincode"
                    sx={{ marginBottom: "1rem" }}
                    error={error !== ""}
                    InputProps={{
                      startAdornment: (
                        <IconButton disabled>
                          <LocationOn />
                        </IconButton>
                      ),
                      endAdornment: pincodeData ? (
                        <IconButton
                          onClick={() => {
                            setPincodeData("");
                            sessionStorage.removeItem("pincode");
                          }}
                        >
                          <ClearIcon />
                        </IconButton>
                      ) : null,
                    }}
                  />

                  {error && <Alert severity="error">{error}</Alert>}
                  {area && (
                    <Box sx={{ marginTop: "20px" }}>
                      <TextField
                        fullWidth
                        label="Area"
                        disabled
                        value={area}
                        sx={{ background: "#f2f2f2" }}
                      />
                    </Box>
                  )}
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
                  disabled={!pincodeData}
                  onClick={handleModalClose}
                >
                  Continue Shopping
                </Button>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default PincodeWrapper;
