import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFetcher, deleteFetcher } from "./todoListApI";

export interface addListAsyncParam {
  date: string;
  content: string;
}

export interface Content {
  order: number;
  date: string;
  content: string;
}

export interface todoListState {
  listNumber: number;
  dataList: Content[];
  workType: string;
  workState: string;
}

const initialState: todoListState = {
  listNumber: 0,
  dataList: [],
  workType: "", // add, edit, delete
  workState: "idle",
};

export const addListAsync = createAsyncThunk<
  addListAsyncParam,
  addListAsyncParam
>("todoList/addList", async (dataObj) => {
  await addFetcher();
  return dataObj;
});

export const deleteListAsync = createAsyncThunk<number, number>(
  "todoList/deleteList",
  async (order) => {
    await deleteFetcher();
    return order;
  }
);

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addList: (state) => {
      state.listNumber += 1;
      state.workState = "idle";
    },
    deleteList: (state) => {
      state.listNumber -= 1;
      state.workState = "idle";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addListAsync.pending, (state) => {
        state.workType = "add";
        state.workState = "loading";
      })
      .addCase(addListAsync.fulfilled, (state, actions) => {
        state.workType = "idle";
        state.workState = "success";

        state.listNumber += 1;

        const newContent = { ...actions.payload, order: state.listNumber };
        state.dataList = [...state.dataList, newContent];
      })
      .addCase(addListAsync.rejected, (state) => {
        state.workType = "idle";
        state.workState = "faild";
      })
      .addCase(deleteListAsync.pending, (state) => {
        state.workType = "delete";
        state.workState = "loading";
      })
      .addCase(deleteListAsync.fulfilled, (state, actions) => {
        state.workType = "idle";
        state.workState = "success";
        state.listNumber -= 1;

        const filterList = state.dataList.filter(
          (data) => data.order !== actions.payload
        );
        state.dataList = filterList.map((data, i) => {
          return {
            ...data,
            order: i,
          };
        });
      })
      .addCase(deleteListAsync.rejected, (state) => {
        state.workType = "idle";
        state.workState = "faild";
      });
  },
});

export const { addList, deleteList } = todoListSlice.actions;

export default todoListSlice.reducer;
