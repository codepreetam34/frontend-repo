import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { PRODUCT_DETAIL_PAGE } from "./type";

export const getProductsDetail = createAsyncThunk(
  PRODUCT_DETAIL_PAGE,
  async (productId, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/product/${productId}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const productDetailSlice = createSlice({
  name: "productListSlice",
  initialState: {
    getProductsListData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsDetail.pending, (state) => {
      state.getProductsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getProductsDetail.fulfilled, (state, action) => {
      state.getProductsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getProductsDetail.rejected, (state, action) => {
      state.getProductsListData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default productDetailSlice.reducer;
