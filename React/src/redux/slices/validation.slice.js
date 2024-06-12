import { createAsyncThunk, createSlice ,createAction} from "@reduxjs/toolkit";
// Data
import { apiurls } from "config/apiurls";
const initialState = {
  isLoading: true,
  error: "",
  data: [],
  obj:{}
};

export const url = `${process.env.REACT_APP_API_URL}${apiurls.transaction}?page=1`;
export const transaction_validate_list = createAsyncThunk(
  "transaction_validate_list/list",
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

// export const setCustomData = createAction("transaction_validate_list/setCustomData");

export const transaction_validate_list_slice = createSlice({
  name: "validate_list",
  initialState,
  reducers: {
    // Your user-defined action handler here
    setUserDefinedData: (state, action) => {
      state.data = action.payload;
    },
    setUserDefinefilter:(state,action)=>{
      state.obj = action.payload;
    }
  },
  
  extraReducers: (builder) => {
    builder
      .addCase(transaction_validate_list.pending, (state) => {
        state.isLoading = true;
        state.error = "";
      })
      .addCase(transaction_validate_list.fulfilled, (state, action) => {
        state.isLoading = false;
        state.data = action.payload.data;
      })
      .addCase(transaction_validate_list.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { setUserDefinedData ,setUserDefinefilter} = transaction_validate_list_slice.actions;
export const validate_isloading = (state) => state.validate_list.isLoading;
export const validate_error = (state) => state.validate_list.error;
export const validate_list = (state) => state.validate_list.data;
export default transaction_validate_list_slice.reducer;