import axios from "axios";
import { LOGIN } from "Routes/Routes";
import { setItem } from "./commonService";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // put your base url here
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  function (config) {
    config.headers["authorization"] = `Bearer ${
      JSON.parse(localStorage.getItem("Sidebar_Module_Assigned"))?.token
    }`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    setItem("AUTH_ACCESS_TOKEN", response?.data?.token);
    return response;
  },
  function (error) {
    if (error.response.status === 401 && window.location.pathname !== LOGIN) {
      window.localStorage.clear();
      window.location.replace(LOGIN);
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
