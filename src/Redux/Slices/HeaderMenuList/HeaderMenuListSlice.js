import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { GET_MENU_LIST } from "./type";
import { GET_CATEGORY_CHILDREN } from "../ProductPage/type";

export const getMenuBarList = createAsyncThunk(
  GET_MENU_LIST,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/category/getcategories`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const getCategoryChildrens = createAsyncThunk(
  GET_CATEGORY_CHILDREN,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/category/getchildrens`, {
        id: payload.id,
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const menuListSlice = createSlice({
  name: "menuListSlice",
  initialState: {
    getMenuOptionsData: [],
    getCategoryChildrens: [],
    error: "",
    isFetching: false,
    isError: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getMenuBarList.pending, (state) => {
      state.getMenuOptionsData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getMenuBarList.fulfilled, (state, action) => {
      state.getMenuOptionsData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getMenuBarList.rejected, (state, action) => {
      state.getMenuOptionsData = [];
      state.isFetching = false;
      state.isError = true;
    });
    builder
      .addCase(getCategoryChildrens.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryChildrens.fulfilled, (state, action) => {
        state.loading = false;
        state.ChidCategoryList = action.payload;
      })
      .addCase(getCategoryChildrens.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default menuListSlice.reducer;
