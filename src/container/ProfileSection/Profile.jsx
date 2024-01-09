import { Avatar, Box, InputBase } from "@mui/material";
import FMTypography from "../../components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import mailIcon from "../../assets/mailIcon.svg";
import telephoneIcon from "../../assets/telephoneIcon.svg";
import locationIcon from "../../assets/locationIcon.svg";
import { commonStyle } from "../../Styles/commonStyles";
import { useDispatch, useSelector } from "react-redux";
import {
  editUserById,
  getProfileDetail,
} from "../../Redux/Slices/MyProfileSlice/MyProfile";
import FMButton from "../../components/FMButton/FMButton";
import PincodeInputWrapper from "./PincodeInputWrapper";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup"; // Add this import statement
import * as yup from "yup";

// Define the validation schema
const profileSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  dob: yup.string().required("Date of birth is required"),
  email: yup
    .string()
    .email("Invalid email address")
    .required("Email is required"),
  gender: yup.string().required("Gender is required"),
});

const Profile = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onChange",
  });

  const onSubmit = (data) => {
    // Handle the form submission
    console.log("Form data:", data);

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
      formData.append("role", data?.role?.toString());
      formData.append("gender", data?.gender?.toString());
      if (profileImage) {
        formData.append("profilePicture", profileImage);
      }

      dispatch(editUserById(formData)).then((res) => {
        if (
          res?.payload?.error?.response?.status === 400 ||
          res?.payload?.error?.response?.status === 404 ||
          res?.payload?.error?.response?.status === 500
        ) {
        } else {
        }
      });
    } catch (error) {}
  };

  const dispatch = useDispatch();
  const [profilePicture, setProfilePicture] = useState("");
  const [pincodeData, setPincodeData] = useState(
    sessionStorage.getItem("pincode")
  );

  const myProfileData = useSelector(
    (state) => state?.myProfile?.getProfileData?.user
  );

  useEffect(() => {
    dispatch(getProfileDetail());
  }, [dispatch]);

  useEffect(() => {
    reset({
      firstName: myProfileData?.firstName || "",
      lastName: myProfileData?.lastName || "",
      dob: myProfileData?.dob || "",
      email: myProfileData?.email || "",
      gender: myProfileData?.gender || "",
    });
    setProfilePicture(myProfileData?.profilePicture);
  }, [myProfileData, reset]);

  return (
    <>
      <Row
        style={{
          boxShadow:
            "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
          borderRadius: "20px",
          marginTop: "24px",
          marginBottom: "24px",
          padding: "32px",
        }}
      >
        <Col className="col-md-4">
          <Stack direction="row" spacing={2} sx={{ marginLeft: "1rem" }}>
            <Avatar
              src={profilePicture ? profilePicture : "/broken-image.jpg"}
              sx={{ width: "170px", height: "170px" }}
            />
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
                fontSize: "1rem",
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
                fontSize: "1rem",
                color: "#717171",
              }}
            />
          </Box>
          <Box sx={{ display: "flex" }}>
            <img src={locationIcon} alt="location-icon" />
            <FMTypography
              displayText={"East Delhi, Delhi"}
              styleData={{
                marginLeft: "1rem",
                fontSize: "1rem",
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
          padding: "32px",
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
                    placeholder="Last name"
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
              {/* <Box>
                <InputBase
                  required
                  id="alternateNum"
                  name="alternateNum"
                  placeholder="Contact Num"
                  value={al}
                  sx={{
                    ...commonStyle.inputFieldStyle,
                  }}
                />
              </Box> */}

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
              <Box>
                <InputBase
                  required
                  id="gender*"
                  name="gender*"
                  placeholder="gender*"
                  sx={{
                    ...commonStyle.inputFieldStyle,
                  }}
                  {...register("gender")}
                />
                {errors.gender && <span>{errors.gender.message}</span>}
              </Box>

              <Box>
                <PincodeInputWrapper
                  setPincodeData={setPincodeData}
                  pincodeData={pincodeData}
                />
              </Box>
            </Box>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <FMButton
                displayText={"Change Password"}
                variant="outlined"
                styleData={{
                  color: "black",
                  fontWeight: "600",
                  borderRadius: "10px",
                  backgroundColor: "white",
                  marginTop: "2rem",
                }}
              />
              <FMButton
                displayText={"Update Profile"}
                styleData={{
                  color: "#fff",
                  fontWeight: "600",
                  borderRadius: "10px",
                  background: "#801317",
                  marginTop: "2rem",
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

export default Profile;
