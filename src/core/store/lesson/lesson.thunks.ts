import { ILesson } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { lessonsAction } from "./lesson.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "lesson").then((res) => {
      dispatch(setLessons(res.count, res.data));
    });
  };

export const setLessons =
  (count: number = 0, lessons: ILesson[] = []) =>
  (dispatch: any) => {
    return dispatch(
      lessonsAction.setLessons({
        lessons,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "lesson").then((lesson) => {
    dispatch(setLesson(lesson));
  });
};

export const setLesson =
  (lesson: ILesson | null = null) =>
  (dispatch: any) => {
    return dispatch(
      lessonsAction.setLesson({
        lesson,
      })
    );
  };
