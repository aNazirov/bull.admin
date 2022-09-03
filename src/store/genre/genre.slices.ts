import { IGenre } from "@interfaces/interfaces";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IState {
  genres: IGenre[];
  genre: IGenre | null;
  count: number;
}

const initialState: IState = {
  genres: [],
  genre: null,
  count: 0,
};

export const { actions: genresAction, reducer: genresReducer } = createSlice({
  name: "genres",
  initialState,
  reducers: {
    setMoreGenres: (state, action: PayloadAction<{ genres: IGenre[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setGenres: (
      state,
      action: PayloadAction<{ genres: IGenre[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setGenre: (state, action: PayloadAction<{ genre: IGenre | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
