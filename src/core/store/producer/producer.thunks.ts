import { IProducer } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { producersAction } from "./producer.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "producer").then((res) => {
      dispatch(setProducers(res.count, res.data));
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
  return getOneService(id, "producer").then((producer) => {
    dispatch(setProducer(producer));
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
