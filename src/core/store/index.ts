import { configureStore } from "@reduxjs/toolkit";
import { rootReducer } from "./rootReducer";

export const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.REACT_APP_MODE === "DEV",
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export type State = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
