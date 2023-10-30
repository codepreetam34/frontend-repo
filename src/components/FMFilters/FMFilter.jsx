import { Grid } from "@mui/material";
import { getProductByCategoryIdAndTags, getProductsBySorting } from "Redux/Slices/ProductPage/ProductsPageSlice";
import FMButton from "components/FMButton/FMButton";
import FMDropdown from "components/FMDropdown/FMDropdown";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
const FMFilter = ({
  pageInfo,
  pincodeData,
  setCategoryId,
  tagName,
  sendCategoryId,
  setIsLoading,
  switchProducts,
  setPageTitle,
  setDisplayedProducts,
}) => {
  const dispatch = useDispatch();
  const [sortingValue, setSortingValue] = useState()
  console.log("category id : ", sendCategoryId)
  const sortByOptionsChangeHandler = (e) => {
    setSortingValue(e.target.value)
    const payload = {
      sort: e.target.value,
      pageInfo,
      categoryId: sendCategoryId,
      tagName,
      pincodeData
    };
    setIsLoading(true);
    dispatch(getProductsBySorting(payload))
      .then((response) => {
        setIsLoading(false);
        switchProducts(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  const tagOptionsChangeHandler = (tag) => {
    const payload = {
      tagName: tag,
      categoryId: sendCategoryId,
      pincodeData,
      sort: sortingValue,
    };

    dispatch(getProductByCategoryIdAndTags(payload))
      .then((response) => {
        setIsLoading(false);
        switchProducts(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const pageTitle = useSelector(
    (state) =>
      state?.getProductsList?.getProductsListByCategoryIdAndTags?.pageTitle
  );
  const categoryId = useSelector(
    (state) =>
      state?.getProductsList?.getProductsListByCategoryIdAndTags?.categoryId
  );
  const tagsCategoryProducts = useSelector(
    (state) =>
      state?.getProductsList?.getProductsListByCategoryIdAndTags?.products
  );
  const sortedProducts = useSelector(
    (state) =>
      state?.getProductsList?.getSortedProducts?.sortedProducts
  );

  useEffect(() => {
    setDisplayedProducts(sortedProducts);
  }, [dispatch,sortedProducts]);
  useEffect(() => {
    setDisplayedProducts(tagsCategoryProducts);
  }, [dispatch,tagsCategoryProducts]);

  useEffect(() => {
    setCategoryId(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  const sortByOptions = [
    { id: 0, label: "Sort By" },
    { id: 1, label: "New to Old" },
    { id: 1, label: "Old to New" },
    { id: 1, label: "High to Low" },
    { id: 1, label: "Low to High" },

  ];

  const TagOptions = [
    "Best Sellers",
    "Birthday Cakes",
    "Anniversary Cakes",
    "Same Day Delivery",
  ];

  return (
    <>
      <Grid sx={{ display: "flex", gap: "1rem" }}>
        <FMDropdown
          name="department_id"
          defaultValue={"Sort By"}
          options={sortByOptions}
          sx={{ width: "10rem" }}
          placeholder="Please select department"
          onChange={sortByOptionsChangeHandler} // Ensure this is correctly set
        />

        {TagOptions &&
          TagOptions?.map((tag) => {
            return (
              <>
                <FMButton
                  onClick={() => tagOptionsChangeHandler(tag)}
                  displayText={tag}
                  variant={"outlined"}
                  styleData={{
                    border: "1px solid #E6E6E6",
                    fontWeight: '600',
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
