import React, { useEffect, useState } from "react";
import { Box, Grid, Radio, RadioGroup, FormControlLabel, IconButton, CircularProgress } from "@mui/material";
import FMDetailTypography from "../../../components/FMDetailTypography/FMDetailTypography";
import FMTypography from "../../../components/FMTypography/FMTypography";
import { useSelector, useDispatch } from "react-redux";

import DeleteIcon from "@mui/icons-material/Delete";
import { deleteAddress } from "../../../Redux/Slices/AddToCart/DeleteAddress";
import { notify } from "../../../components/FMToaster/FMToaster";
//import { addToCartProductsFinal } from "Redux/Slices/AddToCart/AddToCartSlice";
import { addToCartAddress } from "../../../Redux/Slices/AddToCart/AddAddress";
const AllAddressComponent = ({ styleData, addressDetailsAdded }) => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(() => {
    const storedSelectedAddress = localStorage.getItem("selectedAddress");
    return storedSelectedAddress || getInitialSelectedAddress();
  });
  const [isLoading, setIsLoading] = useState(true);

  const handleRemoveAddress = (addressId) => {
    dispatch(deleteAddress(addressId))
      .then((resultAction) => {
        if (deleteAddress.fulfilled.match(resultAction)) {
          if (selectedAddress === addressId) {
            localStorage.removeItem("selectedAddress");
          }
          const deletedAddress = resultAction.payload; // Assuming the action payload contains information about the deleted address
          notify({ type: "success", content: `Address for ${deletedAddress.address} deleted successfully` });
          dispatch(addToCartAddress());
        } else if (deleteAddress.rejected.match(resultAction)) {
          const error = resultAction.payload; // Access the error message from the payload
          notify({ type: "error", content: `Failed to delete the address: ${error}` });
        }
      });

  };

  function getInitialSelectedAddress() {
    return addressDetailsAdded && addressDetailsAdded.length > 0
      ? addressDetailsAdded[0]?._id
      : null;
  }
  const handleRadioChange = (id) => {
    setSelectedAddress(id);
    localStorage.setItem("selectedAddress", id);
  };

  useEffect(() => {
    if (addressDetailsAdded && addressDetailsAdded.length > 0) {
      const storedSelectedAddress = localStorage.getItem("selectedAddress");
      setSelectedAddress(storedSelectedAddress || getInitialSelectedAddress());
      setIsLoading(false);
    }
  }, [addressDetailsAdded]);

  if (isLoading) {
    return (
      <Grid style={{ display: 'flex', justifyContent: 'center' }}>
        <CircularProgress />
      </Grid>
    );
  }
  return (
    <>
      <Grid>
        <RadioGroup value={selectedAddress} onChange={(event) => handleRadioChange(event.target.value)}>
          {addressDetailsAdded && addressDetailsAdded.length > 0 ? addressDetailsAdded?.map((elem, index) => (
            <Box
              key={elem?._id}
              sx={{
                position: 'relative',
                boxShadow:
                  "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
                borderRadius: "20px",
                padding: "40px",
                marginBottom: "2rem",
                ...styleData,

              }}
            >
              <Box>
                <IconButton
                  color="secondary"
                  aria-label="remove address"
                  onClick={() => handleRemoveAddress(elem?._id)}
                  sx={{
                    position: "absolute",
                    right: "10px",
                  }}
                >
                  <DeleteIcon style={{ color: "#801317" }} />
                </IconButton>
              </Box>

              {/* {addressDetailsAdded[0] && (
                <Box sx={{ marginBottom: "2rem" }}>
                  <FMTypography
                    displayText={"Default Address"}
                    styleData={{ fontSize: "20px", fontWeight: "400" }}
                  />
                </Box>
              )} */}





              <FormControlLabel
                value={elem?._id}
                control={<Radio />}
                label={`${elem?.name} (${elem?.addressType})`}
              // No need to pass elem?._id here, it's already set in the value prop
              />


              <FMTypography
                displayText={elem?.address}
                styleData={{
                  fontSize: "1rem",
                  color: "#717171",
                  fontWeight: "400",
                  marginBottom: "1rem",
                }}
              />
              <FMDetailTypography
                displayText1={"Mobile"}
                displayText2={elem?.mobileNumber}
                styleData1={{ marginBottom: "1rem" }}
              />
              <FMTypography
                displayText={"Pay On Delivery Available"}
                styleData={{ fontSize: "1rem", color: "#717171" }}
              />
            </Box>
          )) : <></>}
        </RadioGroup>
      </Grid>
    </>
  );
};

export default AllAddressComponent;