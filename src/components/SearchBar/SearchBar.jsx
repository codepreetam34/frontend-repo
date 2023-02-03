import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";

import { SearchStyle } from "./searchBarStyles";

const SearchBar = ({
  placeholder,
  onChange,
  value,
  clearText,
  cancelIconRight,
}) => {
  return (
    <Box sx={SearchStyle.searchBoxWrapper}>
      <SearchIcon sx={SearchStyle.searchIcon} />
      <Input
        fullWidth
        placeholder={placeholder}
        onChange={onChange}
        value={value}
        sx={SearchStyle.inputField}
        disableUnderline
      />

      {cancelIconRight && value.length !== 0 && (
        <CloseOutlinedIcon onClick={clearText} sx={SearchStyle.cancelIcon} />
      )}
    </Box>
  );
};

export default SearchBar;