import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Card, CardContent, Typography } from '@mui/material';

// Separate components for each tab's content
const Active = () => (
    <div>
        <Typography variant="body1">This is the On Hold tab content.</Typography>
    </div>
);

const ActivationPending = () => (
    <div>
        <Typography variant="body1">This is the Pending tab content.</Typography>
    </div>
);

const Blocked = () => (
    <div>
        <Typography variant="body1">This is the Ready to Ship tab content.</Typography>
    </div>
);

const Paused = () => (
    <div>
        <Typography variant="body1">This is the Shipped tab content.</Typography>
    </div>
);



const Inventory = () => {
    const [value, setValue] = React.useState(1); // Set the initial selected tab index to 1 (Pending)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Function to render the content of the selected tab
    const renderTabContent = () => {
        switch (value) {
            case 0:
                return <Active />;
            case 1:
                return <ActivationPending />;
            case 2:
                return <Blocked />;
            case 3:
                return <Paused />;
            default:
                return null;
        }
    };

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Inventory
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
                    <Tab label="Active (0)" />
                    <Tab label="Activation Pending (0)" />
                    <Tab label="Blocked (0)" />
                    <Tab label="Paused (0)" />
                </Tabs>
            </Box>
            {/* Render the content of the selected tab */}
            {renderTabContent()}
        </>
    );
};

export default Inventory;
