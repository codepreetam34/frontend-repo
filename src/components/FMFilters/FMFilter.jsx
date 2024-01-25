import { Box, Grid } from "@mui/material";
import {
  getProductByCategoryIdAndTags,
  getProductsBySorting,
} from "../../Redux/Slices/ProductPage/ProductsPageSlice";
import FMButton from "../../components/FMButton/FMButton";
import FMDropdown from "../../components/FMDropdown/FMDropdown";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const FMFilter = ({
  pageInfo,
  setPageTitle,
  pincodeData,
  tagName,
  sendCategoryId,
  setIsLoading,
  setDisplayedProducts,
}) => {
  const dispatch = useDispatch();
  const [sortingValue, setSortingValue] = useState("Sort By"); // Default to "Sort By"
  const [activeTag, setActiveTag] = useState("");

  useEffect(() => {
    setActiveTag(tagName);
  }, [tagName]);

  const sortByOptionsChangeHandler = (e) => {
    setIsLoading(true);
    const newSortingValue = e.target.value;
    const payload = {
      sort: newSortingValue,
      pageInfo,
      categoryId: sendCategoryId,
      tagName: activeTag || tagName,
      pincodeData,
    };

    dispatch(getProductsBySorting(payload))
      .then((response) => {
        const updatedActiveTag = response?.payload?.tagName;
        setSortingValue(newSortingValue); // Move this line here
        setActiveTag(updatedActiveTag);
        setPageTitle(response?.payload?.pageTitle);
        setDisplayedProducts(response?.payload?.sortedProducts);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const tagOptionsChangeHandler = (tag) => {
    setIsLoading(true);
    const payload = {
      tagName: tag,
      categoryId: sendCategoryId,
      pincodeData,
      sort: sortingValue,
    };
    dispatch(getProductByCategoryIdAndTags(payload))
      .then((response) => {
        const updatedActiveTag = response?.payload?.tagName;
        setActiveTag(updatedActiveTag);
        setPageTitle(response?.payload?.pageTitle);
        setDisplayedProducts(response?.payload?.products);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const sortByOptions = [
    { id: 0, label: "Sort By" },
    { id: 1, label: "New to Old" },
    { id: 2, label: "Old to New" },
    { id: 3, label: "Price: High to Low" },
    { id: 4, label: "Price: Low to High" },
  ];

  const TagOptions = [
    "Best Sellers",
    "Birthday Cakes",
    "Anniversary Cakes",
    "Same Day Delivery",
  ];

  return (
    <>
      <Grid
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: "1rem",
           }}
      >
        <FMDropdown
          name="department_id"
          value={sortingValue}
          options={sortByOptions}
          sx={{ width: { xs: "100%", sm: "10rem" } }}
          placeholder="Please select department"
          onChange={sortByOptionsChangeHandler}
        />
        <Box
          sx={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          {TagOptions &&
            TagOptions?.map((tag) => (
              <FMButton
                key={tag}
                onClick={() => tagOptionsChangeHandler(tag)}
                displayText={tag}
                variant={"outlined"}
                styleData={{
                  fontWeight: "600",
                  color: "#801317",
                  background:
                    activeTag !== "" && activeTag === tag
                      ? "#f8d7da"
                      : "transparent",
                  borderRadius: "19px",
                  width: { xs: "46%", sm: "auto" }, // Adjust width for mobile devices
                  fontSize: { xs: "12px", sm: "inherit" }, // Adjust font size for mobile devices
                  padding: { xs: "12px", sm: "8px 16px" }, // Adjust padding for mobile devices
                }}
              />
            ))}
        </Box>
      </Grid>
    </>
  );
};

export default FMFilter;
