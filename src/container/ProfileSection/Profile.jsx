import { Avatar, Box, InputBase } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import Header from "components/SearchBar/Header";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import mailIcon from "../../assets/mailIcon.svg";
import telephoneIcon from "../../assets/telephoneIcon.svg";
import locationIcon from "../../assets/locationIcon.svg";
import { commonStyle } from "Styles/commonStyles";
import Pincode from "react-pincode";
import { useDispatch, useSelector } from "react-redux";
import { getProfileDetail } from "Redux/Slices/MyProfileSlice/MyProfile";

const Profile = () => {
  const dispatch = useDispatch();
  const [pincodeData, setPincodeData] = useState("");

  const getDataFunc = (data) => {
    setPincodeData(data);
    if (data?.pincode.length === 6) {
    }
  };

  useEffect(() => {
    dispatch(getProfileDetail());
  }, [dispatch]);

  const myProfileData = useSelector(
    (state) => state?.myProfile?.getProfileData?.user
  );
  console.log("myProfileData", myProfileData?.firstName);

  const [firstName, setFirstName] = useState(myProfileData?.firstName);
  useEffect(() => {
    console.log("first", firstName);
  }, [myProfileData?.firstName, firstName]);

  const setFirstNameFunc = (e) => {
    setFirstName(e.target.value);
  };

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col className="col-md-4"></Col>
          <Col className="col-md-8">
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
                    displayText={myProfileData?.contactNumber}
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
            {/* intro form below */}
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

                            // ...(errors.firstName && commonStyle.errorStyle),
                          }}
                          value={firstName}
                          // onChange={setFirstNameFunc}
                          // {...register("firstName")}
                          // error={errors.firstName ? true : false}
                        />
                        {/* <FMTypography
                      styleData={{
                        ...commonStyle.errorText,
                        fontSize: "11px",
                      }}
                      displayText={errors.firstName?.message}
                    /> */}
                      </Box>
                      <Box>
                        <InputBase
                          required
                          id="lastName"
                          name="lastName"
                          placeholder="Last name"
                          sx={{
                            ...commonStyle.inputFieldStyle,

                            // ...(errors.lastName && commonStyle.errorStyle),
                          }}
                          // {...register("lastName")}
                          // error={errors.lastName ? true : false}
                        />
                        {/* <FMTypography
                      styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                      displayText={errors.lastName?.message}
                    /> */}
                      </Box>
                    </Box>
                    <Box>
                      <InputBase
                        required
                        id="Dob"
                        name="Dob"
                        placeholder="Dob"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          // ...(errors.Dob && commonStyle.errorStyle),
                        }}
                        // {...register("Dob")}
                        // error={errors.Dob ? true : false}
                      />
                      {/* <FMTypography
                      styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                      displayText={errors.Dob?.message}
                    /> */}
                    </Box>
                    <Box>
                      <InputBase
                        required
                        id="alternateNum"
                        name="alternateNum"
                        placeholder="Contact Num"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          // ...(errors.alternateNum && commonStyle.errorStyle),
                        }}
                        // {...register("alternateNum")}
                        // error={errors.alternateNum ? true : false}
                      />
                      {/* <FMTypography
                        styleData={{
                          ...commonStyle.errorText,
                          fontSize: "11px",
                        }}
                        displayText={errors.alternateNum?.message}
                      /> */}
                    </Box>

                    <Box>
                      <InputBase
                        required
                        id="email"
                        name="email"
                        placeholder="Email"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          // ...(errors.email && commonStyle.errorStyle),
                        }}
                        // {...register("email")}
                        // error={errors.email ? true : false}
                      />
                      {/* <FMTypography
                      styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                      displayText={errors.email?.message}
                    /> */}
                    </Box>
                    <Box>
                      <InputBase
                        required
                        id="Nationality*"
                        name="Nationality*"
                        placeholder="Nationality*"
                        sx={{
                          ...commonStyle.inputFieldStyle,

                          // ...(errors.Nationality* && commonStyle.errorStyle),
                        }}
                        // {...register("Nationality*")}
                        // error={errors.Nationality* ? true : false}
                      />
                      {/* <FMTypography
                      styleData={{ ...commonStyle.errorText, fontSize: "11px" }}
                      displayText={errors.Nationality*?.message}
                    /> */}
                    </Box>

                    <Box sx={{ marginRight: "2rem" }}>
                      <Pincode
                        showCity={false}
                        showDistrict={false}
                        showState={false}
                        invalidError="Please check pincode"
                        // lengthError="check length"
                        getData={getDataFunc}
                        showArea={pincodeData ? true : false}
                        pincodeInput={{
                          borderRadius: "10px",
                          width: "110%",
                          border: "1px solid grey",
                          height: "40px",
                          padding: "16.5px 14px",
                          marginRight: "1.7rem",
                          // marginBottom: !pincodeData && "1.1rem",
                        }}
                        areaInput={{
                          backgroundColor: "white",
                          border: "none",
                          color: "red",
                          fontSize: "12px",
                        }}
                      />
                    </Box>
                  </Box>
                </Box>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Profile;
