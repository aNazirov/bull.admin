import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ICategory } from "core/interfaces";

interface IState {
  categories: ICategory[];
  category: ICategory | null;
  count: number;
}

const initialState: IState = {
  categories: [],
  category: null,
  count: 0,
};

export const { actions: categoriesAction, reducer: categoriesReducer } =
  createSlice({
    name: "categories",
    initialState,
    reducers: {
      setMoreCategories: (
        state,
        action: PayloadAction<{ categories: ICategory[] }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setCategories: (
        state,
        action: PayloadAction<{ categories: ICategory[]; count: number }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setCategory: (
        state,
        action: PayloadAction<{ category: ICategory | null }>
      ) => ({
        ...state,
        ...action.payload,
      }),
    },
  });
