import axios from "axios";
import queryString from "query-string";

const axiosClient = axios.create({
  baseURL: location.protocol + "//" + location.host || "http://localhost:5009/",
  // "http://10.65.2.100:5001/api/v1/request",
  headers: {
    "content-type": "application/json",
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  // const token = await getFirebasetoken();
  const token = localStorage.getItem("access_token");
  // console.log(token, "token");

  if (token) {
    config.headers.authorization = `Bearer ${token}`;
  }
  return config;
});
axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    // Handle errors
    throw error;
  }
);
export default axiosClient;
