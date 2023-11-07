import React, { useEffect, useState } from "react";
import { Box, Grid, Radio, RadioGroup, FormControlLabel, IconButton, CircularProgress } from "@mui/material";
import FMDetailTypography from "components/FMDetailTypography/FMDetailTypography";
import FMTypography from "components/FMTypography/FMTypography";
import { useSelector, useDispatch } from "react-redux";
//import { setDefaultAddress } from "yourAddressActions";
import DeleteIcon from "@mui/icons-material/Delete";
const AllAddressComponent = ({ styleData, addressDetailsAdded }) => {
  const dispatch = useDispatch();
  const [selectedAddress, setSelectedAddress] = useState(getInitialSelectedAddress());

  function getInitialSelectedAddress() {
    return addressDetailsAdded && addressDetailsAdded.length > 0
      ? addressDetailsAdded[0]?._id
      : undefined;
  }

  const handleRemoveAddress = (addressId) => {

    // Perform the API call to remove the address with the given addressId

    // Update the Redux store if needed

  };

  const handleRadioChange = (id) => {
    setSelectedAddress(id);
  };

  const [isLoading, setIsLoading] = useState(true); // State to manage loading state

  useEffect(() => {
    // Simulate loading delay (You can replace this with an API call)
    // Set the selected address when addressDetailsAdded is available
    if (addressDetailsAdded && addressDetailsAdded.length > 0) {
      setSelectedAddress(addressDetailsAdded[0]._id);
      setIsLoading(false);
    }
  }, [addressDetailsAdded]);
  // if (isLoading) {
  //   // Display a loader while loading
  //   return (
  //     <div>
  //       <CircularProgress />
  //     </div>
  //   );
  // }
  return (
    <>
      <Grid>
        <RadioGroup value={selectedAddress} onChange={handleRadioChange}>
          {addressDetailsAdded && addressDetailsAdded.length > 0 ? addressDetailsAdded?.map((elem, index) => (
            <Box
              key={elem?._id} // Make sure each address has a unique identifier (e.g., id)
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
                onChange={() => handleRadioChange(elem?._id)} // Pass elem to the function
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











// import { Box, Grid } from "@mui/material";
// import FMDetailTypography from "components/FMDetailTypography/FMDetailTypography";
// import FMTypography from "components/FMTypography/FMTypography";
// import React from "react";
// import { useSelector } from "react-redux";

// const AllAddressComponent = ({ styleData }) => {
//   const addressDetailsAdded = useSelector(
//     (state) =>
//       state?.addToCartAddress?.getAddToCartAddress?.userAddress?.address
//   );

//   return (
//     <>
//       <Grid>
//         {addressDetailsAdded?.map((elem) => (
//           <Box
//             sx={{
//               boxShadow:
//                 "0px -1px 12px rgba(181, 180, 180, 0.12), 0px 1px 12px rgba(181, 180, 180, 0.12)",
//               borderRadius: "20px",
//               padding: "40px",
//               ...styleData,
//             }}
//           >
//             {/* {addressDetailsAdded[0] && (
//               <Box sx={{ marginBottom: "2rem" }}>
//                 <FMTypography
//                   displayText={"Default Address"}
//                   styleData={{ fontSize: "20px", fontWeight: "400" }}
//                 />
//               </Box>
//             )} */}
//             <Box sx={{ display: "flex", marginBottom: "1rem" }}>
//               <FMTypography
//                 displayText={elem?.name}
//                 styleData={{ fontSize: "1rem", fontWeight: "500" }}
//               />
//               <FMTypography
//                 displayText={`(${elem?.addressType})`}
//                 styleData={{
//                   fontSize: "12px",
//                   fontWeight: "500",
//                   marginLeft: "12px",
//                   marginTop: ".2rem",
//                   color: "#222222",
//                 }}
//               />
//             </Box>
//             <FMTypography
//               displayText={elem.address}
//               styleData={{
//                 fontSize: "1rem",
//                 color: "#717171",
//                 fontWeight: "400",
//                 marginBottom: "1rem",
//               }}
//             />
//             <FMDetailTypography
//               displayText1={"Mobile:"}
//               displayText2={elem?.mobileNumber}
//               styleData1={{ marginBottom: "1rem" }}
//             />
//             <FMTypography
//               displayText={"Pay On Delivery Available"}
//               styleData={{ fontSize: "1rem", color: "#717171" }}
//             />
//           </Box>
//         ))}
//       </Grid>
//     </>
//   );
// };

// export default AllAddressComponent;
