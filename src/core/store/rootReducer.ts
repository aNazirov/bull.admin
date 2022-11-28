import {
  ActionFromReducersMapObject,
  CombinedState,
  combineReducers,
  Reducer,
  StateFromReducersMapObject,
} from "@reduxjs/toolkit";
import { bannersReducer } from "./banner/banner.slices";
import { chainsReducer } from "./chain/chain.slices";
import { contextsReducer } from "./context/context.slices";
import { globalReducer } from "./global/global.slices";
import { usersReducer } from "./user/user.slices";

// export type RootState = ReturnType<typeof combinedReducer>;

const State = {
  global: globalReducer,
  banners: bannersReducer,
  users: usersReducer,
  chains: chainsReducer,
  contexts: contextsReducer,
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
