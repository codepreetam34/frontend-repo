import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography } from '@mui/material';

const Customers = () => {
    const dispatch = useDispatch();


    return (
        <>
           <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Customer
        </Typography>

      </CardContent>
    </Card>
        </>
    );
};

export default Customers;
