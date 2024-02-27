import React, { useState } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { Box, Button, Card, CardContent, Checkbox, Grid, TextField, Typography, useMediaQuery } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { memberRegisterFormSchema } from "validationSchema/memberRegisterFormSchema";
import FMTypography from "components/FMTypography/FMTypography";
import { PRIVACY_POLICY } from "Routes/Routes";
import { addAVendor } from "Redux/Slices/RegisterAVendor/RegisterAVendorSlice";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router";

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
    const navigate = useNavigate();
    const isMobile = useMediaQuery("(max-width:600px)");
    const [agreeTerms, setAgreeTerms] = useState(false);
    const [aadharCardFile, setAadharCardFile] = useState();
    const [gstCertificateFile, setGstCertificateFile] = useState();
    const [showSuccessMessage, setShowSuccessMessage] = useState(false); // Step 2

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(memberRegisterFormSchema),
        mode: "onChange",
    });

    const onSubmit = (data) => {

        if (agreeTerms) {

            const formData = new FormData();
            formData.append("shopName", data.shopName);
            formData.append("vendorName", data.vendorName);
            formData.append("panNumber", data.panNumber);
            formData.append("gstNumber", data.gstNumber);
            formData.append("aadharCard", aadharCardFile);
            formData.append("gstCertificate", gstCertificateFile);
            formData.append("officeAddress1", data.officeAddress1);
            formData.append("officeAddress2", data.officeAddress2);
            formData.append("officeCity", data.officeCity);
            formData.append("officeState", data.officeState);
            formData.append("officePincode", data.officePincode);
            formData.append("officePhone", data.officePhone);
            formData.append("officeEmail", data.officeEmail);
            formData.append("homeAddress1", data.homeAddress1);
            formData.append("homeAddress2", data.homeAddress2);
            formData.append("homeCity", data.homeCity);
            formData.append("homeState", data.homeState);
            formData.append("homePincode", data.homePincode);
            formData.append("homePhone", data.homePhone);
            formData.append("homeEmail", data.homeEmail);

            dispatch(addAVendor(formData)).then((res) => {

                if (
                    res?.paylaod?.error?.response?.status === 400 ||
                    res?.paylaod?.error?.response?.status === 500
                ) {
                } else {
                    setShowSuccessMessage(true);
                    setTimeout(() => {
                        navigate("/"); 
                    }, 3000); 
        
                }
            });



        } else {

            // Display an error message or handle the case where terms are not agreed upon

        }
    };


    const handleCheckboxChange = (event) => {
        setAgreeTerms(event.target.checked);
    };

    const handleFileChange = (e, fileType) => {
        const file = e.target.files[0];
        if (fileType === "aadharCard") {
            setAadharCardFile(file);
        } else if (fileType === "gstCertificate") {
            setGstCertificateFile(file);
        }
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
                                    {...register("shopName")}
                                    error={!!errors.shopName}
                                    helperText={errors.shopName?.message}
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

                            {/* <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="GST No."
                                    {...register("attachAadharCard")}
                                    error={!!errors.gstNumber}
                                    helperText={errors.gstNumber?.message}
                                />
                            </Grid>
              
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="GST No."
                                    {...register("attachGstCertificate")}
                                    error={!!errors.gstNumber}
                                    helperText={errors.gstNumber?.message}
                                />
                            </Grid> */}

                            <Grid item md={6}>
                                <Form.Group controlId="aadharCard">
                                    <Form.Label>Aadhar Card Upload</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="aadharCard"
                                        onChange={(e) => handleFileChange(e, "aadharCard")}
                                    />
                                </Form.Group>
                            </Grid>

                            <Grid item md={6}>
                                <Form.Group controlId="gstCertificate">
                                    <Form.Label>GST Number Certificate Upload</Form.Label>
                                    <Form.Control
                                        type="file"
                                        name="gstCertificate"
                                        onChange={(e) => handleFileChange(e, "gstCertificate")}
                                    />
                                </Form.Group>
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
                                    error={!!errors.officeAddress1}
                                    helperText={errors.officeAddress1?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Enter Address 2"
                                    {...register("officeAddress2")}
                                    error={!!errors.officeAddress2}
                                    helperText={errors.officeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    {...register("officeCity")}
                                    error={!!errors.officeAddress}
                                    helperText={errors.officeAddress?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    {...register("officeState")}
                                    error={!!errors.officeState}
                                    helperText={errors.homeState?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    {...register("officePincode")}
                                    error={!!errors.homePincode}
                                    helperText={errors.homePincode?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    {...register("officePhone")}
                                    error={!!errors.officePhone}
                                    helperText={errors.officePhone?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="E-mail Address"
                                    {...register("officeEmail")}
                                    error={!!errors.officeEmail}
                                    helperText={errors.officeEmail?.message}
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
                                    error={!!errors.homeAddress1}
                                    helperText={errors.homeAddress1?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Enter Address 2"
                                    {...register("homeAddress2")}
                                    error={!!errors.homeAddress2}
                                    helperText={errors.homeAddress2?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="City"
                                    {...register("homeCity")}
                                    error={!!errors.homeCity}
                                    helperText={errors.homeCity?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="State"
                                    {...register("homeState")}
                                    error={!!errors.homeState}
                                    helperText={errors.homeState?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={12} md={6}>
                                <TextField
                                    fullWidth
                                    label="Pincode"
                                    {...register("homePincode")}
                                    error={!!errors.homePincode}
                                    helperText={errors.homePincode?.message}
                                />
                            </Grid>

                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="Phone"
                                    {...register("homePhone")}
                                    error={!!errors.homePhone}
                                    helperText={errors.homePhone?.message}
                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    fullWidth
                                    label="E-mail Address"
                                    {...register("homeEmail")}
                                    error={!!errors.homeEmail}
                                    helperText={errors.homeEmail?.message}
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
                    {showSuccessMessage && (
                        <Typography variant="body1" color="success">
                            Form submitted successfully! Redirecting to home...
                        </Typography>
                    )}
                </CardContent>
            </Card>

        </div >
    );
};

export default MemberRegisterForm;
