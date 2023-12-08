import { Avatar, Box, InputBase } from "@mui/material";
import FMTypography from "../../components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import mailIcon from "../../assets/mailIcon.svg";
import telephoneIcon from "../../assets/telephoneIcon.svg";
import locationIcon from "../../assets/locationIcon.svg";
import { commonStyle } from "../../Styles/commonStyles";
import Pincode from "react-pincode";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetail } from "../../Redux/Slices/MyProfileSlice/MyProfile";
import FMButton from "../../components/FMButton/FMButton";
import PincodeWrapper from "components/PincodeWrapper";
import PincodeInputWrapper from "./PincodeInputWrapper";
import Footer from "components/Footer/Footer";

const Profile = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [pincodeData, setPincodeData] = useState(sessionStorage.getItem("pincode"));

  const myProfileData = useSelector(
    (state) => state?.myProfile?.getProfileData?.user
  );

  useEffect(() => {
    dispatch(getProfileDetail());
  }, [dispatch]);

  useEffect(() => {
    setData(myProfileData);
    setFirstName(myProfileData?.firstName);
    setLastName(myProfileData?.lastName);
    setPhoneNumber(myProfileData?.contactNumber);
    console.log("my profile inside ", myProfileData?.firstName)
  }, []);

  console.log("my profile data 2", myProfileData?.firstName)
  console.log("my profile data 3", lastName)

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
              src="/broken-image.jpg"
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
              displayText={myProfileData?.contactNumber ? myProfileData?.contactNumber : "Enter Mobile"}
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
          // onSubmit={handleSubmit(onSubmit)}
          >
            <Box sx={commonStyle.flexStyle}>
              <Box sx={{ display: "flex" }}>
                <Box sx={{ marginRight: "1rem" }}>
                  <InputBase
                    required
                    id="firstName"
                    name="firstName"
                    placeholder="Name"
                    sx={{
                      ...commonStyle.inputFieldStyle,
                    }}
                    value={

                      firstName ? firstName : myProfileData?.firstName
                    }
                  />
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
                    value={myProfileData?.lastName}
                  />
                </Box>
              </Box>
              <Box>
                <InputBase
                  required
                  id="Dob"
                  name="Dob"
                  placeholder="Dob"
                  value={myProfileData?.dob}
                  sx={{
                    ...commonStyle.inputFieldStyle,
                  }}
                />
              </Box>
              <Box>
                <InputBase
                  required
                  id="alternateNum"
                  name="alternateNum"
                  placeholder="Contact Num"
                  value={

                    myProfileData?.contactNumber
                  }
                  sx={{
                    ...commonStyle.inputFieldStyle,
                  }}
                />
              </Box>

              <Box>
                <InputBase
                  required
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={
                    myProfileData?.email
                  }
                  sx={{
                    ...commonStyle.inputFieldStyle,
                  }}
                />
              </Box>
              <Box>
                <InputBase
                  required
                  id="gender*"
                  name="gender*"
                  placeholder="gender*"
                  value={myProfileData?.gender}
                  sx={{
                    ...commonStyle.inputFieldStyle,
                  }}
                />

              </Box>

              <Box sx={{ marginTop: "1rem" }}>
                <PincodeInputWrapper setPincodeData={setPincodeData} pincodeData={pincodeData} />
              </Box>
            </Box>

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
          </Box>
        </Col>
      </Row>
      {/* <FMLoader showLoader={showLoader} /> */}
    </>
  );
};

export default Profile;
