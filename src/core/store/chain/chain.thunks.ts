import { IChainType } from "core/interfaces";
import { getAllService, getOneService } from "core/services/global.service";
import { chainsAction } from "./chain.slices";

export const getAll =
  (skip: number = 0, params: any = {}) =>
  (dispatch: any) => {
    return getAllService(skip, params, "chain").then((res) => {
      dispatch(setChains(res.count, res.data));
    });
  };

export const setChains =
  (count: number = 0, chains: IChainType[] = []) =>
  (dispatch: any) => {
    return dispatch(
      chainsAction.setChains({
        chains,
        count,
      })
    );
  };

export const getOne = (id: number) => (dispatch: any) => {
  return getOneService(id, "chain").then((chain) => {
    dispatch(setChain(chain));
  });
};

export const setChain =
  (chain: IChainType | null = null) =>
  (dispatch: any) => {
    return dispatch(
      chainsAction.setChain({
        chain,
      })
    );
  };
