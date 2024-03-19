import React, { useState, useEffect } from "react";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, TextField, Alert } from "@mui/material";
const PincodeInputWrapper = ({ pincodeData, setPincodeData,setDisabledDate }) => {
    const [area, setArea] = useState("");
    const [error, setError] = useState("");
    const [checkedStoredPincode, setCheckedStoredPincode] = useState(true);

    useEffect(() => {
        const storedPincode = sessionStorage.getItem("pincode");

        if (storedPincode) {
            setPincodeData(storedPincode);
            setDisabledDate(false)
        } else if (checkedStoredPincode) {
            setCheckedStoredPincode(false)
            setPincodeData('');
        }
        else {
            setPincodeData('');
        }
    }, []);


    useEffect(() => {
        if (pincodeData?.length === 6) {
            setError("");
            axios
                .get(`https://api.postalpincode.in/pincode/${pincodeData}`)
                .then((res) => {
                    const data = res.data[0].PostOffice[0];
                    setArea(data.Name); 
                    setError("");
                    setDisabledDate(false)
                    sessionStorage.setItem("pincode", pincodeData)
                })
                .catch((err) => {
                    setError("Invalid PIN Code");
                });
        } else if (pincodeData?.length === 0 || pincodeData?.length !== 6 || pincodeData?.length > 6 || pincodeData?.length < 6) {
            setArea("");
            setError("ZIP code must be of 6 digits");
        }
    }, [pincodeData]);

    return (
        <Box>

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
                    endAdornment: pincodeData ? (
                        <IconButton
                            onClick={() => {
                                setPincodeData('');
                                setDisabledDate(true)
                                sessionStorage.removeItem("pincode");
                            }}
                        >
                            <ClearIcon />
                        </IconButton>
                    ) : null,
                }}
            />

            {error && <Alert severity="error">{error}</Alert>}
            {area && <Box sx={{ marginTop: "10px" }}>
                <TextField
                    fullWidth
                    label="Area"
                    disabled
                    value={area}
                    sx={{ background: "#f2f2f2" }}
                />
            </Box>
            }
        </Box>

    );
}

export default PincodeInputWrapper;
