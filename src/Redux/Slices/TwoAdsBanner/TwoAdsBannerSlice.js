import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { GET_HOMEPAGE_TWO_ADS_BANNER, } from "./type";

export const getHomePageTwoAdsBanner = createAsyncThunk(
  GET_HOMEPAGE_TWO_ADS_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/bannerTwoAds/getBanners`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const TwoAdsBannerSlice = createSlice({
  name: "TwoAdsBannerSlice",
  initialState: {
    twoAdsBanners: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageTwoAdsBanner.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomePageTwoAdsBanner.fulfilled, (state, action) => {
        state.loading = false;
        state.twoAdsBanners = action.payload;
      })
      .addCase(getHomePageTwoAdsBanner.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default TwoAdsBannerSlice.reducer;
