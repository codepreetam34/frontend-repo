import React from 'react';
import { Box, Card, CardContent, Radio, RadioGroup, FormControlLabel, TextField } from '@mui/material';
import { Col } from 'react-bootstrap';

// Step 1 Component
const Step2 = ({ }) => {
    return (
        <Card variant="outlined" style={{ marginBottom: "1rem", boxShadow: '0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)' }}>
            <CardContent>

                <Box style={{display:"flex",gap:'1rem', flexDirection:"column"}}>
                    {/* Add fields for Room/Floor/Building Number, Street/Locality, Landmark, Pincode, City, and State */}
                    <TextField label="Room/Floor/Building Number" />
                    <TextField label="Street/Locality" />
                    <TextField label="Landmark" />
                    <TextField label="Pincode" />
                    <TextField label="City" />
                    <TextField label="State" />
                </Box>

            </CardContent>
        </Card>
    );
};

export default Step2;
