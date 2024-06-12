import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Data
import { apiurls } from "config/apiurls";
const initialState = {
  isLoading: true,
  error: "",
  data: [],
};

export const url = `${process.env.REACT_APP_API_URL}${apiurls.allreports}`;
export const download_report = createAsyncThunk(
  "download_report/list",
  async (thunkApi,{ rejectWithValue }) => {
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

export const download_report_slice = createSlice({
  name: "download_report_list",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(download_report.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(download_report.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(download_report.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const report_download_isloading = (state) => state.download_report.isLoading;
export const report_download_error = (state) => state.download_report.error;
export const report_download_list = (state) => state.download_report.data;
export default download_report_slice.reducer;