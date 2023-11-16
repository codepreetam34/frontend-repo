import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { PRODUCT_DETAIL_PAGE, ADD_TO_CART } from "./type";

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

// add to cart api below

export const addToCart = createAsyncThunk(
  ADD_TO_CART,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/user/cart/addtocart",
        payload
      );
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
    data: {},
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

    // add to cart cases
    builder.addCase(addToCart.pending, (state) => {
      state.data = {};
      state.isFetching = true;
    });

    builder.addCase(addToCart.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isFetching = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.data = {};
      state.isFetching = false;
    });
  },
});

export default productDetailSlice.reducer;
