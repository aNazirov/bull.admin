import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IProducer } from "core/interfaces";

interface IState {
  producers: IProducer[];
  producer: IProducer | null;
  count: number;
}

const initialState: IState = {
  producers: [],
  producer: null,
  count: 0,
};

export const { actions: producersAction, reducer: producersReducer } =
  createSlice({
    name: "producers",
    initialState,
    reducers: {
      setMoreProducers: (
        state,
        action: PayloadAction<{ producers: IProducer[] }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setProducers: (
        state,
        action: PayloadAction<{ producers: IProducer[]; count: number }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setProducer: (
        state,
        action: PayloadAction<{ producer: IProducer | null }>
      ) => ({
        ...state,
        ...action.payload,
      }),
    },
  });
