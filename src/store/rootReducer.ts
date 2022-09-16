import {
  ActionFromReducersMapObject,
  CombinedState,
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { actersReducer } from "./acter/acter.slices";
import { categoriesReducer } from "./category/category.slices";
import { commentsReducer } from "./comment/comment.slices";
import { directorsReducer } from "./director/director.slices";
import { genresReducer } from "./genre/genre.slices";
import { globalReducer } from "./global/global.slices";
import { moviesReducer } from "./movie/movie.slices";
import { producersReducer } from "./producer/producer.slices";
import { usersReducer } from "./user/user.slices";

// export type RootState = ReturnType<typeof combinedReducer>;

const State = {
  global: globalReducer,
  genres: genresReducer,
  acters: actersReducer,
  producers: producersReducer,
  directors: directorsReducer,
  categories: categoriesReducer,
  users: usersReducer,
  movies: moviesReducer,
  comments: commentsReducer,
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
