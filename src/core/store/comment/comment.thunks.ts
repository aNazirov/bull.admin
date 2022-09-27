import { IComment } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { Toast } from "core/utils/index";
import { commentsAction } from "./comment.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "comment")
      .then((res) => {
        dispatch(setComments(res.count, res.data));
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

export const setComments =
  (count: number = 0, comments: IComment[] = []) =>
  (dispatch: any) => {
    return dispatch(
      commentsAction.setComments({
        comments,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "comment")
    .then((comment) => {
      dispatch(setComment(comment));
    })
    .catch((e) => {
      Toast.error(e);
    });
};

export const setComment =
  (comment: IComment | null = null) =>
  (dispatch: any) => {
    return dispatch(
      commentsAction.setComment({
        comment,
      })
    );
  };
