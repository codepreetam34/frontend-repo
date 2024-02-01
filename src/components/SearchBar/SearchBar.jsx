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
    let displayedText = '';
  
    const interval = setInterval(() => {
      if (currentIndex < placeholder.length) {
        if (placeholder[currentIndex] === ' ') {
          displayedText += ' '; // Add space directly without animation for word boundaries
        } else {
          displayedText += placeholder[currentIndex]; // Add current character to displayed text
        }
        setDisplayedPlaceholder(displayedText);
        currentIndex++;
      } else {
        clearInterval(interval); // Clear the interval when the entire placeholder is displayed
        setTimeout(() => {
          setDisplayedPlaceholder(''); // Clear displayed text after a delay
          setPlaceholderIndex((prevIndex) => (prevIndex + 1) % placeholders.length); // Move to the next placeholder
        }, 2000); // Delay before switching to the next placeholder
      }
    }, 100); // Typing speed
  
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
