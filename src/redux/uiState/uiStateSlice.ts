import { createSlice } from "@reduxjs/toolkit";
import { SetUiOptionType } from "../../type";

export interface IuiState {
  depth: number;
}

const initialState: IuiState = {
  depth: 0,
};
export interface ISetUiPayload {
  type: SetUiOptionType;
  id?: string;
}

export const uiStateSlice = createSlice({
  name: "uiState",
  initialState,
  reducers: {},
});

export const {} = uiStateSlice.actions;

export default uiStateSlice.reducer;
