import { createSlice } from "@reduxjs/toolkit";
import { SetUiOptionType } from "../../type";

export interface IuiState {
  editTg: boolean;
  depth: number;
}

const initialState: IuiState = {
  editTg: false,
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
    setToggleEdit: (state) => {
      state.editTg = !state.editTg;
    },
  },
});

export const { setToggleEdit } = uiStateSlice.actions;

export default uiStateSlice.reducer;
