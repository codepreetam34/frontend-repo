import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Col, Row } from "react-bootstrap";
import { getVendorProducts } from "Redux/Slices/ProductPage/ProductsPageSlice";
import VendorProductPage from "./VendorProductPage";
const VendorProducts = () => {
    const dispatch = useDispatch();

    const productData = useSelector(
        (state) => state?.ProductsByCatId?.productsList?.products
    );
    useEffect(() => {
        dispatch(getVendorProducts());
    }, [dispatch]);

    return (
        <>
            <Card variant="outlined">
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Vendor Products
                    </Typography>
                </CardContent>
            </Card>

            <Box sx={{ mt: 2 }} style={{ height: "100vh" }}>
                <Row>
                    <Col>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <VendorProductPage productData={productData} />
                            </CardContent>
                        </Card>
                    </Col>
                </Row>
            </Box>
        </>
    );
};

export default VendorProducts;
