import { Grid } from "@mui/material";
import FMButton from "components/FMButton/FMButton";
import FMDropdown from "components/FMDropdown/FMDropdown";
import React from "react";

const FMFilter = () => {
  const departmentChangeHandler = (e) => {
    // setDepartmentId(e.target.value);
    // setValue("department_id", e.target.value);
    // setRoleId("");
    // setValue("role_id", "");
    // departmentOnChange(e);
  };

  const departmentOptions = ["Best Seller", "Birthday Cake"];

  return (
    <>
      <Grid sx={{ display: "flex" }}>
        <FMDropdown
          name="department_id"
          options={departmentOptions}
          dropdownvalue="departmentName"
          placeholder="Please select department"
          onChange={departmentChangeHandler}
        />
        <FMButton
          displayText={"Best Seller"}
          variant={"outlined"}
          styleData={{
            border: "1px solid #E6E6E6",
            borderRadius: "19px",
            "&:hover": {
              border: "1px solid #E6E6E6",
            },
          }}
        />
        <FMButton
          displayText={"Best Seller"}
          variant={"outlined"}
          styleData={{
            border: "1px solid #E6E6E6",
            borderRadius: "19px",
            "&:hover": {
              border: "1px solid #E6E6E6",
            },
          }}
        />
      </Grid>
    </>
  );
};

export default FMFilter;
