import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMovie } from "core/interfaces";

interface IState {
  movies: IMovie[];
  movie: IMovie | null;
  count: number;
}

const initialState: IState = {
  movies: [],
  movie: null,
  count: 0,
};

export const { actions: moviesAction, reducer: moviesReducer } = createSlice({
  name: "movies",
  initialState,
  reducers: {
    setMoreMovies: (state, action: PayloadAction<{ movies: IMovie[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setMovies: (
      state,
      action: PayloadAction<{ movies: IMovie[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setMovie: (state, action: PayloadAction<{ movie: IMovie | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
