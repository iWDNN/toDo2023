import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IuiState {
  todoSetBtn: boolean;
}

const initialState: IuiState = {
  todoSetBtn: false,
};

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setFixBtn: (state) => {
      state.todoSetBtn = !state.todoSetBtn;
    },
  },
});

export const { setFixBtn } = uiStateSlice.actions;

export default uiStateSlice.reducer;
