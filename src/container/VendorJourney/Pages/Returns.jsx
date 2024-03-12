import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Card, CardContent, Typography } from '@mui/material';

// Separate components for each tab's content
const Overview = () => (
    <div>
        <Typography variant="body1">This is the On Overview tab content.</Typography>
    </div>
);

const ReturnTracking = () => (
    <div>
        <Typography variant="body1">This is the ReturnTracking tab content.</Typography>
    </div>
);

const ClaimTracking = () => (
    <div>
        <Typography variant="body1">This is the ClaimTracking tab content.</Typography>
    </div>
);

const CourierPartner = () => (
    <div>
        <Typography variant="body1">This is the CourierPartner tab content.</Typography>
    </div>
);


const Returns = () => {
    const [value, setValue] = React.useState(1); // Set the initial selected tab index to 1 (Pending)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Function to render the content of the selected tab
    const renderTabContent = () => {
        switch (value) {
            case 0:
                return <Overview />;
            case 1:
                return <ReturnTracking />;
            case 2:
                return <ClaimTracking />;
            case 3:
                return <CourierPartner />;
            default:
                return null;
        }
    };

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Return/RTO Orders
                    </Typography>
                </CardContent>
            </Card>
            <Box mb={2}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    variant="scrollable"
                    scrollButtons="auto"
                >
                    <Tab label="Overview" />
                    <Tab label="Return Tracking" />
                    <Tab label="Claim Tracking" />
                    <Tab label="Courier Partner" />

                </Tabs>
            </Box>
            {/* Render the content of the selected tab */}
            {renderTabContent()}
        </>
    );
};

export default Returns;
