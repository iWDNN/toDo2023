import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SetUiOptionType } from "../../type";

export interface IuiState {
  editTg: number;
  themeTg: boolean;
}

const initialState: IuiState = {
  editTg: 0, // 0: false, 1: normal, 2: fixed
  themeTg: true,
};
export interface ISetUiPayload {
  type: SetUiOptionType;
  id?: string;
}

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {
    setEditToggle: (state, action: PayloadAction<number | undefined>) => {
      if (action.payload === undefined) {
        state.editTg += 1;
        if (state.editTg > 2) {
          state.editTg = 0;
        }
      } else if (typeof action.payload === "number") {
        state.editTg = action.payload;
      }
    },
    setThemeToggle: (state) => {
      state.themeTg = !state.themeTg;
    },
  },
});

export const { setEditToggle, setThemeToggle } = uiStateSlice.actions;

export default uiStateSlice.reducer;
