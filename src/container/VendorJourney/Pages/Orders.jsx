import React from "react";
import { Box, Tab, Tabs } from "@mui/material";
import { Card, CardContent, Typography } from '@mui/material';

// Separate components for each tab's content
const OnHoldContent = () => (
    <div>
        <Typography variant="body1">This is the On Hold tab content.</Typography>
    </div>
);

const PendingContent = () => (
    <div>
        <Typography variant="body1">This is the Pending tab content.</Typography>
    </div>
);

const ReadyToShipContent = () => (
    <div>
        <Typography variant="body1">This is the Ready to Ship tab content.</Typography>
    </div>
);

const ShippedContent = () => (
    <div>
        <Typography variant="body1">This is the Shipped tab content.</Typography>
    </div>
);

const CancelledContent = () => (
    <div>
        <Typography variant="body1">This is the Cancelled tab content.</Typography>
    </div>
);

const Orders = () => {
    const [value, setValue] = React.useState(1); // Set the initial selected tab index to 1 (Pending)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    // Function to render the content of the selected tab
    const renderTabContent = () => {
        switch (value) {
            case 0:
                return <OnHoldContent />;
            case 1:
                return <PendingContent />;
            case 2:
                return <ReadyToShipContent />;
            case 3:
                return <ShippedContent />;
            case 4:
                return <CancelledContent />;
            default:
                return null;
        }
    };

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Orders
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
                    <Tab label="On Hold (0)" />
                    <Tab label="Pending (0)" />
                    <Tab label="Ready to Ship (0)" />
                    <Tab label="Shipped" />
                    <Tab label="Cancelled" />
                </Tabs>
            </Box>
            {/* Render the content of the selected tab */}
            {renderTabContent()}
        </>
    );
};

export default Orders;
