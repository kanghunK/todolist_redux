import { ThunkAction, configureStore } from "@reduxjs/toolkit";
import todoListReducer from "../features/todolist/todoListSlice";

export const store = configureStore({
  reducer: todoListReducer,
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  any
>;
