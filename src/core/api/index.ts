import axios, { AxiosRequestConfig } from "axios";

const api = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

api.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = window.localStorage.getItem("token");

  if (token) {
    if (config.headers) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
  }

  return config;
});

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async function (error) {
    if (
      error.response?.status === 401 &&
      window.location.pathname !== "/login"
    ) {
      window.location.href = window.location.href.replace(
        window.location.pathname,
        "/login"
      );

      localStorage.removeItem("token");
      return;
    }

    return Promise.reject(error);
  }
);

export default api;
