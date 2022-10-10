import { IActer } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { actersAction } from "./acter.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "acter").then((res) => {
      dispatch(setActers(res.count, res.data));
    });
  };

export const setActers =
  (count: number = 0, acters: IActer[] = []) =>
  (dispatch: any) => {
    return dispatch(
      actersAction.setActers({
        acters,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "acter").then((acter) => {
    dispatch(setActer(acter));
  });
};

export const setActer =
  (acter: IActer | null = null) =>
  (dispatch: any) => {
    return dispatch(
      actersAction.setActer({
        acter,
      })
    );
  };
