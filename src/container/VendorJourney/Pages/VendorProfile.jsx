import {
    Avatar,
    Box,
    FormControlLabel,
    InputBase,
    Radio,
    RadioGroup,
    Typography,
    useMediaQuery,
} from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import React, { useCallback, useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import mailIcon from "assets/mailIcon.svg";
import telephoneIcon from "assets/telephoneIcon.svg";
import locationIcon from "assets/locationIcon.svg";
import { commonStyle } from "Styles/commonStyles";
import { useDispatch, useSelector } from "react-redux";

import FMButton from "components/FMButton/FMButton";
import PincodeInputWrapper from "container/ProductDetail/PincodeInputWrapper";
import { useForm, useFormContext } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { SETUP_NEW_PASSWORD } from "Routes/Routes";
import { useNavigate } from "react-router";

const profileSchema = yup.object().shape({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    dob: yup.string().required("Date of birth is required"),
    email: yup
        .string()
        .email("Invalid email address")
        .required("Email is required"),
    contactNumber: yup
        .string()
        .matches(/^(0\d{10}|[1-9]\d{9})$/, "Invalid contact number")
        .required("Contact number is required"),
});

const VendorProfile = () => {
    const {
        handleSubmit,
        register,
        reset,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(profileSchema),
        mode: "onChange",
    });
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [newProfilePicture, setNewProfilePicture] = useState(null);
    const [previewImage, setPreviewImage] = useState(null);
    const [profilePicture, setProfilePicture] = useState("");
    const isMobile = useMediaQuery("(max-width:600px)");


    const [pincodeData, setPincodeData] = useState(
        sessionStorage.getItem("pincode")
    );

    const myProfileData = useSelector(
        (state) => state?.myProfile?.getProfileData?.user
    );

    const fetchData = useCallback(async () => {
        try {
     
        } catch (error) {
            console.log(error);
        }
    }, [dispatch]);

    useEffect(() => {
        const controller = new AbortController();
        if (!myProfileData) {
            fetchData();
        }

        return () => {
            controller.abort();
        };
    }, [fetchData, myProfileData]);

    const addressDetailsAdded = useSelector(
        (state) =>
            state?.addToCartAddress?.getAddToCartAddress?.userAddress?.address
    );

    useEffect(() => {
        reset({
            firstName: myProfileData?.firstName || "",
            lastName: myProfileData?.lastName || "",
            dob: myProfileData?.dob
                ? new Date(myProfileData.dob).toISOString().split("T")[0]
                : "",
            email: myProfileData?.email || "",
            gender: setGenderChange(myProfileData?.gender) || "",
            contactNumber: myProfileData?.contactNumber || "",
        });
        setProfilePicture(myProfileData?.profilePicture);
    }, [myProfileData, reset]);

    const getFullAddress = (addresses) => {
        const filteredAddresses = addresses.filter((address) => !address.isDefault);

        const defaultAddress =
            addresses.find((address) => address.isDefault) || filteredAddresses[0];

        const defaultAddressString = defaultAddress
            ? `${defaultAddress.address}, ${defaultAddress.locality}, ${defaultAddress.cityDistrictTown}, ${defaultAddress.landmark}`
            : "";

        return defaultAddressString;
    };

    const onProfilePictureChange = (event) => {
        const file = event.target.files[0];

        if (file) {
            setNewProfilePicture(file);
            const previewURL = URL.createObjectURL(file);
            setPreviewImage(previewURL);
        }
    };

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();

            if (myProfileData?._id) {
                formData.append("_id", myProfileData?._id.toString());
            }

            formData.append("firstName", data?.firstName?.toString());
            formData.append("lastName", data?.lastName?.toString());
            formData.append("email", data?.email?.toString());
            formData.append("contactNumber", data?.contactNumber?.toString());
            formData.append("dob", data?.dob?.toString());
            formData.append("gender", genderChange?.toString());
            if (newProfilePicture) {
                formData.append("profilePicture", newProfilePicture);
            }
            await dispatch(editUserById(formData)).then((res) => {
                if (
                    res?.payload?.error?.response?.status === 400 ||
                    res?.payload?.error?.response?.status === 404 ||
                    res?.payload?.error?.response?.status === 500
                ) {
                    dispatch(getProfileDetail());

                } else {
                    dispatch(getProfileDetail());
                }
            });
        } catch (error) {
            console.log(error);
        }
    };

    const [genderChange, setGenderChange] = useState();

    const handleGenderChange = (event) => {
        setGenderChange(event.target.value);
    };

    return (
        <>
            <Row
                style={{
                    boxShadow:
                        "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                    borderRadius: "20px",
                    marginTop: "20px",
                    marginBottom: "20px",
                    padding: isMobile ? "15px" : "32px",

                    background: "#fff",
                }}
            >
                <Col className="col-md-4">
                    <Stack
                        direction="row"
                        spacing={2}
                        style={{ marginLeft: isMobile ? "" : "1rem", position: "relative" }}
                    >
                        <label htmlFor="profile-picture-input" style={{
                            display: "flex",
                            justifyContent: "center"
                        }}>
                            <Avatar
                                src={previewImage || profilePicture || "/broken-image.jpg"}
                                style={{ width: "170px", height: "170px", cursor: "pointer" }}
                            />
                            <input
                                type="file"
                                id="profile-picture-input"
                                style={{ display: "none" }}
                                onChange={onProfilePictureChange}
                            />
                            <Box
                                sx={{
                                    position: "absolute",
                                    top: 0,
                                    right: "40%",
                                    backgroundColor: "#fff",
                                    width: "25px",
                                    height: "25px",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    border: "1px solid #801317",
                                    display: "flex",
                                    background: "#801317",
                                    alignItems: "center",
                                    justifyContent: "center",

                                }}
                            >
                                <Typography
                                    variant="caption"
                                    style={{
                                        color: "#fff",
                                        fontWeight: "400",
                                        fontSize: "2rem",
                                    }}
                                >
                                    +
                                </Typography>
                            </Box>
                        </label>
                    </Stack>
                </Col>

                <Col className="col-md-8">
                    <FMTypography
                        displayText={
                            myProfileData?.firstName + " " + myProfileData?.lastName
                        }
                        // style={{ marginTop: "-1rem" }}
                        styleData={{
                            fontSize: "32px",
                            fontWeight: "500",
                            marginBottom: "1rem",
                            ...(window.innerWidth <= 600 && {
                                fontSize: "30px",
                            })
                        }}
                    />

                    <Box sx={{ display: "flex", marginBottom: ".5rem" }}>
                        <img
                            src={mailIcon}
                            alt="mail-icon"
                        // style={{ marginTop: "-1rem" }}
                        />
                        <FMTypography
                            displayText={myProfileData?.email}
                            styleData={{
                                marginLeft: "1rem",
                                fontSize: "14px",
                                color: "#717171",
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex", marginBottom: ".5rem" }}>
                        <img src={telephoneIcon} alt="telephone-icon" />
                        <FMTypography
                            displayText={
                                myProfileData?.contactNumber
                                    ? myProfileData?.contactNumber
                                    : "Enter Mobile"
                            }
                            styleData={{
                                marginLeft: "1rem",
                                fontSize: "14px",
                                color: "#717171",
                            }}
                        />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                        <img src={locationIcon} alt="location-icon" />
                        <FMTypography
                            displayText={
                                addressDetailsAdded
                                    ? getFullAddress(addressDetailsAdded)
                                    : "N/A"
                            }
                            styleData={{
                                marginLeft: "1rem",
                                fontSize: "14px",
                                color: "#717171",
                            }}
                        />
                    </Box>
                </Col>
            </Row>

            <Row
                style={{
                    boxShadow:
                        "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                    borderRadius: "20px",
                    marginTop: "24px",
                    marginBottom: "24px",
                    padding: isMobile ? "15px" : "32px", background: "#fff",
                }}
            >
                <Col style={{ display: "flex", justifyContent: "center" }}>
                    <Box
                        component="form"
                        xs={12}
                        sx={{ width: "350px" }}
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        <Box sx={commonStyle.flexStyle}>
                            <Box sx={{ display: "flex" }}>
                                <Box sx={{ marginRight: "1rem" }}>
                                    <InputBase
                                        required
                                        id="firstName"
                                        name="firstName"
                                        placeholder="First Name"
                                        sx={{
                                            ...commonStyle.inputFieldStyle,
                                        }}
                                        {...register("firstName")}
                                    />
                                    {errors.firstName && <span>{errors.firstName.message}</span>}
                                </Box>
                                <Box>
                                    <InputBase
                                        required
                                        id="lastName"
                                        name="lastName"
                                        placeholder="Last Name"
                                        sx={{
                                            ...commonStyle.inputFieldStyle,
                                        }}
                                        {...register("lastName")}
                                    />
                                    {errors.lastName && <span>{errors.lastName.message}</span>}
                                </Box>
                            </Box>
                            <Box>
                                <InputBase
                                    required
                                    id="Dob"
                                    type="date"
                                    name="Dob"
                                    placeholder="Dob"
                                    sx={{
                                        ...commonStyle.inputFieldStyle,
                                    }}
                                    {...register("dob")}
                                />
                                {errors.dob && <span>{errors.dob.message}</span>}
                            </Box>

                            <Box>
                                <InputBase
                                    required
                                    id="email"
                                    name="email"
                                    placeholder="Email"
                                    sx={{
                                        ...commonStyle.inputFieldStyle,
                                    }}
                                    {...register("email")}
                                />
                                {errors.email && <span>{errors.email.message}</span>}
                            </Box>
                            <Box
                                style={{
                                    border: "1px solid grey",
                                    borderRadius: "10px",
                                    padding: "0 10px",
                                    marginBottom: "10px",
                                }}
                            >
                                <RadioGroup
                                    row
                                    aria-label="gender"
                                    name="gender"
                                    value={genderChange || ""}
                                    onChange={handleGenderChange}
                                >
                                    <FormControlLabel
                                        value="Male"
                                        control={<Radio />}
                                        label="Male"
                                    />
                                    <FormControlLabel
                                        value="Female"
                                        control={<Radio />}
                                        label="Female"
                                    />
                                    <FormControlLabel
                                        value="Prefer Not To Say"
                                        control={<Radio />}
                                        label="Prefer Not To Say"
                                    />
                                </RadioGroup>

                                {errors.gender && <span>{errors.gender.message}</span>}
                            </Box>

                            <Box>
                                <InputBase
                                    required
                                    id="contactNumber"
                                    name="contactNumber"
                                    placeholder="Enter Contact Number"
                                    sx={{
                                        ...commonStyle.inputFieldStyle,
                                    }}
                                    {...register("contactNumber")}
                                />
                                {errors.contactNumber && (
                                    <div
                                        style={{
                                            color: "red",
                                            fontSize: "0.8rem",
                                            marginBottom: "1rem",
                                        }}
                                    >
                                        {errors.contactNumber.message}
                                    </div>
                                )}
                            </Box>

                            <Box>
                                <PincodeInputWrapper
                                    setPincodeData={setPincodeData}
                                    pincodeData={pincodeData}
                                />
                            </Box>
                        </Box>
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                gap: "1rem",
                            }}
                        >
                            <FMButton
                                displayText={"Change Password"}
                                onClick={() => { navigate(SETUP_NEW_PASSWORD) }}
                                variant="outlined"
                                styleData={{
                                    color: "black",
                                    fontWeight: "600",
                                    borderRadius: "10px",
                                    backgroundColor: "white",
                                    marginTop: "1rem",
                                }}
                            />
                            <FMButton
                                buttonType={"submit"}
                                displayText={"Update Profile"}
                                styleData={{
                                    color: "#fff",
                                    fontWeight: "600",
                                    borderRadius: "10px",
                                    background: "#801317",
                                    marginTop: "1rem",
                                }}
                            />
                        </Box>
                    </Box>
                </Col>
            </Row>
            {/* <FMLoader showLoader={showLoader} /> */}
        </>
    );
};

export default VendorProfile;
