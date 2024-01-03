import axios from "axios";

const baseAxios = axios.create({
  timeout: 20000, // request timeout
});

// request interceptor

baseAxios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    config.headers["Authorization"] = "Bearer " + token;
    //config.withCredentials = true;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default baseAxios;
