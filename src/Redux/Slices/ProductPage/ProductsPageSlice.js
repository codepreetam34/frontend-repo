import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import {
  GET_PRODUCTS_LIST,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS_LIST_BY_CATEGORY_ID,
  GET_PRODUCTS_LIST_BY_CATEGORY_ID_AND_TAGS, GET_PRODUCTS_LIST_BY_SORTING
} from "./type";

export const getProductPageDetail = createAsyncThunk(
  GET_PRODUCT_DETAIL,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/product/${payload.id}`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getProductByCategoryId = createAsyncThunk(
  GET_PRODUCTS_LIST_BY_CATEGORY_ID,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        "api/product/getProducts/categoryid",
        { id: payload.id }
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const getProductByCategoryIdAndTags = createAsyncThunk(
  GET_PRODUCTS_LIST_BY_CATEGORY_ID_AND_TAGS,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/product/getProductsByTagName`,
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getProductsBySorting = createAsyncThunk(
  GET_PRODUCTS_LIST_BY_SORTING,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/product/getProductsBySorting`,
        payload
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getProductsList = createAsyncThunk(
  GET_PRODUCTS_LIST,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/product/getProducts`);
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
    getProductsListByCategoryId: [],
    getProductsListByCategoryIdAndTags: [],
    getProductDetails: [],
    getSortedProducts: [],
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

    builder.addCase(getProductByCategoryId.pending, (state) => {
      state.getProductsListByCategoryId = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getProductByCategoryId.fulfilled, (state, action) => {
      state.getProductsListByCategoryId = action.payload;
      state.isFetching = false;
      state.isError = false;
    });

    builder.addCase(getProductByCategoryId.rejected, (state, action) => {
      state.getProductsListByCategoryId = {};
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(getProductByCategoryIdAndTags.pending, (state) => {
      state.getProductsListByCategoryIdAndTags = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(
      getProductByCategoryIdAndTags.fulfilled,
      (state, action) => {
        state.getProductsListByCategoryIdAndTags = action.payload;
        state.isFetching = false;
        state.isError = false;
      }
    );

    builder.addCase(getProductByCategoryIdAndTags.rejected, (state, action) => {
      state.getProductsListByCategoryIdAndTags = {};
      state.isFetching = false;
      state.isError = true;
    });




    builder.addCase(getProductsBySorting.pending, (state) => {
      state.getSortedProducts = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(
      getProductsBySorting.fulfilled,
      (state, action) => {
        state.getSortedProducts = action.payload;
        state.isFetching = false;
        state.isError = false;
      }
    );

    builder.addCase(getProductsBySorting.rejected, (state, action) => {
      state.getSortedProducts = {};
      state.isFetching = false;
      state.isError = true;
    });











    builder.addCase(getProductPageDetail.pending, (state) => {
      state.getProductDetails = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getProductPageDetail.fulfilled, (state, action) => {
      state.getProductDetails = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getProductPageDetail.rejected, (state, action) => {
      state.getProductDetails = {};
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default productListSlice.reducer;
