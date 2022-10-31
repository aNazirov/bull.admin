import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBanner } from "core/interfaces";

interface IState {
  banners: IBanner[];
  banner: IBanner | null;
  count: number;
}

const initialState: IState = {
  banners: [],
  banner: null,
  count: 0,
};

export const { actions: bannersAction, reducer: bannersReducer } =
  createSlice({
    name: "banners",
    initialState,
    reducers: {
      setMoreBanners: (
        state,
        action: PayloadAction<{ banners: IBanner[] }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setBanners: (
        state,
        action: PayloadAction<{ banners: IBanner[]; count: number }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setBanner: (
        state,
        action: PayloadAction<{ banner: IBanner | null }>
      ) => ({
        ...state,
        ...action.payload,
      }),
    },
  });
