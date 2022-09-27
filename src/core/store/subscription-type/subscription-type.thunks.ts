import { ISubscriptionType } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { Toast } from "core/utils/index";
import { subscriptionTypesAction } from "./subscription-type.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "subscription-type")
      .then((res) => {
        dispatch(setSubscriptionTypes(res.count, res.data));
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

export const setSubscriptionTypes =
  (count: number = 0, subscriptionTypes: ISubscriptionType[] = []) =>
  (dispatch: any) => {
    return dispatch(
      subscriptionTypesAction.setSubscriptionTypes({
        subscriptionTypes,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "subscription-type")
    .then((subscriptionType) => {
      dispatch(setSubscriptionType(subscriptionType));
    })
    .catch((e) => {
      Toast.error(e);
    });
};

export const setSubscriptionType =
  (subscriptionType: ISubscriptionType | null = null) =>
  (dispatch: any) => {
    return dispatch(
      subscriptionTypesAction.setSubscriptionType({
        subscriptionType,
      })
    );
  };
