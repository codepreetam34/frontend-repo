import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography } from '@mui/material';

const Dashboard = () => {
    const dispatch = useDispatch();


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
                </CardContent>
            </Card>
        </>
    );
};

export default Dashboard;
