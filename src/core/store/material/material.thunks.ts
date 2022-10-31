import { IMaterial } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { materialsAction } from "./material.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "material").then((res) => {
      dispatch(setMaterials(res.count, res.data));
    });
  };

export const setMaterials =
  (count: number = 0, materials: IMaterial[] = []) =>
  (dispatch: any) => {
    return dispatch(
      materialsAction.setMaterials({
        materials,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "material").then((material) => {
    dispatch(setMaterial(material));
  });
};

export const setMaterial =
  (material: IMaterial | null = null) =>
  (dispatch: any) => {
    return dispatch(
      materialsAction.setMaterial({
        material,
      })
    );
  };
