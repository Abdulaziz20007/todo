import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { todoApi } from "./services/todoApi";
import todoReducer from "./todoSlice";

export const store = configureStore({
  reducer: {
    [todoApi.reducerPath]: todoApi.reducer,
    todo: todoReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(todoApi.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
