import { IProducer } from "interfaces/interfaces";
import { getAllService, getOneService } from "services/global.service";
import { Toast } from "utils/index";
import { producersAction } from "./producer.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "producer")
      .then((res) => {
        dispatch(setProducers(res.count, res.data));
      })
      .catch((e) => {
        Toast.error(e);
      });
  };

export const setProducers =
  (count: number = 0, producers: IProducer[] = []) =>
  (dispatch: any) => {
    return dispatch(
      producersAction.setProducers({
        producers,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "producer")
    .then((producer) => {
      dispatch(setProducer(producer));
    })
    .catch((e) => {
      Toast.error(e);
    });
};

export const setProducer =
  (producer: IProducer | null = null) =>
  (dispatch: any) => {
    return dispatch(
      producersAction.setProducer({
        producer,
      })
    );
  };
