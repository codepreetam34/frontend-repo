import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { ADD_A_VENDOR, VENDOR_SIGN_UP, VENDOR_SIGN_IN } from "./type";

export const addAVendor = createAsyncThunk(
  ADD_A_VENDOR,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/vendor/create`, payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const vendorSignUpUser = createAsyncThunk(
  VENDOR_SIGN_UP,
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/vendor/signup", data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const vendorSignInUser = createAsyncThunk(
  VENDOR_SIGN_IN,
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("api/vendor/signIn", data);
      console.log("response ",response.data);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const VendorSlice = createSlice({
  name: "VendorSlice",
  initialState: {
    isLoggedIn: false,
    isFetching: false,
    data: {},
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(vendorSignInUser.pending, (state) => {
      state.data = {};
      state.isFetching = true;
    });

    builder.addCase(vendorSignInUser.fulfilled, (state, action) => {
      state.data = action.payload;
      state.isLoggedIn = true;
      state.isFetching = false;
      localStorage.setItem(
        "Sidebar_Module_Assigned_Vendor",
        JSON.stringify(action.payload.user)
      );
      localStorage.setItem(
        "AUTH_ACCESS_TOKEN_VENDOR",
        JSON.stringify(action.payload.token)
      );
    });
    builder.addCase(vendorSignInUser.rejected, (state, action) => {
      state.data = {};
      state.isLoggedIn = false;
      state.isFetching = false;
    });
  },
});

export default VendorSlice.reducer;
