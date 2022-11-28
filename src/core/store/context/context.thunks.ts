import { IContextType } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { contextsAction } from "./context.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "context").then((res) => {
      dispatch(setContexts(res.count, res.data));
    });
  };

export const setContexts =
  (count: number = 0, contexts: IContextType[] = []) =>
  (dispatch: any) => {
    return dispatch(
      contextsAction.setContexts({
        contexts,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "context").then((context) => {
    dispatch(setContext(context));
  });
};

export const setContext =
  (context: IContextType | null = null) =>
  (dispatch: any) => {
    return dispatch(
      contextsAction.setContext({
        context,
      })
    );
  };
