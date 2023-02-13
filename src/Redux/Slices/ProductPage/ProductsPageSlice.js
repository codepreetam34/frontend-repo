import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { GET_PRODUCTS_LIST } from "./type";

export const getProductsList = createAsyncThunk(
  GET_PRODUCTS_LIST,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/product/getProducts`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const productListSlice = createSlice({
  name: "productListSlice",
  initialState: {
    getProductsListData: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProductsList.pending, (state) => {
      state.getProductsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getProductsList.fulfilled, (state, action) => {
      state.getProductsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getProductsList.rejected, (state, action) => {
      state.getProductsListData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default productListSlice.reducer;
