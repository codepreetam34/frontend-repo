import React from 'react';
import { Box, Card, CardContent, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';

// Step 1 Component
const Step4 = ({ }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: "1rem", boxShadow: '0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)' }}>
            <CardContent>

                <Box>
                    <TextField label="Store Name" />
                    <div style={{
                        fontWeight: "600",
                        color: "rgb(90, 94, 102)",
                        fontSize: "0.8125rem",
                        marginBottom:"1rem",
                        marginTop:"5px",
                    }}>Eg. Business Name, Trade Name etc.</div>
                    <TextField label="Full Name" />
                </Box>

            </CardContent>
        </Card>
    );
};


export default Step4;
