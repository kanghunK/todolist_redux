import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFetcher, deleteFetcher } from "./todoListApI";

export interface todoListState {
  listNumber: number;
  addState: string;
  editState: string;
  deleteState: string;
}

const initialState: todoListState = {
  listNumber: 0,
  addState: "idle",
  editState: "idle",
  deleteState: "idle",
};

export const addListAsync = createAsyncThunk(
  "todoList/addList",
  async () => await addFetcher()
);

export const deleteListAsync = createAsyncThunk(
  "todoList/deleteList",
  async () => await deleteFetcher()
);

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addList: (state) => {
      state.listNumber += 1;
    },
    deleteList: (state) => {
      state.listNumber -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addListAsync.pending, (state) => {
        state.addState = "loading";
      })
      .addCase(addListAsync.fulfilled, (state) => {
        state.addState = "idle";
        state.listNumber += 1;
      })
      .addCase(addListAsync.rejected, (state) => {
        state.addState = "faild";
      })
      .addCase(deleteListAsync.pending, (state) => {
        state.addState = "loading";
      })
      .addCase(deleteListAsync.fulfilled, (state) => {
        state.addState = "idle";
        state.listNumber -= 1;
      })
      .addCase(deleteListAsync.rejected, (state) => {
        state.addState = "faild";
      });
  },
});

export default todoListSlice.reducer;
