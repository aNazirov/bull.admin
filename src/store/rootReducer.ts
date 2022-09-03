import {
  ActionFromReducersMapObject,
  CombinedState,
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { actersReducer } from "./acter/acter.slices";
import { genresReducer } from "./genre/genre.slices";
import { globalReducer } from "./global/global.slices";
import { producersReducer } from "./producer/producer.slices";

// export type RootState = ReturnType<typeof combinedReducer>;

const State = {
  global: globalReducer,
  genres: genresReducer,
  acters: actersReducer,
  producers: producersReducer,
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
