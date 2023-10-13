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

  const sortByOptions = [
    "New to Old",
    "Old to New",
    "High to Low",
    "Low to High",
  ];

  const TagOptions = ["Best Seller", "Birthday", "Anniversary", "Wedding"];

  return (
    <>
      <Grid sx={{ display: "flex", gap: "1rem" }}>
        <FMDropdown
          name="department_id"
          defaultValue={"Sort By"}
          options={sortByOptions}
          dropdownvalue="departmentName"
          sx={{ width: "10rem" }}
          placeholder="Please select department"
          onChange={departmentChangeHandler}
        />
        {TagOptions &&
          TagOptions?.map((tag) => {
            return (
              <>
                <FMButton
                  displayText={tag}
                  variant={"outlined"}
                  styleData={{
                    border: "1px solid #E6E6E6",
                    borderRadius: "19px",
                    "&:hover": {
                      border: "1px solid #E6E6E6",
                    },
                  }}
                />
              </>
            );
          })}
      </Grid>
    </>
  );
};

export default FMFilter;
