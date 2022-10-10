import { IUser } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { usersAction } from "./user.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "user").then((res) => {
      dispatch(setUsers(res.count, res.data));
    });
  };

export const setUsers =
  (count: number = 0, users: IUser[] = []) =>
  (dispatch: any) => {
    return dispatch(
      usersAction.setUsers({
        users,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "user").then((user) => {
    dispatch(setUser(user));
  });
};

export const setUser =
  (user: IUser | null = null) =>
  (dispatch: any) => {
    return dispatch(
      usersAction.setUser({
        user,
      })
    );
  };
