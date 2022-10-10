import api from "core/api/index";

export const updateMovieFile = (id: number, params: any) => {
  return api
    .patch(`/movie/file/${id}`, params, undefined, {
      pending: "Обновление файлов фильма ...",
      success: "Обновление завершено",
    })
    .then((res) => res.data);
};
