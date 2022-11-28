import { IBannerType } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { bannersAction } from "./banner.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "banner").then((res) => {
      dispatch(setBanners(res.count, res.data));
    });
  };

export const setBanners =
  (count: number = 0, banners: IBannerType[] = []) =>
  (dispatch: any) => {
    return dispatch(
      bannersAction.setBanners({
        banners,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "banner").then((banner) => {
    dispatch(setBanner(banner));
  });
};

export const setBanner =
  (banner: IBannerType | null = null) =>
  (dispatch: any) => {
    return dispatch(
      bannersAction.setBanner({
        banner,
      })
    );
  };
