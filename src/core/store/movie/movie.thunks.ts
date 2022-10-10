import { IMovie } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { moviesAction } from "./movie.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "movie").then((res) => {
      dispatch(setMovies(res.count, res.data));
    });
  };

export const setMovies =
  (count: number = 0, movies: IMovie[] = []) =>
  (dispatch: any) => {
    return dispatch(
      moviesAction.setMovies({
        movies,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "movie").then((movie) => {
    dispatch(setMovie(movie));
  });
};

export const setMovie =
  (movie: IMovie | null = null) =>
  (dispatch: any) => {
    return dispatch(
      moviesAction.setMovie({
        movie,
      })
    );
  };
