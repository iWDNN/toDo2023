import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface IToDoState {
  id: string;
  title: string;
  check: boolean;
  detail?: string[];
}

const initialState: IToDoState[] = [];

export const toDoSlice = createSlice({
  name: "exerLogs",
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<IToDoState>) => {
      state.push(action.payload);
    },
    delToDo: (state, action: PayloadAction<string>) =>
      state.filter((state) => state.id !== action.payload),
    setToDo: (state, action: PayloadAction<IToDoState>) => {
      const idx = state.findIndex((state) => state.id === action.payload.id);
      state[idx] = action.payload;
    },

    resetToDo: () => [],
  },
});

export const { addToDo, delToDo, setToDo, resetToDo } = toDoSlice.actions;

export default toDoSlice.reducer;
