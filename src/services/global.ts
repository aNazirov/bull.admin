import api from "@api/index";
import { IAutoComplete, ILogin } from "@interfaces/interfaces";
import { AxiosError } from "axios";
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

export const getOneService = (id: number, name: string) => {
  return api.get(`/${name}/${id}`).then((res) => res.data);
};