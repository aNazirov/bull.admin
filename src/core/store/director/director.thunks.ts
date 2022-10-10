import { IDirector } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { directorsAction } from "./director.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "director").then((res) => {
      dispatch(setDirectors(res.count, res.data));
    });
  };

export const setDirectors =
  (count: number = 0, directors: IDirector[] = []) =>
  (dispatch: any) => {
    return dispatch(
      directorsAction.setDirectors({
        directors,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "director").then((director) => {
    dispatch(setDirector(director));
  });
};

export const setDirector =
  (director: IDirector | null = null) =>
  (dispatch: any) => {
    return dispatch(
      directorsAction.setDirector({
        director,
      })
    );
  };
