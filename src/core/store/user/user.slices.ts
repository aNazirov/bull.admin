import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "core/interfaces";

interface IState {
  users: IUser[];
  user: IUser | null;
  count: number;
}

const initialState: IState = {
  users: [],
  user: null,
  count: 0,
};

export const { actions: usersAction, reducer: usersReducer } = createSlice({
  name: "users",
  initialState,
  reducers: {
    setMoreUsers: (state, action: PayloadAction<{ users: IUser[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setUsers: (
      state,
      action: PayloadAction<{ users: IUser[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setUser: (state, action: PayloadAction<{ user: IUser | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
