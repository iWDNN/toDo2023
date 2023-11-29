import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { TodoOptionType } from "../../type";
import { unpack } from "../../utils";
import { RootState } from "../store";

export interface ITodoState {
  id: string;
  option: TodoOptionType;
  text: string;
  completed: boolean;
  comment: ITodoState[];
  isFold: boolean;
}

const todoSlice = createSlice({
  name: "todos",
  initialState: [] as ITodoState[],
  reducers: {
    addTodo: (
      state,
      action: PayloadAction<{
        parentId: string;
        text: string;
        option: TodoOptionType;
      }>
    ) => {
      unpack.add(state, action.payload);
    },
    delTodo: (state, action: PayloadAction<string>) => {
      unpack.delete(state, action.payload);
    },
    fixTodo: (
      state,
      action: PayloadAction<{
        id: string;
        text: string;
        option: TodoOptionType;
      }>
    ) => {
      unpack.fix(state, action.payload);
    },
    cmpTodo: (state, action: PayloadAction<string>) => {
      unpack.toggled(state, action.payload);
    },
    foldTodo: (state, action: PayloadAction<string>) => {
      unpack.fold(state, action.payload);
    },
    resetTodo: (
      state,
      action: PayloadAction<{
        type?: "completed";
        option?: TodoOptionType | "ALL";
      }>
    ) => {
      unpack.reset(state, action.payload);
    },
    resetToDos: () => [],
  },
});

const selTodos = (state: RootState) => state.todos;

export const selTodoPercent = createSelector(selTodos, (todos) => {
  unpack.unpackReset();
  unpack.record(todos);
  return Math.floor((unpack.cmpArr.length / unpack.allArr.length) * 100);
});
export const selTodoUnpackList = createSelector(selTodos, (todos) => {
  unpack.unpackReset();
  unpack.record(todos);
  return unpack.allArr;
});
export const selFilteredTodos = createSelector(
  [selTodoUnpackList, (_state, filterId) => filterId],
  (unpackListTodos, filterId) => [
    unpackListTodos.filter((todo) => todo.option === filterId),
    Math.floor(
      (unpackListTodos
        .filter((todo) => todo.option === filterId)
        .filter((todo) => todo.completed).length /
        unpackListTodos.filter((todo) => todo.option === filterId).length) *
        100
    ),
  ]
);

export const {
  addTodo,
  delTodo,
  fixTodo,
  cmpTodo,
  foldTodo,
  resetTodo,
  resetToDos,
} = todoSlice.actions;

export default todoSlice.reducer;
