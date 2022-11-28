import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBannerType } from "core/interfaces";

interface IState {
  banners: IBannerType[];
  banner: IBannerType | null;
  count: number;
}

const initialState: IState = {
  banners: [],
  banner: null,
  count: 0,
};

export const { actions: bannersAction, reducer: bannersReducer } = createSlice({
  name: "banners",
  initialState,
  reducers: {
    setMoreBanners: (
      state,
      action: PayloadAction<{ banners: IBannerType[] }>
    ) => ({
      ...state,
      ...action.payload,
    }),

    setBanners: (
      state,
      action: PayloadAction<{ banners: IBannerType[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),

    setBanner: (
      state,
      action: PayloadAction<{ banner: IBannerType | null }>
    ) => ({
      ...state,
      ...action.payload,
    }),
  },
});
