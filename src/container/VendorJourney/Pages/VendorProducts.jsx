import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import { Col, Row } from "react-bootstrap";
import ViewProductForm from "./ViewProductPage/ViewProductForm";
import { getVendorProducts } from "Redux/Slices/ProductPage/ProductsPageSlice";
const VendorProducts = () => {
    const dispatch = useDispatch();

    const productData = useSelector(
        (state) => state?.ProductsByCatId?.productsList?.products
    );
    useEffect(() => {

        if (!productData || productData?.length === 0) {

            dispatch(getVendorProducts())
                .then(() => {
                    //   setIsLoading(false);
                })
                .catch(() =>
                    //setIsLoading(false)
                    console.log("err")
                );

        } else {
            //   setIsLoading(false);
        }
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


            <Box sx={{ mt: 2 }}>
                <Row>
                    <Col>
                        <Card variant="outlined" sx={{ mb: 2 }}>
                            <CardContent>
                                <ViewProductForm productData={productData} />
                            </CardContent>

                        </Card>
                    </Col>

                </Row>
            </Box>
        </>
    );
};

export default VendorProducts;
