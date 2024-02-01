import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/material/Input";
import Box from "@mui/material/Box";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import { SearchStyle } from "./searchBarStyles";
import "./searchBarMedia.css";

const SearchBar = ({
  placeholders,
  onChange,
  value,
  clearText,
  cancelIconRight,
}) => {
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [displayedPlaceholder, setDisplayedPlaceholder] = useState("");

  useEffect(() => {
    const placeholder = placeholders[placeholderIndex];
    if (!placeholder) return;

    let currentIndex = 0;
    let displayedText = "";

    const interval = setInterval(() => {
      if (currentIndex < placeholder.length) {
        if (placeholder[currentIndex] === " ") {
          displayedText += " ";
        } else {
          displayedText += placeholder[currentIndex];
        }
        setDisplayedPlaceholder(displayedText);
        currentIndex++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          let eraseIndex = displayedText.length - 1;
          const eraseInterval = setInterval(() => {
            if (eraseIndex >= 0) {
              setDisplayedPlaceholder((prev) => prev.slice(0, -1));
              eraseIndex--;
            } else {
              clearInterval(eraseInterval);
              setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length);
            }
          }, 100);
        }, 1000);
      }
    }, 100);

    return () => clearInterval(interval);
  }, [placeholderIndex, placeholders]);

  return (
    <Box sx={SearchStyle.searchBoxWrapper} className="searchBoxWrapper">
      <Input
        placeholder={displayedPlaceholder}
        onChange={onChange}
        value={value}
        sx={SearchStyle.inputField}
        disableUnderline
        style={{ width: "100%" }}
      />
      <SearchIcon sx={SearchStyle.searchIcon} />
      {cancelIconRight && value.length !== 0 && (
        <CloseOutlinedIcon onClick={clearText} sx={SearchStyle.cancelIcon} />
      )}
    </Box>
  );
};

export default SearchBar;
