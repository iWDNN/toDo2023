import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import uuid from "react-uuid";
import { RootState } from "../store";

export interface IToDoState {
  id: string;
  title: string;
  check: boolean;
  comment: IToDoState[];
}
export interface IAddComment {
  commentId: string;
  addComment: string;
}

const initialState: IToDoState[] = [];

export const toDoSlice = createSlice({
  name: "exerLogs",
  initialState,
  reducers: {
    addToDo: (state, action: PayloadAction<IToDoState>) => {
      state.push(action.payload);
    },
    delToDo: (state, action: PayloadAction<string>) => {},

    setToDo: (state, action: PayloadAction<IToDoState>) => {
      const idx = state.findIndex((state) => state.id === action.payload.id);
      state[idx] = action.payload;
    },
    addDetail: (state, action: PayloadAction<IAddComment>) => {
      const unFold = (state: IToDoState[], wish: string) => {
        for (let todo of state as any) {
          for (let property in todo) {
            if (Array.isArray(todo[property]) && todo[property].length > 0) {
              if (unFold(todo[property], wish)) {
                return true;
              }
            } else if (todo.id === wish) {
              todo.comment.push({
                id: uuid(),
                check: false,
                title: action.payload.addComment,
                comment: [],
              });
              return true;
            }
          }
        }
        return false;
      };
      unFold(state, action.payload.commentId);
    },

    resetToDo: () => [],
  },
});

export const { addToDo, delToDo, setToDo, resetToDo, addDetail } =
  toDoSlice.actions;

export default toDoSlice.reducer;
