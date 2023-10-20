import React, { useState } from "react";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

const FMDropdown = ({ name, options, id, onChange, sx, defaultValue }) => {
  const [quantityOption, setQuantityOption] = useState(defaultValue);

  const optionChangeHandler = (e) => {
    setQuantityOption(e.target.value);
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
        <MenuItem disabled value="">
          Select Time Slot
        </MenuItem>
        {options?.map((option) => (
          <MenuItem key={option.id} value={option.label}>
            {option.label}
          </MenuItem>
        ))}
      </Select>
    </Box>
  );
};

export default FMDropdown;
