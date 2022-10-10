import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { Toast } from "core/utils";

const instance = axios.create({
  baseURL: process.env.REACT_APP_API_HOST,
});

instance.interceptors.request.use(function (config: AxiosRequestConfig) {
  const token = window.localStorage.getItem("token");

  if (token) {
    if (config.headers) {
      config.headers.Authorization = token ? `Bearer ${token}` : "";
    }
  }

  return config;
});

instance.interceptors.response.use(
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

class Api {
  get<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>
  ): Promise<R> {
    return instance.get(url, config);
  }

  post<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
    message?: { pending: string; success: string }
  ): Promise<R> {
    return Toast.promise(instance.post(url, data, config), {
      pending: message?.pending || "Start posting ...",
      success: message?.success || "Posted",
    });
  }

  patch<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    data?: D,
    config?: AxiosRequestConfig<D>,
    message?: { pending: string; success: string }
  ): Promise<R> {
    return Toast.promise(instance.patch(url, data, config), {
      pending: message?.pending || "Start updating ...",
      success: message?.success || "Updated",
    });
  }

  delete<T = any, R = AxiosResponse<T>, D = any>(
    url: string,
    config?: AxiosRequestConfig<D>,
    message?: { pending: string; success: string }
  ): Promise<R> {
    return Toast.promise(instance.delete(url, config), {
      pending: message?.pending || "Start deleting ...",
      success: message?.success || "Deleted",
    });
  }
}

const api = Object.freeze(new Api());

export default api;
