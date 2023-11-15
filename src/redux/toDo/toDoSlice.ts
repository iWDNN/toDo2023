import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { testToDos } from "../../testToDos";
import { todoAdapter, unPack } from "../../utils";

export interface ITodoState {
  id: string;
  text: string;
  completed: boolean;
  comment: ITodoState[];
}

export const todoSlice = createSlice({
  name: "todos",
  initialState: [] as ITodoState[],
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      state.push(
        Object.assign(todoAdapter.getInitialState(), { text: action.payload })
      );
    },
    addComment: (state, action) => {
      unPack.add(state, "8d58b071-b5fc-db5f-fe4e-b3cd9d78a6d3", "gg");
    },
    delComment: (state, action) => {
      unPack.delete(state, "8d58b071-b5fc-db5f-fe4e-b3cd9d78a6d3");
    },
  },
});

export const { addTodo, addComment, delComment } = todoSlice.actions;

export default todoSlice.reducer;
