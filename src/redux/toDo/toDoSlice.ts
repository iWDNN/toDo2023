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
  isHide: boolean;
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
      unpack.complete(state, action.payload);
    },
    hideTodo: (state, action: PayloadAction<string>) => {
      unpack.hide(state, action.payload);
    },
    resetTodo: (
      state,
      action: PayloadAction<{
        type: "completed";
        option: TodoOptionType | "ALL";
        value: boolean;
      }>
    ) => {
      unpack.reset(state, action.payload);
    },
    resetToDos: () => [],
  },
});

const selTodos = (state: RootState) => state.todos;

export const selTodoUnpackList = createSelector(selTodos, (todos) => {
  // complete 기능이 사용가능 한 가장 하위 투두의 배열
  unpack.unpackReset();
  unpack.record2(todos);
  return unpack.allArr;
});

export const selFilteredTodos = createSelector(
  [selTodoUnpackList, (_state, filterId) => filterId],
  (unpackList, filterId): [ITodoState[], number] => [
    unpackList.filter((todo) =>
      filterId === "ALL" ? unpackList : todo.option === filterId
    ),
    Math.floor(
      (unpackList
        .filter((todo) =>
          filterId === "ALL" ? unpackList : todo.option === filterId
        )
        .filter((todo) => todo.completed).length /
        unpackList.filter((todo) =>
          filterId === "ALL" ? unpackList : todo.option === filterId
        ).length) *
        100
    ),
  ]
);

export const {
  addTodo,
  delTodo,
  fixTodo,
  cmpTodo,
  hideTodo,
  resetTodo,
  resetToDos,
} = todoSlice.actions;

export default todoSlice.reducer;
