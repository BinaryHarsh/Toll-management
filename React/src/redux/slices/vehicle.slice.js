import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callapi } from "config/apiUtil";
// Data
import { apiurls } from "config/apiurls";
const initialState = {
  isLoading: true,
  error: "",
  data: [],
};
export const transaction_vehicle_slice = createAsyncThunk(
  "transaction_vehicle/vehicle",
  async (thunkApi,{ rejectWithValue }) => {
    try {
      let url = `${process.env.REACT_APP_API_URL}${apiurls.getTransactionAndVehicleStatistics}/${thunkApi}`
      // const apiresponse = await callapi(`${apiurls.getTransactionAndVehicleStatistics}/${thunkApi}`,"GET")
      const response = await fetch(url).then(function (res) {
        if (!res.ok) {  
          throw new Error(res.status);
        }
        
        return res;
      });
      const data = await response.json();
      return data;
    } catch (err) {
      return rejectWithValue(`Error: ${err.message})`);
    }
  }
);

export const transaction_vehicle = createSlice({
  name: "transaction_vehicle",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(transaction_vehicle_slice.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(transaction_vehicle_slice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(transaction_vehicle_slice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const transactionvehicle_isloading = (state) => state.transaction_and_vehicle.isLoading;
export const transactionvehicle_error = (state) => state.transaction_and_vehicle.error;
export const transactionvehicle_data = (state) => state.transaction_and_vehicle.data;
export default transaction_vehicle.reducer;