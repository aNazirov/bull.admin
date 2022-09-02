import { createSlice } from "@reduxjs/toolkit";

interface IState {
  // projects: IProject[];
  // project: IProject | null;
  // count: number;
}

const initialState: IState = {
  // projects: [],
  // project: null,
  // count: 0,
};

export const { actions: projectsAction, reducer: projectsReducer } =
  createSlice({
    name: 'genres',
    initialState,
    reducers: {
      // setMoreProjects: (
      //   state,
      //   action: PayloadAction<{ projects: IProject[] }>,
      // ) => ({
      //   ...state,
      //   ...action.payload,
      // }),
      // setProjects: (
      //   state,
      //   action: PayloadAction<{ projects: IProject[]; count: number }>,
      // ) => ({
      //   ...state,
      //   ...action.payload,
      // }),
      // setProject: (state, action: PayloadAction<{ project: IProject | null }>) => ({
      //   ...state,
      //   ...action.payload,
      // }),
    },
  });
