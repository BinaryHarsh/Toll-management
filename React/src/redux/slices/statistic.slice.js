import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Data
import { apiurls } from "config/apiurls";
const initialState = {
  isLoading: true,
  error: "",
  data: [],
};
export const url = `${process.env.REACT_APP_API_URL}${apiurls.statistics}`;
export const statisticslice = createAsyncThunk(
  "home/stats",
  async (thunkApi, { rejectWithValue }) => {
    try {
      const response = await fetch(url).then(function (res) {
        if (!res.ok) {
          throw new Error(res.status);
        }
        return res;
      });
      const datas = await response.json();
      return datas;
    } catch (err) {
      return rejectWithValue(`Error: ${err.message})`);
    }
  }
);
export const statisticSlice = createSlice({
  name: "home",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(statisticslice.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(statisticslice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload;
      })
      .addCase(statisticslice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const staticIsLoading = (state) => state.statistics.isLoading;
export const staticError = (state) => state.statistics.error;
export const staticData = (state) => state?.statistics?.data;
export default statisticSlice.reducer;