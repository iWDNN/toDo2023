import uuid from "react-uuid";
import { ITodoState } from "./redux/todo/todoSlice";

export const a = "";
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
  add: (state: ITodoState[], id: string, text: string) => {
    for (const todo of state as any[]) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (Array.isArray(value) && value.length > 0) {
          if (unPack.add(value, id, text)) {
            return true;
          }
        } else if (todo.id === id) {
          console.log("no arr");
          console.log("todo:", todo);
          todo.comment.push(
            Object.assign(todoAdapter.getInitialState(), { text })
          );
          return true;
        }
      }
    }
  },
  delete: (state: ITodoState[], id: string) => {
    let temp: ITodoState = todoAdapter.getInitialState();
    for (const todo of state as any[]) {
      temp = todo;
      for (const [key, value] of Object.entries(todo) as any) {
        if (Array.isArray(value) && value.length > 0) {
          if (unPack.delete(value, id)) {
            return true;
          }
        } else if (todo.id === id) {
          const findIdx = temp.comment.findIndex((el) => el.id === todo.id);
          temp.comment.splice(findIdx, 1);
          return true;
        }
      }
    }
  },
  fix: () => {},
  toggle: () => {},
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
