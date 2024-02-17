import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Card, CardContent, Checkbox, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { memberRegisterFormSchema } from "validationSchema/memberRegisterFormSchema";
import FMTypography from "components/FMTypography/FMTypography";
import { PRIVACY_POLICY } from "Routes/Routes";

const useStyles = makeStyles((theme) => ({
    containerPadding: {
        padding: "50px 200px 0",
        marginBottom: "30px",
        [theme.breakpoints.down("sm")]: {
            padding: "20px 20px 0",
        },
    },

}));

const MemberRegisterForm = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery("(max-width:600px)");
    const [agreeTerms, setAgreeTerms] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(memberRegisterFormSchema),
        mode: "onChange",
    });

    const onSubmit = (data) => {

        if (agreeTerms) { // Step 3: Check if terms are agreed upon
            dispatch(registerAVendor(data)).then((res) => {
                // handle response if needed
            });
        } else {
            // Display an error message or handle the case where terms are not agreed upon
        }
    };


    const handleCheckboxChange = (event) => {
        setAgreeTerms(event.target.checked); // Step 2: Handle checkbox state change
    };

    return (
        <div className={classes.containerPadding}>
            <Card variant="outlined">
                <CardContent sx={{ padding: isMobile ? "1rem" : "1rem 2rem" }}>
                    <FMTypography
                        displayText={`Register A Vendor`}
                        styleData={{
                            fontWeight: "600",
                            fontSize: isMobile ? "1.5rem" : "2rem",
                            textTransform: "capitalize",
                            textAlign: "center",
                            paddingBottom: "10px"
                        }}
                    />

                    <form onSubmit={handleSubmit(onSubmit)}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Company Name"
                                    {...register("referenceNumber")}
                                    error={!!errors.referenceNumber}
                                    helperText={errors.referenceNumber?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Owner Name"
                                    {...register("vendorName")}
                                    error={!!errors.vendorName}
                                    helperText={errors.vendorName?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="PAN No. of the Vendor"
                                    {...register("panNumber")}
                                    error={!!errors.panNumber}
                                    helperText={errors.panNumber?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="GST No."
                                    {...register("gstNumber")}
                                    error={!!errors.gstNumber}
                                    helperText={errors.gstNumber?.message}
                                />
                            </Grid>
                        </Grid>

                        <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                            Address of Registered Office
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    fullWidth
                                    label="Enter Address 1"
                                    {...register("officeAddress1")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Enter Address 2"
                                    {...register("officeAddress2")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    {...register("officeCity")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    {...register("officeState")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    {...register("officePincode")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    {...register("officePhone")}
                                    error={!!errors.registeredOfficePhone}
                                    helperText={errors.registeredOfficePhone?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="E-mail Address"
                                    {...register("officeEmail")}
                                    error={!!errors.registeredOfficeEmail}
                                    helperText={errors.registeredOfficeEmail?.message}
                                />
                            </Grid>

                        </Grid>
                        <Typography variant="h6" gutterBottom sx={{ marginTop: 2 }}>
                            Address of Home
                        </Typography>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField
                                    fullWidth
                                    label="Enter Address 1"
                                    {...register("homeAddress1")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Enter Address 2"
                                    {...register("homeAddress2")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    {...register("homeCity")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    {...register("homeState")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    {...register("homePincode")}
                                    error={!!errors.homeAddress}
                                    helperText={errors.homeAddress?.message}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    {...register("homePhone")}
                                    error={!!errors.localOfficePhone}
                                    helperText={errors.localOfficePhone?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="E-mail Address"
                                    {...register("localOfficeEmail")}
                                    error={!!errors.localOfficeEmail}
                                    helperText={errors.localOfficeEmail?.message}
                                />
                            </Grid>

                        </Grid>

                        <Grid container alignItems="center" sx={{ padding: "1rem 0 0px", }}>
                            <Grid item>
                                <Checkbox
                                    checked={agreeTerms}
                                    onChange={handleCheckboxChange}
                                />
                            </Grid>
                            <Grid item>
                                <Typography variant="body2">
                                    I agree to the <a href={PRIVACY_POLICY} target="_blank">Terms of Service <span style={{
                                        color: "#e00000",
                                        marginRight: "4px"
                                    }}>*</span></a>
                                </Typography>
                            </Grid>
                        </Grid>
                        <hr />
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            sx={{ marginTop: 1 }}
                        >
                            Submit
                        </Button>
                    </form>
                </CardContent>
            </Card>

        </div>
    );
};

export default MemberRegisterForm;
