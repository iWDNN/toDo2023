import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IuiState {
  todoSetTg: boolean;
  addTg: boolean;
  fixTg: boolean;
  currentTodo: string;
}

const initialState: IuiState = {
  todoSetTg: false,
  addTg: false,
  fixTg: false,
  currentTodo: "",
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
          break;
        case "ADD":
          state.addTg = !state.addTg;
          break;
        case "FIX":
          state.fixTg = !state.fixTg;
          break;
        default:
          alert("ui toggle error");
      }
    },
    setCurTodo: (state, action: PayloadAction<string>) => {
      state.currentTodo = action.payload;
    },
  },
});

export const { setUi, setCurTodo } = uiStateSlice.actions;

export default uiStateSlice.reducer;
