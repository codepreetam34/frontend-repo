import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { FIRST_CAROUSEL, CATEGORY_CAROUSEL } from "./type";

export const getCarousel = createAsyncThunk(
  FIRST_CAROUSEL,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/banner/getBanners`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCategoryCarousel = createAsyncThunk(
  CATEGORY_CAROUSEL,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/slider/getsliders`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const getCarouselSlice = createSlice({
  name: "productListSlice",
  initialState: {
    getCarouselData: [],
    getProductCarouselData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCarousel.pending, (state) => {
      state.getCarouselData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCarousel.fulfilled, (state, action) => {
      state.getCarouselData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCarousel.rejected, (state, action) => {
      state.getCarouselData = [];
      state.isFetching = false;
      state.isError = true;
    });
    // pro carousel
    builder.addCase(getCategoryCarousel.pending, (state) => {
      state.getProductCarouselData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getCategoryCarousel.fulfilled, (state, action) => {
      state.getProductCarouselData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getCategoryCarousel.rejected, (state, action) => {
      state.getProductCarouselData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default getCarouselSlice.reducer;
