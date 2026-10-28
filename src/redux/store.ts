import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
} from "redux-persist";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import bookReducer from "./features/bookSlice";

const rootReducer = combineReducers({ bookSlice: bookReducer });

// localStorage is unavailable while Next.js renders on the server.
const noopStorage = {
  getItem: async () => null,
  setItem: async () => undefined,
  removeItem: async () => undefined,
};

export const makeStore = () => {
  const persistConfig = {
    key: "root",
    storage: typeof window !== "undefined" ? createWebStorage("local") : noopStorage,
    whitelist: ["bookSlice"],
  };

  return configureStore({
    reducer: persistReducer<ReturnType<typeof rootReducer>>(persistConfig, rootReducer),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
      }),
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
