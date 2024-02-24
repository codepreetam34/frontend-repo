import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../../services/AxiosInstance";
import { ADD_A_VENDOR,} from "./type";

export const addAVendor = createAsyncThunk(
  ADD_A_VENDOR,
  async (payload, thunkAPI) => {
    try {
      const response = await axiosInstance.post(`api/vendor/create`,payload);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue({ error: error });
    }
  }
);

export const VendorSlice = createSlice({
  name: "VendorSlice",
  initialState: {
    vendorData: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAVendor.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAVendor.fulfilled, (state, action) => {
        state.loading = false;
        state.vendorData = action.payload;
      })
      .addCase(getAVendor.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload.error;
      });
  },
});

export default VendorSlice.reducer;
