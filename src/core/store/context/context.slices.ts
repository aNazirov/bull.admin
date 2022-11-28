import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IContextType } from "core/interfaces";

interface IState {
  contexts: IContextType[];
  context: IContextType | null;
  count: number;
}

const initialState: IState = {
  contexts: [],
  context: null,
  count: 0,
};

export const { actions: contextsAction, reducer: contextsReducer } = createSlice({
  name: "contexts",
  initialState,
  reducers: {
    setMoreContexts: (
      state,
      action: PayloadAction<{ contexts: IContextType[] }>
    ) => ({
      ...state,
      ...action.payload,
    }),

    setContexts: (
      state,
      action: PayloadAction<{ contexts: IContextType[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),

    setContext: (state, action: PayloadAction<{ context: IContextType | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
