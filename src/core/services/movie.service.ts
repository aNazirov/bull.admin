import api from "core/api/index";

export const updateMovieFile = (id: number, params: any) => {
  return api.patch(`/movie/file/${id}`, params).then((res) => res.data);
};
