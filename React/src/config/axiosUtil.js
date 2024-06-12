import axios from "axios";
import { callapi } from "./apiUtil";
import { apiurls } from "./apiurls";
import { error } from "components/Loader/alertmessage";
import { Construction } from "@mui/icons-material";
// import Cookies from "js-cookie";
const axiosInt = axios.create({
  baseURL: process.env.REACT_APP_API,
});



export const sessionapi = async () => {
  try {
    const options = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `bearer ${JSON.parse(localStorage.getItem("id_token"))}`,
      },
      method: "POST",
    };
    const api = await fetch(`${process.env.REACT_APP_API_URL}${apiurls.session}`, options).then(
      (res) => {
        return res.json();
      }
    );
    return api;
  } catch (error) {
    console.log(error);
  }
};

axiosInt.interceptors.request.use(async(config) => {
  await sessionapi();
  return config;
},
(apierror) => {
  if (apierror?.response?.status === 417) {
    error("Session Expired");
    setTimeout(() => {
      // window.location.href = "/";
    }, 2000);
  }
  Promise.reject((apierror.response && apierror.response.data) || "There is an error!");
},

);
axiosInt.interceptors.response.use(
  (response) => {
    // const resp = await sessionapi();
    return response;
  },
  (apierror) => {
    if (apierror?.response?.status === 417) {
      error("Session Expired");
      setTimeout(() => {
        // window.location.href = "/";
      }, 2000);
    }
    Promise.reject((apierror.response && apierror.response.data) || "There is an error!");
  }
);

export default axiosInt;
