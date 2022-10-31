import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ILesson } from "core/interfaces";

interface IState {
  lessons: ILesson[];
  lesson: ILesson | null;
  count: number;
}

const initialState: IState = {
  lessons: [],
  lesson: null,
  count: 0,
};

export const { actions: lessonsAction, reducer: lessonsReducer } = createSlice({
  name: "lessons",
  initialState,
  reducers: {
    setMoreLessons: (state, action: PayloadAction<{ lessons: ILesson[] }>) => ({
      ...state,
      ...action.payload,
    }),
    setLessons: (
      state,
      action: PayloadAction<{ lessons: ILesson[]; count: number }>
    ) => ({
      ...state,
      ...action.payload,
    }),
    setLesson: (state, action: PayloadAction<{ lesson: ILesson | null }>) => ({
      ...state,
      ...action.payload,
    }),
  },
});
