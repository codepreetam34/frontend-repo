import { Box, InputBase, TextField } from "@mui/material";
import FMButton from "../../components/FMButton/FMButton";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { commonStyle } from "../../Styles/commonStyles";

const Reminder = () => {
  return (
    <>
      <Container>
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
          <Col className="col-md-3">
            <InputBase
              required
              id="firstName"
              name="firstName"
              placeholder="Name"
              sx={commonStyle.inputFieldStyle}
          //    defaultValue={"firstName"}
            />
            <InputBase
              required
              id="occasion"
              name="occasion"
              placeholder="Occasion"
              sx={commonStyle.inputFieldStyle}
           //   defaultValue={"occasion"}
            />
          </Col>

          <Col className="col-md-3">
            <InputBase
              required
              id="lastName"
              name="lastName"
              placeholder="Last Name"
              sx={commonStyle.inputFieldStyle}
             // defaultValue={"lastName"}
            />
            <InputBase
              required
              id="date"
              name="date"
              placeholder="date"
              sx={commonStyle.inputFieldStyle}
          //    defaultValue={"date"}
            />
          </Col>
          <Col className="col-md-6">
            <TextField
              id="outlined-multiline-static"
              // label="Multiline"
              placeholder="Description"
              multiline
              rows={3}
              fullWidth
              sx={{
                marginTop: ".5rem",
                border: "1px solid #C4C4C4",
                borderRadius: "10px",
                // new
                // background: "white",
                // boxShadow: `0rem 0.0625rem 0.125rem #1018280d   `,
                // "& .MuiOutlinedInput-notchedOutline": {
                //   border: `0.0625rem solid #1a1a1a1f`,
                // },
                // "&.Mui-focused": {
                //   "& .MuiOutlinedInput-notchedOutline": {
                //     border: `0.0625rem solid #1a1a1a1f`,
                //   },
                // },
                // "& .MuiOutlinedInput-input": {
                //   height: "0.7rem",
                // },
                // "& .MuiOutlinedInput-root": {
                //   borderRadius: "0.5rem",
                //   "&:hover .MuiOutlinedInput-notchedOutline": {
                //     borderRadius: "0.5rem",
                //     border: `0.0625rem solid #1a1a1a1f`,
                //   },
                // },

                //   "&:hover": { border: "1px solid #C4C4C4" },
              }}
            />
          </Col>

          <Col  style={{textAlign:'end', paddingTop:'1.5rem'}}>
            <FMButton
              displayText={"Cancel"}
              variant="outlined"
              styleData={{
                color: "black",
                fontWeight: "600",
                backgroundColor: "white",
                border: "1px solid #801317",
                borderRadius: "10px",
                width: "180px",
    
              }}
            />
            <FMButton
              displayText={"Save"}
              
              styleData={{
                color: "white",
                fontWeight: "600",
                backgroundColor: "#801317",
                border: "2px solid #E6E6E6",
                borderRadius: "10px",
                width: "180px",
                marginLeft: "1.5rem",
 
              }}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Reminder;
