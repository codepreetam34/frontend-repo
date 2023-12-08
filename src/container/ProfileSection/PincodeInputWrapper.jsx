import React, { useState, useEffect } from "react";
import axios from "axios";
import ClearIcon from '@mui/icons-material/Clear';
import { Box, IconButton, TextField, Alert, InputBase } from "@mui/material";
import { commonStyle } from "../../Styles/commonStyles";
const PincodeInputWrapper = ({ pincodeData, setPincodeData, }) => {
    const [area, setArea] = useState("");
    const [error, setError] = useState("");
    const [checkedStoredPincode, setCheckedStoredPincode] = useState(true);

    useEffect(() => {
        const storedPincode = sessionStorage.getItem("pincode");

        if (storedPincode) {
            setPincodeData(storedPincode);

        } else if (checkedStoredPincode) {
            // Set pincodeModalOpen to true only during the initial render
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
                    setArea(data.Name); // Change to data.City if you want to display the city instead
                    setError("");
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
                sx={{
                    ...commonStyle.inputFieldPincodeStyle,
                }}
                error={error !== ""}
                InputProps={{
                    endAdornment: pincodeData ? (
                        <IconButton
                            onClick={() => {
                                setPincodeData('');
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
                    sx={{
                        ...commonStyle.inputFieldPincodeStyle,
                    }}
                />
            </Box>
            }
        </Box>

    );
}

export default PincodeInputWrapper;
