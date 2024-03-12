import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Card, CardContent, Typography } from '@mui/material';

const Inventory = () => {
    const dispatch = useDispatch();


    return (
        <>
              <Card variant="outlined">
      <CardContent>
        <Typography variant="h5" component="h2">
          Inventory
        </Typography>

      </CardContent>
    </Card>
        </>
    );
};

export default Inventory;
