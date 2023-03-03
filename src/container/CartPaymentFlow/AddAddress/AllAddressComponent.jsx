import { Box, Grid } from "@mui/material";
import FMDetailTypography from "components/FMDetailTypography/FMDetailTypography";
import FMTypography from "components/FMTypography/FMTypography";
import React from "react";
import { useSelector } from "react-redux";

const AllAddressComponent = ({ styleData }) => {
  const addressDetailsAdded = useSelector(
    (state) =>
      state?.addToCartAddress?.getAddToCartAddress?.userAddress?.address
  );
  return (
    <>
      <Grid>
        {addressDetailsAdded?.map((elem) => (
          <Box
            sx={{
              boxShadow:
                "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
              borderRadius: "20px",
              padding: "40px",
              ...styleData,
              //   display: displayFormData ? "none" : "block",
            }}
          >
            <Box sx={{ marginBottom: "2rem" }}>
              <FMTypography
                displayText={"Default Address"}
                styleData={{ fontSize: "20px", fontWeight: "400" }}
              />
            </Box>
            <Box sx={{ display: "flex", marginBottom: "1rem" }}>
              <FMTypography
                displayText={elem?.name}
                styleData={{ fontSize: "1rem", fontWeight: "500" }}
              />
              <FMTypography
                displayText={`(${elem?.addressType})`}
                styleData={{
                  fontSize: "12px",
                  fontWeight: "500",
                  marginLeft: "12px",
                  marginTop: ".2rem",
                  color: "#222222",
                }}
              />
            </Box>
            <FMTypography
              displayText={"319, Netaji Subhash Place, New Delhi,Delhi 110034"}
              styleData={{
                fontSize: "1rem",
                color: "#717171",
                fontWeight: "400",
                marginBottom: "1rem",
              }}
            />
            <FMDetailTypography
              displayText1={"Mobile:"}
              displayText2={elem?.mobileNumber}
              styleData1={{ marginBottom: "1rem" }}
            />
            <FMTypography
              displayText={"Pay On Delivery Available"}
              styleData={{ fontSize: "1rem", color: "#717171" }}
            />
          </Box>
        ))}
      </Grid>
    </>
  );
};

export default AllAddressComponent;
