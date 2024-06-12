import React, { useEffect } from "react";
import { transaction_vehicle_slice } from "../../redux/slices/vehicle.slice";
import { statisticslice } from "../../redux/slices/statistic.slice";
import { allmasterslice } from "../../redux/slices/allmaster.slice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
function Redux({ children }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // if (JSON.parse(localStorage.getItem("user")) === null) {
    //   navigate('/sign-in');
    // }
    dispatch(transaction_vehicle_slice("DAY"));
    dispatch(statisticslice());
    dispatch(allmasterslice());
  }, [dispatch]);
  return <>{children}</>;
}
export default Redux;
