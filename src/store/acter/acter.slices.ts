import { IActer } from "@interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  acters: IActer[];
  acter: IActer | null;
  count: number;
}

const initialState: IState = {
  acters: [],
  acter: null,
  count: 0,
};

export const { actions: actersAction, reducer: actersReducer } = createSlice({
  name: "acters",
  initialState,
  reducers: {
    setMoreActers: (state, action: PayloadAction<{ acters: IActer[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setActers: (
      state,
      action: PayloadAction<{ acters: IActer[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setActer: (state, action: PayloadAction<{ acter: IActer | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
