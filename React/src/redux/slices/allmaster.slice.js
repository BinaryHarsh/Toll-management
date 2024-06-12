import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { callapi } from "config/apiUtil";
// Data
import { apiurls } from "config/apiurls";
import { sessionapi } from "config/axiosUtil";
const initialState = {
  isLoading: true,
  error: "",
  data: [],
};

export const url = `${process.env.REACT_APP_API_URL}${apiurls.allmaster}`;
export const allmasterslice = createAsyncThunk(
  "master/allmasterslice",
  async (thunkApi, { rejectWithValue }) => {
    try {
        const response = await callapi(apiurls.allmaster,{},"GET",{})
      // const response = await fetch(url).then(function (res) {
      //   if (!res.ok) {
      //     throw new Error(res.status);
      //   }
      //   return res;
      // });
      // console.log(response);
      // const datas = await response.json();
      return response;
    } catch (err) {
      return rejectWithValue(`Error: ${err.message})`);
    }
  }
);

export const masterslice = createSlice({
  name: "master",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(allmasterslice.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(allmasterslice.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload?.data;
      })
      .addCase(allmasterslice.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const masterIsLoading = (state) => state.master.isLoading;
export const masterError = (state) => state.master.error;
export const masterData = (state) => state.master.data;
export default masterslice.reducer;