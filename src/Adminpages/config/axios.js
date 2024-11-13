import axios from "axios";
import { toast } from "react-hot-toast";
import { baseUrl } from "../../URls";

const axiosInstance = axios.create({
  baseURL: baseUrl,
});

axiosInstance.interceptors.request.use(
  (config) => {
    config.headers = {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      token: `Bearer ${localStorage.getItem("token")}`,
      ...config.headers,
    };
    return config;
  },
  (err) => Promise.reject(err)
);

const errorHandler = (error) => {
  if (error?.response?.data?.message) {
    toast.error(error?.response?.data?.message);
  }
  // return Promise.reject(error);
};

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    return errorHandler(error);
  }
);

export default axiosInstance;
