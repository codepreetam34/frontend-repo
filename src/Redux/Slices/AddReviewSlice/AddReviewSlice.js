import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { ADD_REVIEW } from "./type";

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

const addReviewsSlice = createSlice({
  name: "addReview",
  initialState: {
    isLoggedIn: false,
    isFetching: false,
    reviews: {},
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
  },
});

export default addReviewsSlice.reducer;
