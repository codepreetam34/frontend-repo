import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:5000/", // put your base url here
  headers: {
    "Content-Type": "application/json",
  },
});

// axiosInstance.interceptors.request.use((config) =>
// // const token = "";   // replace it with token from local Storage
// // config.params = config.params || {};
// // config.params['auth'] = token;
// config);

export default axiosInstance;
