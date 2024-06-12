import { configureStore } from "@reduxjs/toolkit";
import statistics from "./slices/statistic.slice";
import masterslice from "./slices/allmaster.slice";
import transaction_validate_list_slice from "./slices/validation.slice";
import detail_report_list_slice from "./slices/report.slice"
import transaction_vehicle from "./slices/vehicle.slice";
import download_report_list from "./slices/downloadreport.slice";
const store = configureStore({
  reducer: {
    statistics: statistics,
    master: masterslice,
    transaction_and_vehicle:transaction_vehicle,
    validate_list: transaction_validate_list_slice,
    report_list:detail_report_list_slice,
    download_report:download_report_list
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    immutableCheck: false,
    serializableCheck: false,
  })
});
export default store;
