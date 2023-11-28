import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { GET_HOMEPAGE_SHOP_BY_OCCASION_BANNER, } from "./type";

export const getHomePageShopByOccasion = createAsyncThunk(
  GET_HOMEPAGE_SHOP_BY_OCCASION_BANNER,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/bannerShopByOccasion/getBanners`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const ShopByOccasionSlice = createSlice({
  name: "ShopByOccasionSlice",
  initialState: {
    shopByOccations: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHomePageShopByOccasion.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getHomePageShopByOccasion.fulfilled, (state, action) => {
        state.loading = false;
        state.shopByOccations = action.payload;
      })
      .addCase(getHomePageShopByOccasion.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default ShopByOccasionSlice.reducer;