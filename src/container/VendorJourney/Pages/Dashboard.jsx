import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography, Button, Box } from '@mui/material';
import { useNavigate } from "react-router";
import { ADD_SINGLE_CATALOG } from "Routes/Routes";

const Dashboard = ({personLoggedInId}) => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Function to handle adding a single catalog
    const handleAddSingleCatalog = () => {
        // Implement the logic to add a single catalog here
        console.log("Adding a single catalog...");
        navigate(ADD_SINGLE_CATALOG)
    };

    // Function to handle adding catalogs in bulk
    const handleAddBulkCatalog = () => {
        // Implement the logic to add catalogs in bulk here
        console.log("Adding catalogs in bulk...");
    };

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Welcome Vibezter
                    </Typography>
                    <Typography color="textSecondary" gutterBottom>
                        Let’s get your business started in 3 steps
                    </Typography>
                    {/* Buttons to add single catalog and add catalogs in bulk */}
                </CardContent>
            </Card>
            <Box style={{display:'flex',gap:"1rem", marginTop:"1rem"}}>
                <Button variant="contained" color="primary" onClick={handleAddSingleCatalog}>
                    Add a Single Catalog
                </Button>
                {/* <Button variant="contained" color="secondary" onClick={handleAddBulkCatalog}>
                    Add Catalogs in Bulk
                </Button> */}
            </Box>
        </>
    );
};

export default Dashboard;
