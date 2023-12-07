import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { ADD_REVIEW, CHECK_PRODUCT_PURCHASE } from "./type";

export const addReviews = createAsyncThunk(
  ADD_REVIEW,
  async ({ payload }, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/product/${payload?.id}/reviews`,
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const checkProductPurchase = createAsyncThunk(
  CHECK_PRODUCT_PURCHASE,
  async (productId , thunkAPI) => {
    try {
      const response = await axiosInstance.get(
        `api/checkProductPurchase/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const addReviewsSlice = createSlice({
  name: "addReview",
  initialState: {
    isLoggedIn: false,
    isFetching: false,
    reviews: {},
    checkProductPurchase: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addReviews.pending, (state) => {
      state.reviews = {};
      state.isFetching = true;
    });

    builder.addCase(addReviews.fulfilled, (state, action) => {
      state.reviews = action.payload;
      state.isLoggedIn = true;
      state.isFetching = false;
    });
    builder.addCase(addReviews.rejected, (state, action) => {
      state.reviews = {};
      state.isLoggedIn = false;
      state.isFetching = false;
    });
    builder.addCase(checkProductPurchase.pending, (state) => {
      state.checkProductPurchase = {};
      state.isFetching = true;
    });

    builder.addCase(checkProductPurchase.fulfilled, (state, action) => {
      state.checkProductPurchase = action.payload;
      state.isLoggedIn = true;
      state.isFetching = false;
    });
    builder.addCase(checkProductPurchase.rejected, (state, action) => {
      state.checkProductPurchase = {};
      state.isLoggedIn = false;
      state.isFetching = false;
    });
  },
});

export default addReviewsSlice.reducer;
