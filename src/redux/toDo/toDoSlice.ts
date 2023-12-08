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
      unpack.sort(state);
    },
    delTodo: (state, action: PayloadAction<string>) => {
      unpack.delete(state, action.payload);
      unpack.sort(state);
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
      unpack.sort(state);
    },
    cmpTodo: (state, action: PayloadAction<string>) => {
      unpack.complete(state, action.payload);
      unpack.sort(state);
    },
    hideTodo: (
      state,
      action: PayloadAction<{ id?: string; open?: boolean; close?: boolean }>
    ) => {
      unpack.hide(state, action.payload);
      unpack.sort(state);
    },
    resetToDos: () => [],
  },
});

const selTodos = (state: RootState) => state.todos;

export const selTodoUnpackList = createSelector(selTodos, (todos) => {
  // complete 기능이 사용가능 한 가장 하위 투두의 배열
  unpack.unpackReset();
  unpack.record(todos);
  return [unpack.listArr, unpack.itemArr];
});

export const selFilteredTodos = createSelector(
  [selTodoUnpackList, (_state, filterId) => filterId],
  ([selListArr, selItemArr], filterId): [ITodoState[], number] => {
    let listArr: ITodoState[] = selListArr.filter(
      (todo) => (filterId === "ALL" ? selListArr : todo.option === filterId) // 폴더도 보이는 옵션으로 분류된 배열
    );
    unpack.unpackReset();
    unpack.record(listArr); // 배열 depth를 제외한 할일들의 1차원 배열
    const copyUnpackItemArr = unpack.itemArr.slice();
    const itemArr =
      filterId === "all"
        ? Math.floor(
            (selItemArr.filter((todo) => todo.completed).length /
              selItemArr.length) *
              100
          )
        : Math.floor(
            (copyUnpackItemArr.filter((todo) => todo.completed).length /
              copyUnpackItemArr.length) *
              100
          );

    return [listArr, itemArr];
  }
);

export const { addTodo, delTodo, fixTodo, cmpTodo, hideTodo, resetToDos } =
  todoSlice.actions;

export default todoSlice.reducer;
