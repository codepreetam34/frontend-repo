import React from 'react';
import { Box, Card, CardContent, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import { Col } from 'react-bootstrap';

// Step 1 Component
const Step3 = ({ }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: "1rem", boxShadow: '0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)' }}>
            <CardContent>

                <Box style={{ display: "flex", gap: '1rem', flexDirection: "column" }}>
                    <TextField label="Bank Account" />
                    <TextField label="Confirm Bank Account" />
                    <TextField label="IFSC Code" />
                </Box>

            </CardContent>
        </Card>
    );
};

export default Step3;
