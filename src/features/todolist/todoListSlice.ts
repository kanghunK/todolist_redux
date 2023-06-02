import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { addFetcher, deleteFetcher, editFetcher } from "./todoListApI";

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
  generateNumber: number;
  dataList: Content[];
  workType: string;
  workState: string;
  workData: Content | null;
}

const initialState: todoListState = {
  listNumber: 0, // 전체 리스트의 개수
  generateNumber: 0, // 전체 리스트 생성 개수
  dataList: [], // 데이터 리스트 저장
  workType: "", // 작업 종류 add, edit, delete
  workState: "idle", // 작업 상태
  workData: null, // 작업 중인 데이터
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

export const editListAsync = createAsyncThunk<Content, Content>(
  "todoList/editList",
  async (data) => {
    await editFetcher();
    return data;
  }
);

export const todoListSlice = createSlice({
  name: "todoList",
  initialState,
  reducers: {
    addList: (state) => {
      return {
        ...state,
        workType: "add",
      };
    },
    deleteList: (state, actions) => {
      return {
        ...state,
        workType: "delete",
        workData: { ...actions.payload },
      };
    },
    editList: (state, actions) => {
      return {
        ...state,
        workType: "edit",
        workData: { ...actions.payload },
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addListAsync.pending, (state) => {
        return {
          ...state,
          workState: "loading",
        };
      })
      .addCase(addListAsync.fulfilled, (state, actions) => {
        const newContent = { ...actions.payload, order: state.generateNumber };

        return {
          ...state,
          workType: "idle",
          workState: "success",
          generateNumber: state.generateNumber + 1,
          listNumber: state.listNumber + 1,
          dataList: [...state.dataList, newContent],
        };
      })
      .addCase(addListAsync.rejected, (state) => {
        return {
          ...state,
          workType: "idle",
          workState: "failed",
        };
      })
      .addCase(deleteListAsync.pending, (state) => {
        return {
          ...state,
          workState: "loading",
        };
      })
      .addCase(deleteListAsync.fulfilled, (state, actions) => {
        return {
          ...state,
          workType: "idle",
          workState: "success",
          listNumber: state.listNumber - 1,
          dataList: state.dataList.filter(
            (data) => data.order !== actions.payload
          ),
        };
      })
      .addCase(deleteListAsync.rejected, (state) => {
        return {
          ...state,
          workType: "idle",
          workState: "failed",
        };
      })
      .addCase(editListAsync.pending, (state) => {
        return {
          ...state,
          workState: "loading",
        };
      })
      .addCase(editListAsync.fulfilled, (state, actions) => {
        return {
          ...state,
          workType: "idle",
          workState: "success",
          dataList: state.dataList.map((data) => {
            if (data.order === actions.payload.order) {
              return { ...data, content: actions.payload.content };
            } else {
              return data;
            }
          }),
        };
      })
      .addCase(editListAsync.rejected, (state) => {
        return {
          ...state,
          workType: "idle",
          workState: "failed",
        };
      });
  },
});

export const { addList, deleteList, editList } = todoListSlice.actions;

export default todoListSlice.reducer;
