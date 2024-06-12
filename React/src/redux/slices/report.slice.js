import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
// Data
import { apiurls } from "config/apiurls";
const initialState = {
  isLoading: true,
  error: "",
  data: [],
};

export const url = `${process.env.REACT_APP_API_URL}${apiurls.report1}`;
export const details_report_list = createAsyncThunk(
  "details_report_list/list",
  async (thunkApi,{ rejectWithValue }) => {
    try {
      let obj = {
        ...thunkApi,
        fromDate:(thunkApi.fromDate).toISOString(),
        toDate:(thunkApi.toDate).toISOString()
      }
      let option = {
        method:"POST",
        body:JSON.stringify(obj)
      }
      const response = await fetch(url,option).then(function (res) {
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

export const details_report_list_slice = createSlice({
  name: "report_detail_list",
  initialState,
  reducers:{
    report_detail_list:(state,action)=>{
      state.data = action.payload
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(details_report_list.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(details_report_list.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(details_report_list.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const {report_detail_list } = details_report_list_slice.actions;

export const report_isloading = (state) => state.report_list.isLoading;
export const report_error = (state) => state.report_list.error;
export const report_list = (state) => state.report_list.data;
export default details_report_list_slice.reducer;