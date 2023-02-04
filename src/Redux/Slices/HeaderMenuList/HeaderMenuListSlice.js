import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
// import axiosInstance from "Services/axiosInstance";
import { GET_MENU_LIST } from "./type";
// import { GET_MENU_LIST } from "./types";
// import { PER_PAGE_LIMIT } from "Constants/AppConstant";

export const getMenuBarList = createAsyncThunk(
  GET_MENU_LIST,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`api/category/getcategory`);
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
  },
});

export default menuListSlice.reducer;
