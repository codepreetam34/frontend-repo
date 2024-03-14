import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import {
  GET_PRODUCTS_LIST,
  GET_PRODUCT_DETAIL,
  GET_PRODUCTS_LIST_BY_CATEGORY_ID,
  GET_PRODUCTS_LIST_BY_CATEGORY_ID_AND_TAGS,
  GET_PRODUCTS_LIST_BY_SORTING,
  GET_BEST_SELLER_PRODUCTS_LIST,
  GET_TOP_CATEGORY_PRODUCTS_LIST,
  GET_PRODUCTS_LIST_BY_TAGS_ONLY,
  GET_VENDOR_PRODUCTS,
  ADD_VENDOR_PRODUCTS,
} from "./type";
import axiosVendorInstance from "services/AxiosVendorInstance";

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
        { id: payload.id, pincodeData: payload.pincodeData }
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
export const getProductsByTagOnly = createAsyncThunk(
  GET_PRODUCTS_LIST_BY_TAGS_ONLY,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/product/getProductsByTagOnly`,
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
export const getBestSellerProducts = createAsyncThunk(
  GET_BEST_SELLER_PRODUCTS_LIST,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/product/getBestSellerProducts`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const getTopCategoryProducts = createAsyncThunk(
  GET_TOP_CATEGORY_PRODUCTS_LIST,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(
        `api/product/getTopCategoryProducts`
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const addVendorProducts = createAsyncThunk(
  ADD_VENDOR_PRODUCTS,
  async (addProductData, thunkAPI) => {
    try {
      const response = await axiosVendorInstance.post(
        `api/product/vendor/create`,
        addProductData
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);
export const getVendorProducts = createAsyncThunk(
  GET_VENDOR_PRODUCTS,
  async (addProductData, thunkAPI) => {
    try {
      const response = await axiosVendorInstance.get(
        `api/product/vendor/get`,
        addProductData
      );
      console.log("response by redux ", response);
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
    getVendorProductsListData: [],
    getProductsListByCategoryId: [],
    getProductsListByCategoryIdAndTags: [],
    getProductDetails: [],
    getSortedProducts: [],
    getBestSellerProducts: [],
    getTopCategoryProducts: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getVendorProducts.pending, (state) => {
      state.getVendorProductsListData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getVendorProducts.fulfilled, (state, action) => {
      state.getVendorProductsListData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getVendorProducts.rejected, (state, action) => {
      state.getVendorProductsListData = [];
      state.isFetching = false;
      state.isError = true;
    });
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

    builder.addCase(getProductsBySorting.fulfilled, (state, action) => {
      state.getSortedProducts = action.payload;
      state.isFetching = false;
      state.isError = false;
    });

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

    builder.addCase(getBestSellerProducts.pending, (state) => {
      state.getBestSellerProducts = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getBestSellerProducts.fulfilled, (state, action) => {
      state.getBestSellerProducts = action.payload;
      state.isFetching = false;
      state.isError = false;
    });

    builder.addCase(getBestSellerProducts.rejected, (state, action) => {
      state.getBestSellerProducts = {};
      state.isFetching = false;
      state.isError = true;
    });

    builder.addCase(getTopCategoryProducts.pending, (state) => {
      state.getTopCategoryProducts = {};
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getTopCategoryProducts.fulfilled, (state, action) => {
      state.getTopCategoryProducts = action.payload;
      state.isFetching = false;
      state.isError = false;
    });

    builder.addCase(getTopCategoryProducts.rejected, (state, action) => {
      state.getTopCategoryProducts = {};
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default productListSlice.reducer;
