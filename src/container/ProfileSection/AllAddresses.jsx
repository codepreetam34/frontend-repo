import { Box } from "@material-ui/core";
import { Container } from "@mui/system";
import FMButton from "../../components/FMButton/FMButton";
import FMDetailTypography from "../../components/FMDetailTypography/FMDetailTypography";
import FMTypography from "../../components/FMTypography/FMTypography";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCartAddress } from "../../Redux/Slices/AddToCart/AddAddress";

const AllAddresses = () => {
  const dispatch = useDispatch();
  const [displayFormData, setDisplayFormData] = useState(false);

  useEffect(() => {
    dispatch(addToCartAddress());
  }, []);

  const addressDetailsAdded = useSelector(
    (state) =>
      state?.addToCartAddress?.getAddToCartAddress?.userAddress?.address
  );

  const displayForm = () => {
    setDisplayFormData(true);
  };

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
          <Col
            className="col-md-6"
            style={{
              boxShadow:
                "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
              borderRadius: "20px",
              marginTop: "24px",
              marginBottom: "24px",
              padding: "32px",
            }}
          >
            {addressDetailsAdded ? (
              addressDetailsAdded?.map((elem, index) => (
                <Box
                  key={index}
                  sx={{
                    boxShadow:
                      "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                    borderRadius: "20px",
                    padding: "40px",
                    //   ...styleData,
                  }}
                >
                  <Box sx={{ marginBottom: "2rem" }}>
                    <FMTypography
                      displayText={"Default Address"}
                      styleData={{ fontSize: "20px", fontWeight: "400" }}
                    />
                  </Box>
                  <Box
                    sx={{
                      display: "flex !important",
                      marginBottom: "1rem",
                      flexDirection: "row",
                    }}
                  >
                    <FMTypography
                      displayText={elem?.name}
                      styleData={{ fontSize: "1rem", fontWeight: "500" }}
                    />
                    <FMTypography
                      displayText={`(${elem?.addressType})`}
                      styleData={{
                        fontSize: "12px",
                        fontWeight: "500",
                        marginTop: ".2rem",
                        marginBottom: ".2rem",
                        color: "#222222",
                      }}
                    />
                  </Box>
                  <FMTypography
                    displayText={
                      "319, Netaji Subhash Place, New Delhi,Delhi 110034"
                    }
                    styleData={{
                      fontSize: "1rem",
                      color: "#717171",
                      fontWeight: "400",
                      marginBottom: "1rem",
                    }}
                  />
                </Box>
              ))
            ) : (
              <Box
                sx={{
                  boxShadow:
                    "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                  borderRadius: "20px",
                  padding: "40px",
                  //   ...styleData,
                }}
              >
                <Box sx={{ marginBottom: "2rem" }}>
                  <FMTypography
                    displayText={"No address found !"}
                    styleData={{ fontSize: "20px", fontWeight: "400" }}
                  />
                </Box>
              </Box>
            )}
          </Col>
          <Col
            className="col-md-6"
            style={{
              marginTop: "24px",
              marginBottom: "24px",
              display: "flex",
              justifyContent: "end",
              height: "100px",
            }}
          >
            <FMButton
              displayText={"+ Add new Address"}
              variant="outlined"
              styleData={{
                fontSize: "1rem",
                fontWeight: "500",
                border: "1px solid #801317",
                backgroundColor: "white",
                color: "#000000",
                width: "278px",
                padding: "32px",
                boxShadow:
                  "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                borderRadius: "20px",
              }}
              onClick={displayForm}
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default AllAddresses;
