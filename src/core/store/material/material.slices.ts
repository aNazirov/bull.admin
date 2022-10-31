import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMaterial } from "core/interfaces";

interface IState {
  materials: IMaterial[];
  material: IMaterial | null;
  count: number;
}

const initialState: IState = {
  materials: [],
  material: null,
  count: 0,
};

export const { actions: materialsAction, reducer: materialsReducer } =
  createSlice({
    name: "materials",
    initialState,
    reducers: {
      setMoreMaterials: (
        state,
        action: PayloadAction<{ materials: IMaterial[] }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setMaterials: (
        state,
        action: PayloadAction<{ materials: IMaterial[]; count: number }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setMaterial: (
        state,
        action: PayloadAction<{ material: IMaterial | null }>
      ) => ({
        ...state,
        ...action.payload,
      }),
    },
  });
