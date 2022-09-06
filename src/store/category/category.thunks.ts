import { ICategory } from "interfaces/interfaces";
import { getAllService, getOneService } from "services/global";
import { Toast } from "utils/index";
import { categoriesAction } from "./category.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "category")
      .then((res) => {
        dispatch(setCategories(res.count, res.data));
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

export const setCategories =
  (count: number = 0, categories: ICategory[] = []) =>
  (dispatch: any) => {
    return dispatch(
      categoriesAction.setCategories({
        categories,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "category")
    .then((category) => {
      dispatch(setCategory(category));
    })
    .catch((e) => {
      Toast.error(e);
    });
};

export const setCategory =
  (category: ICategory | null = null) =>
  (dispatch: any) => {
    return dispatch(
      categoriesAction.setCategory({
        category,
      })
    );
  };
