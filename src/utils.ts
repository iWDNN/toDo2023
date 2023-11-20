import uuid from "react-uuid";
import { ITodoState } from "./redux/todo/todoSlice";

export const todoAdapter = {
  getInitialState: () => {
    return {
      id: uuid(),
      text: "",
      completed: false,
      comment: [],
    };
  },
};
export const unPack = {
  notCmpArr: [] as string[],
  add: (state: ITodoState[], payload: { parentId?: string; text: string }) => {
    if (!payload.parentId) {
      state.push(
        Object.assign(todoAdapter.getInitialState(), {
          text: payload.text,
        })
      );
    } else {
      for (const todo of state) {
        for (const [key, value] of Object.entries(todo) as any) {
          if (key === "id" && value === payload.parentId) {
            todo.comment.push(
              Object.assign(todoAdapter.getInitialState(), {
                text: payload.text,
              })
            );
            return true;
          } else if (
            key === "comment" &&
            Array.isArray(value) &&
            value.length > 0
          ) {
            if (unPack.add(value, payload)) {
              return true;
            }
          }
        }
      }
    }
  },
  delete: (state: ITodoState[], id: string, temp: ITodoState[] = []) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "id" && value === id) {
          if (JSON.stringify(temp) === "[]") {
            temp = state;
          }
          const findIdx = temp.findIndex((el) => el.id === id);
          temp.splice(findIdx, 1);
          return true;
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          temp = value;
          if (unPack.delete(value, id, temp)) {
            return true;
          }
        }
      }
      temp = [];
    }
  },
  fix: (
    state: ITodoState[],
    payload: { id: string; text: string },
    temp: ITodoState[] = []
  ) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "id" && value === payload.id) {
          if (JSON.stringify(temp) === "[]") {
            temp = state;
          }
          const findIdx = temp.findIndex((el) => el.id === value);
          temp[findIdx] = { ...temp[findIdx], text: payload.text };
          return true;
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          temp = value;
          if (unPack.fix(value, payload, temp)) {
            return true;
          }
        }
      }
      temp = [];
    }
  },
  toggled: (state: ITodoState[], id: string, temp: ITodoState[] = []) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "id" && value === id) {
          if (JSON.stringify(temp) === "[]") {
            temp = state;
          }
          const findIdx = temp.findIndex((el) => el.id === id);
          temp[findIdx] = {
            ...temp[findIdx],
            completed: !temp[findIdx].completed,
          };
          return true;
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          temp = value;
          if (unPack.toggled(value, id, temp)) {
            return true;
          }
        }
      }
      temp = [];
    }
  },
  record(state: ITodoState[]) {
    this.notCmpArr = [];
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo)) {
        if (key === "completed" && value === false) {
          this.notCmpArr.push(todo.text);
        } else if (key === "comment" && value.length > 0) {
          if (unPack.record(value)) {
            return true;
          }
        }
      }
    }
  },
};

// const unPackFindToDo = (todos: ITodoState[], wish: string) => {
//   for (const todo of todos as any[]) {
//     for (const [key, value] of Object.entries(todo) as any) {
//       if (Array.isArray(value) && value.length > 0) {
//         if (unPackFindToDo(value, wish)) {
//           return true;
//         }
//       } else if (todo.id === wish) {
//         return true;
//       }
//     }
//   }
// };
// unPackFindToDo(state, action.payload);
// Object.assign(state, testCopy);
