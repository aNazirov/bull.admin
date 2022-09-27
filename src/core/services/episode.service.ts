import api from "core/api/index";

export const createEpisodes = (params: any) => {
  return api.post(`/season/addEpisodes`, params).then((res) => res.data);
};

export const updateEpisode = (id: number, params: any) => {
  return api.patch(`/season/episode/${id}`, params).then((res) => res.data);
};

export const removeEpisode = (id: number) => {
  return api.delete(`/season/episode/${id}`).then((res) => res.data);
};
