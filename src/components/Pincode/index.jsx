import React, { useState, useEffect } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";

function Pincode({ setPincodeValue }) {
    
    // <Pincode setPincodeValue={setPincodeValue} />

    const [pincode, setPincode] = useState("");
    const [area, setArea] = useState("");
    const [error, setError] = useState("");

    const containerStyle = {
        padding: "20px",
        border: "1px solid #ccc",
        borderRadius: "5px",
        maxWidth: "400px", // Adjust the maximum width as needed
        margin: "auto", // Center the component
    };

    useEffect(() => {
        if (pincode.length === 6) {
            setError("");
            axios
                .get(`https://api.postalpincode.in/pincode/${pincode}`)
                .then((res) => {
                    const data = res.data[0].PostOffice[0];
                    setArea(data.Name); // Change to data.City if you want to display the city instead
                    setPincodeValue(pincode)
                })
                .then(() => {
                    document.getElementById("pincode").classList.remove("error");
                })
                .catch((err) => {
                    document.getElementById("pincode").classList.add("error");
                    setError("Invalid PIN Code");
                });
        } else if (pincode.length !== 6) {
            setArea("");
            setError("ZIP code must be of 6 digits");
        }
    }, [pincode]);

    return (
        <Box sx={containerStyle}>
            <TextField
                fullWidth
                variant="outlined"
                label="Pin Code"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                id="pincode"
                sx={{ marginBottom: "1rem" }}
                error={error !== ""}
            />
            {error && <Alert severity="error">{error}</Alert>}
            {area && <Box sx={{ marginTop: "20px" }}>
                <TextField
                    fullWidth
                    label="Area"
                    disabled
                    value={area}
                />
            </Box>
            }
        </Box>
    );
}

export default Pincode;
