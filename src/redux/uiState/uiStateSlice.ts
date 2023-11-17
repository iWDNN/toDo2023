import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IuiState {
  todoSetTg: boolean;
  addTg: boolean;
  fixTg: boolean;
  currentTodoId: string;
}

const initialState: IuiState = {
  todoSetTg: false,
  addTg: false,
  fixTg: false,
  currentTodoId: "",
};
export interface ISetUiPayload {
  type: "ADD" | "FIX" | "DEL" | "SET";
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
            state.currentTodoId = "";
            state.addTg = false;
            state.fixTg = false;
          }
          break;
        case "ADD":
          state.currentTodoId === action.payload.id
            ? (state.addTg = !state.addTg)
            : (state.addTg = true);
          break;
        case "FIX":
          state.currentTodoId === action.payload.id
            ? (state.fixTg = !state.fixTg)
            : (state.fixTg = true);
          break;
        default:
          alert("ui toggle error");
      }
    },
    setCurTodo: (state, action: PayloadAction<string>) => {
      state.currentTodoId = action.payload;
    },
  },
});

export const { setUi, setCurTodo } = uiStateSlice.actions;

export default uiStateSlice.reducer;
