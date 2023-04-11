import axios from "axios";
import { clearAll } from "../utils/storage";

const axiosPrivate = axios.create({
  baseURL: "https://dev.codeleap.co.uk/",
  timeout: 10000,
  headers: { "Content-Type": "application/json" },
});

axiosPrivate.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      setTimeout(() => {
        window.location.replace("https://dev.codeleap.co.uk/");
        clearAll();
      }, 1000);
    }
    return Promise.reject(error);
  }
);

export default axiosPrivate;
