import api from "core/api/index";

export const createEpisodes = (params: any) => {
  return api
    .post(`/season/addEpisodes`, params, undefined, {
      pending: "Создание серии ...",
      success: "Серия создана",
    })
    .then((res) => res.data);
};

export const updateEpisode = (id: number, params: any) => {
  return api
    .patch(`/season/episode/${id}`, params, undefined, {
      pending: "Обновление серии ...",
      success: "Серия обновлена",
    })
    .then((res) => res.data);
};

export const removeEpisode = (id: number) => {
  return api
    .delete(`/season/episode/${id}`, undefined, {
      pending: "Удаление серии ...",
      success: "Серия удалена",
    })
    .then((res) => res.data);
};
