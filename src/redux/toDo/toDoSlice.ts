import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { unPack } from "../../utils";

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
    addTodo: (
      state,
      action: PayloadAction<{ parentId: string; text: string }>
    ) => {
      unPack.add(state, action.payload);
    },
    delTodo: (state, action: PayloadAction<string>) => {
      unPack.delete(state, action.payload);
    },
    fixTodo: (state, action: PayloadAction<{ id: string; text: string }>) => {
      unPack.fix(state, action.payload);
    },
    cmpTodo: (state, action: PayloadAction<string>) => {
      unPack.toggled(state, action.payload);
    },
    resetToDos: () => [],
  },
});

export const { addTodo, delTodo, fixTodo, cmpTodo, resetToDos } =
  todoSlice.actions;

export default todoSlice.reducer;
