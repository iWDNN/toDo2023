import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetUiOptionType } from "../../type";
import { todoAdapter } from "../../utils";
import { ITodoState } from "../todo/todoSlice";

export interface IuiState {
  todoSetTg: boolean;
  addTg: boolean;
  fixTg: boolean;
  currentTodo: ITodoState;
  depth: number;
}

const initialState: IuiState = {
  todoSetTg: false,
  addTg: false,
  fixTg: false,
  currentTodo: todoAdapter.getInitialState(),
  depth: 0,
};
export interface ISetUiPayload {
  type: SetUiOptionType;
  id?: string;
}

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setUi: (state, action: PayloadAction<ISetUiPayload>) => {
      switch (action.payload.type) {
        case "SET":
          state.todoSetTg = !state.todoSetTg;
          if (!state.todoSetTg) {
            state.currentTodo.id = "";
          }
          state.addTg = false;
          state.fixTg = false;
          break;
        case "ADD":
          state.currentTodo.id === action.payload.id
            ? (state.addTg = !state.addTg)
            : (state.addTg = true);
          break;
        case "FIX":
          state.currentTodo.id === action.payload.id
            ? (state.fixTg = !state.fixTg)
            : (state.fixTg = true);
          break;
        case "RESET":
          state.todoSetTg = false;
          state.addTg = false;
          state.fixTg = false;
          state.currentTodo = todoAdapter.getInitialState();
          break;
        default:
          alert("ui toggle error");
      }
    },
    setCurTodo: (state, action: PayloadAction<ITodoState>) => {
      state.currentTodo = action.payload;
    },
    increaseDepth: (state) => {
      state.depth += 1;
    },
    resetDepth: (state) => {
      state.depth = 0;
    },
  },
});

export const { setUi, setCurTodo, increaseDepth, resetDepth } =
  uiStateSlice.actions;

export default uiStateSlice.reducer;
