import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IChainType } from "core/interfaces";

interface IState {
  chains: IChainType[];
  chain: IChainType | null;
  count: number;
}

const initialState: IState = {
  chains: [],
  chain: null,
  count: 0,
};

export const { actions: chainsAction, reducer: chainsReducer } = createSlice({
  name: "chains",
  initialState,
  reducers: {
    setMoreChains: (
      state,
      action: PayloadAction<{ chains: IChainType[] }>
    ) => ({
      ...state,
      ...action.payload,
    }),

    setChains: (
      state,
      action: PayloadAction<{ chains: IChainType[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),

    setChain: (state, action: PayloadAction<{ chain: IChainType | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
