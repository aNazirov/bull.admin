import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IDirector } from "core/interfaces";

interface IState {
  directors: IDirector[];
  director: IDirector | null;
  count: number;
}

const initialState: IState = {
  directors: [],
  director: null,
  count: 0,
};

export const { actions: directorsAction, reducer: directorsReducer } =
  createSlice({
    name: "directors",
    initialState,
    reducers: {
      setMoreDirectors: (
        state,
        action: PayloadAction<{ directors: IDirector[] }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setDirectors: (
        state,
        action: PayloadAction<{ directors: IDirector[]; count: number }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setDirector: (
        state,
        action: PayloadAction<{ director: IDirector | null }>
      ) => ({
        ...state,
        ...action.payload,
      }),
    },
  });
