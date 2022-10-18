import { api, fileApi } from "core/api";
import { IAutoComplete, ILogin } from "core/interfaces";

export const loginService = (params: ILogin) => {
  return api
    .post("/auth/login", params, undefined, {
      pending: "Авторизация",
      success: "Вы успешно авторизованы",
    })
    .then((res) => res.data);
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
  return api
    .post(`/${name}`, params, undefined, {
      pending: "Создание ...",
      success: "Cоздано",
    })
    .then((res) => res.data);
};

export const updateService = (id: number, params: any, name: string) => {
  return api
    .patch(`/${name}/${id}`, params, undefined, {
      pending: "Обновление ...",
      success: "Обновлено",
    })
    .then((res) => res.data);
};

export const removeService = (id: number, name: string) => {
  return api
    .delete(`/${name}/${id}`, undefined, {
      pending: "Удаление ...",
      success: "Удалено",
    })
    .then((res) => res.data);
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
  return fileApi
    .post(
      "/file/upload-many",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data; boundary=something",
        },
      },
      {
        pending: "Загрузка файлов ...",
        success: "Файлы загружены",
      }
    )
    .then((res) => res.data);
};

export const fileDelete = (id: number) => {
  return fileApi
    .delete(`/file/${id}`, undefined, {
      pending: "Удаление файла ...",
      success: "Файл удален",
    })
    .then((res) => res.data);
};
