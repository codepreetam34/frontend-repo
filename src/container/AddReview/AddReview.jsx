import { PhotoCamera } from "@material-ui/icons";
import { Box, IconButton, Rating, TextField } from "@mui/material";
import FMTypography from "components/FMTypography/FMTypography";
import Header from "components/SearchBar/Header";
import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import uploadReview from "../../assets/upload-review.svg";

const AddReview = () => {
  const [value, setValue] = useState(0);

  return (
    <>
      <Header />
      <Container>
        <Row>
          <Col>
            <Box
              sx={{
                boxShadow:
                  "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                borderRadius: "20px",
                marginTop: "24px",
                marginBottom: "24px",
                padding: "32px",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <FMTypography
                displayText={"Ratings & Reviews"}
                styleData={{ fontSize: "40px" }}
              />
              <Box>
                <FMTypography
                  displayText={"Chocolate truffle"}
                  styleData={{ fontSize: "24px" }}
                />
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <FMTypography
                    displayText={"5.0"}
                    styleData={{ fontSize: "20px" }}
                  />
                  <FMTypography
                    displayText={"3 reviews"}
                    styleData={{ fontSize: "20px" }}
                  />
                </Box>
              </Box>
            </Box>
          </Col>
        </Row>
        {/* box below */}
        <Row>
          <Col>
            <Box
              sx={{
                boxShadow:
                  "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                borderRadius: "20px",
                marginTop: "24px",
                marginBottom: "24px",
                padding: "32px",
                //   display: "flex",
                //   justifyContent: "space-between",
              }}
            >
              <FMTypography
                displayText={"Rate this product"}
                styleData={{ fontSize: "32px" }}
              />
              <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                  setValue(newValue);
                }}
                size="large"
                precision={0.5}
              />
              <FMTypography displayText={"Review this product"} />
              <TextField
                id="outlined-multiline-static"
                // label="Multiline"
                placeholder="Description"
                multiline
                rows={4}
                fullWidth
                sx={{
                  marginTop: "1rem",
                  border: "1px solid #C4C4C4",
                  borderRadius: "10px",
                  //   "&:hover": { border: "1px solid #C4C4C4" },
                }}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="label"
              >
                <input hidden accept="image/*" type="file" />
                {/* <PhotoCamera /> */}
                <img
                  src={uploadReview}
                  alt="upload-icon"
                  style={{ width: "48px", height: "48px" }}
                />
              </IconButton>
            </Box>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AddReview;
