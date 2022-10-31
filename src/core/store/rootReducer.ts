import {
  ActionFromReducersMapObject,
  CombinedState,
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { categoriesReducer } from "./category/category.slices";
import { globalReducer } from "./global/global.slices";
import { lessonsReducer } from "./lesson/lesson.slices";
import { materialsReducer } from "./material/material.slices";
import { subscriptionTypesReducer } from "./subscription-type/subscription-type.slices";
import { usersReducer } from "./user/user.slices";

// export type RootState = ReturnType<typeof combinedReducer>;

const State = {
  global: globalReducer,
  categories: categoriesReducer,
  materials: materialsReducer,
  users: usersReducer,
  lessons: lessonsReducer,
  subscriptionTypes: subscriptionTypesReducer,
};

export const appReducer = combineReducers(State);

export const rootReducer: Reducer<
  CombinedState<StateFromReducersMapObject<typeof State>>,
  ActionFromReducersMapObject<typeof State>
> = (state, action) => {
  if (action.type === "global/logOut") {
    state = undefined;
  }

  return appReducer(state, action);
};
