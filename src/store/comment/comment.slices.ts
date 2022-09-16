import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IComment } from "interfaces/interfaces";

interface IState {
  comments: IComment[];
  comment: IComment | null;
  count: number;
}

const initialState: IState = {
  comments: [],
  comment: null,
  count: 0,
};

export const { actions: commentsAction, reducer: commentsReducer } =
  createSlice({
    name: "comments",
    initialState,
    reducers: {
      setMoreComments: (
        state,
        action: PayloadAction<{ comments: IComment[] }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setComments: (
        state,
        action: PayloadAction<{ comments: IComment[]; count: number }>
      ) => ({
        ...state,
        ...action.payload,
      }),
      setComment: (
        state,
        action: PayloadAction<{ comment: IComment | null }>
      ) => ({
        ...state,
        ...action.payload,
      }),
    },
  });
