import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { unpack } from "../../utils";
import { RootState } from "../store";

export interface ITodoState {
  id: string;
  type?: "DAILY" | "WEEKEND" | "MONTHLY" | "YEARLY";
  text: string;
  completed: boolean;
  comment: ITodoState[];
}

export const todoSlice = createSlice({
  name: "todos",
  initialState: [] as ITodoState[],
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{
        parentId: string;
        text: string;
        type?: "DAILY" | "WEEKEND" | "MONTHLY" | "YEARLY";
      }>
    ) => {
      unpack.add(state, action.payload);
    },
    delTodo: (state, action: PayloadAction<string>) => {
      unpack.delete(state, action.payload);
    },
    fixTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      unpack.fix(state, action.payload);
    },
    cmpTodo: (state, action: PayloadAction<string>) => {
      unpack.toggled(state, action.payload);
    },

    resetToDos: () => [],
  },
});
const todos = (state: RootState) => state.todos;
export const selTodoPercent = createSelector(todos, (todos) => {
  unpack.reset();
  unpack.record(todos);
  return Math.floor((unpack.cmpArr.length / unpack.allArr.length) * 100);
});
export const selTodoUnpackList = createSelector(todos, (todos) => {
  unpack.reset();
  unpack.record(todos);
  return unpack.allArr;
});

export const { addTodo, delTodo, fixTodo, cmpTodo, resetToDos } =
  todoSlice.actions;

export default todoSlice.reducer;
