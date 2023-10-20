import { Grid } from "@mui/material";
import { getProductByCategoryIdAndTags, getProductsBySorting } from "Redux/Slices/ProductPage/ProductsPageSlice";
import FMButton from "components/FMButton/FMButton";
import FMDropdown from "components/FMDropdown/FMDropdown";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
const FMFilter = ({
  pageInfo,
  setCategoryId,
  tagName,
  setIsLoading,
  switchProducts,
  setPageTitle,
  setDisplayedProducts,
}) => {
  const dispatch = useDispatch();
  const sortByOptionsChangeHandler = (e) => {

    const payload = {
      sort: e.target.value,
      pageInfo,
      categoryId,
      tagName
    };
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
      categoryId,
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

  useEffect(() => {
    setDisplayedProducts(tagsCategoryProducts);
  }, [tagsCategoryProducts]);

  useEffect(() => {
    setCategoryId(categoryId);
  }, [categoryId]);

  useEffect(() => {
    setPageTitle(pageTitle);
  }, [pageTitle]);

  const sortByOptions = [
    "New to Old",
    "Old to New",
    "High to Low",
    "Low to High",
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
