import React, { useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FMDropdown = ({ name, options, id, onChange, sx, defaultValue }) => {
  const [quantityOption, setQuantityOption] = useState(defaultValue);

  const optionChangeHandler = (e) => {
    setQuantityOption(e.target.value);
    console.log("e.target.value", e.target.value);
    onChange(e);
  };

  return (
    <Box sx={{ ...sx }}>
      <Select
        id={id || name}
        name={name}
        onChange={optionChangeHandler}
        defaultValue={defaultValue}
        value={quantityOption}
        sx={sx}
        displayEmpty
      >
        <MenuItem disabled value="Sort By">
          Sort By
        </MenuItem>
        {options?.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default FMDropdown;
