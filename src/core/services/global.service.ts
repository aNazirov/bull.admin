import api from "core/api/index";
import { AxiosError } from "axios";
import { IAutoComplete, ILogin } from "core/interfaces";
import { toast } from "react-toastify";

class ToastClass {
  options = undefined;

  info(info: string) {
    toast.info(info, this.options);
  }
  success(message: string) {
    toast.success(message, this.options);
  }
  error(error: AxiosError<{ message?: string } | undefined>) {
    let message =
      error.response?.data?.message || error.message || "Server Side Error";
    if (Array.isArray(message)) {
      message = message.join(", ");
    }

    toast.error(message, this.options);
  }
  warning(warning: string) {
    toast.warn(warning, this.options);
  }
}

export const Toast = new ToastClass();

export const loginService = (params: ILogin) => {
  return api.post("/auth/login", params).then((res) => res.data);
};

export const getUserByToken = () => {
  return api.get("/user/token").then((res) => res.data);
};

export const autoComplite = (params: IAutoComplete) => {
  return api
    .get("/global/autoComplete", {
      params,
    })
    .then((res) => res.data);
};

export const createService = (params: any, name: string) => {
  return api.post(`/${name}`, params).then((res) => res.data);
};

export const updateService = (id: number, params: any, name: string) => {
  return api.patch(`/${name}/${id}`, params).then((res) => res.data);
};

export const removeService = (id: number, name: string) => {
  return api.delete(`/${name}/${id}`).then((res) => res.data);
};

export const getOneService = (id: number, name: string) => {
  return api.get(`/${name}/${id}`).then((res) => res.data);
};

export const getAllService = (skip: number, params: any, name: string) => {
  return api
    .get(`/${name}`, {
      params: {
        skip,
        params,
      },
    })
    .then((res) => res.data);
};

export const filesUpload = (formData: any) => {
  return api
    .post("/file/upload-many", formData, {
      headers: {
        "Content-Type": "multipart/form-data; boundary=something",
      },
    })
    .then((res) => res.data);
};

export const fileDelete = (id: number) => {
  return api.delete(`/file/${id}`).then((res) => res.data);
};
