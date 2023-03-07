import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "services/AxiosInstance";
import { MY_PROFILE } from "./type";

export const getProfileDetail = createAsyncThunk(
  MY_PROFILE,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.get("api/user");
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

const myProfileSlice = createSlice({
  name: "profileSlice",
  initialState: {
    getProfileData: [],
    error: "",
    isFetching: false,
    isError: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getProfileDetail.pending, (state) => {
      state.getProfileData = [];
      state.isFetching = true;
      state.isError = false;
    });

    builder.addCase(getProfileDetail.fulfilled, (state, action) => {
      state.getProfileData = action.payload;
      state.isFetching = false;
      state.isError = false;
    });
    builder.addCase(getProfileDetail.rejected, (state, action) => {
      state.getProfileData = [];
      state.isFetching = false;
      state.isError = true;
    });
  },
});

export default myProfileSlice.reducer;
