import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "interfaces/interfaces";

interface IState {
  token: string | null;
  user: IUser | null;
}

const initialState: IState = {
  token: null,
  user: null,
};

export const { actions: globalAction, reducer: globalReducer } = createSlice({
  name: "global",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<{ user: IUser | null }>) => ({
      ...state,
      ...action.payload,
    }),

    logIn: (state, action: PayloadAction<{ token: string | null }>) => ({
      ...state,
      ...action.payload,
    }),

    logOut: (state: IState) => ({
      ...state,
      token: null,
      user: null,
    }),
  },
});
