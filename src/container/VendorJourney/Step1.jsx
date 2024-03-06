import React from 'react';
import { Box, Card, CardContent, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';

// Step 1 Component
const Step1 = ({ taxOption, inputValue, setTaxOption, setInputValue }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: "1rem", boxShadow: '0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)' }}>
            <CardContent>
                <Box>
                    <p style={{ fontWeight: "600" }}>Choose your tax option</p>
                    <RadioGroup value={taxOption} onChange={(e) => setTaxOption(e.target.value)}>
                        <FormControlLabel value="GST No." style={{ fontWeight: "600" }} control={<Radio />} label="GST No." />
                        <FormControlLabel value="Enrollment No." style={{ fontWeight: "600" }} control={<Radio />} label="Enrollment No." />
                    </RadioGroup>
                </Box>
                {taxOption && (
                    <Box>
                        <TextField
                            label={taxOption === 'GST No.' ? 'GST No.' : 'Enrollment No.'}
                            value={inputValue}
                            style={{ fontWeight: "600" }}
                            onChange={(e) => setInputValue(e.target.value)}
                        />
                    </Box>
                )}
            </CardContent>
        </Card>
    );
};

export default Step1;
