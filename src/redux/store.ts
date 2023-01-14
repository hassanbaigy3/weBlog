import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import { currentUserReducer } from "../features/current-user.slice";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { allBlogsReducer } from "../features/all-blogs.slice";
import { myBlogsReducer } from "../features/my-blogs.slice";

const persistUserConfig = {
  key: "currentUser",
  storage,
};

const persistedUserReducer = persistReducer(persistUserConfig, currentUserReducer);

export const store = configureStore({
  reducer: {
    currentUser: persistedUserReducer,
    allBlogs: allBlogsReducer,
    myBlogs: myBlogsReducer,
  },
  middleware: [thunk, logger],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

export const persistor = persistStore(store);
