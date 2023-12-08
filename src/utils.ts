import uuid from "react-uuid";
import { ITodoState } from "./redux/todo/todoSlice";
import { TodoOptionType } from "./type";

export const todoAdapter = {
  getInitialState: (): ITodoState => {
    return {
      id: uuid(),
      text: "",
      completed: false,
      comment: [],
      option: "NONE",
      isHide: false,
    };
  },
};

// redux data control
export const unpack = {
  listArr: [] as ITodoState[],
  itemArr: [] as ITodoState[],
  add: (
    state: ITodoState[],
    payload: {
      parentId: string;
      text: string;
      option: TodoOptionType;
    }
  ) => {
    if (!payload.parentId) {
      state.push(
        Object.assign(todoAdapter.getInitialState(), {
          text: payload.text,
          option: payload.option,
        })
      );
    } else {
      for (const todo of state) {
        for (const [key, value] of Object.entries(todo) as any) {
          if (key === "id" && value === payload.parentId) {
            todo.comment.push(
              Object.assign(todoAdapter.getInitialState(), {
                text: payload.text,
                option: payload.option,
              })
            );
            return true;
          } else if (
            key === "comment" &&
            Array.isArray(value) &&
            value.length > 0
          ) {
            if (unpack.add(value, payload)) {
              return true;
            }
          }
        }
      }
    }
  },
  delete: (state: ITodoState[], id: string, beforeArr: ITodoState[] = []) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "id" && value === id) {
          if (checkEmptyArr(beforeArr)) {
            beforeArr = state;
          }
          const findIdx = beforeArr.findIndex((el) => el.id === id);
          beforeArr.splice(findIdx, 1);
          return true;
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          beforeArr = value;
          if (unpack.delete(value, id, beforeArr)) {
            return true;
          }
        }
      }
      beforeArr = [];
    }
  },
  fix: (
    state: ITodoState[],
    payload: {
      id: string;
      text: string;
      option: TodoOptionType;
    },
    beforeArr: ITodoState[] = []
  ) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "id" && value === payload.id) {
          // todo.text = payload.text;
          // todo.option = payload.option;
          if (checkEmptyArr(beforeArr)) {
            beforeArr = state;
          }
          const findIdx = beforeArr.findIndex((el) => el.id === value);
          beforeArr[findIdx] = {
            ...beforeArr[findIdx],
            text: payload.text,
            option: payload.option,
          };
          return true;
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          beforeArr = value;
          if (unpack.fix(value, payload, beforeArr)) {
            return true;
          }
        }
      }
      beforeArr = [];
    }
  },
  complete: (state: ITodoState[], id: string) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "id" && value === id) {
          todo.completed = !todo.completed;
          return true;
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          if (unpack.complete(value, id)) {
            return true;
          }
        }
      }
    }
  },
  hide: (
    state: ITodoState[],
    payload: { id?: string; open?: boolean; close?: boolean }
  ) => {
    for (const todo of state) {
      if (payload.open) {
        todo.isHide = false;
      }
      if (payload.close) {
        todo.isHide = true;
      }
      for (const [key, value] of Object.entries(todo) as any) {
        if (!(payload.open || payload.close)) {
          if (key === "id" && value === payload.id) {
            todo.isHide = !todo.isHide;
            return true;
          }
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          if (unpack.hide(value, payload)) {
            return true;
          }
        }
      }
    }
  },
  record(state: ITodoState[]) {
    for (const todo of state) {
      this.listArr.push(todo);
      for (const [key, value] of Object.entries(todo)) {
        if (key === "comment" && checkEmptyArr(value)) {
          this.itemArr.push(todo);
        } else if (key === "comment" && value.length > 0) {
          if (unpack.record(value)) {
            return true;
          }
        }
      }
    }
  },

  reset(
    state: ITodoState[],
    payload: {
      type?: "completed";
      option?: "ALL" | TodoOptionType;
      value: boolean;
    }
  ) {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo)) {
        if (payload.type === "completed") {
          if (todo.option === payload.option) {
            todo.completed = payload.value;
          } else if (payload.option === "ALL") {
            todo.completed = payload.value;
          } else if (key === "comment" && value.length > 0) {
            if (unpack.reset(value, payload)) {
              return true;
            }
          }
        }
      }
    }
  },
  sort: (state: ITodoState[]) => {
    for (const todo of state) {
      state.sort((a, b) =>
        checkEmptyArr(a.comment) === checkEmptyArr(b.comment)
          ? 0
          : checkEmptyArr(a.comment)
          ? 1
          : -1
      );
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "comment" && !checkEmptyArr(value)) {
          if (unpack.sort(value)) {
            return true;
          }
        }
      }
    }
  },

  unpackReset() {
    this.itemArr = [];
    this.listArr = [];
  },
};

// localStrage

export const setLS = (name: string, content: any) => {
  localStorage.setItem(name, JSON.stringify(content));
};
export const getLS = (name: string) => {
  return JSON.parse(localStorage.getItem(name) as any);
};

// etc

export const checkEmptyArr = (arr: any[]) => {
  return JSON.stringify(arr) === "[]";
};

export const optionColor = (option: TodoOptionType): string => {
  let result = "";
  switch (option) {
    case "DAILY":
      result = "#C4E538";
      break;
    case "WEEKEND":
      result = "#FFC312";
      break;
    case "MONTHLY":
      result = "#12CBC4";
      break;
    case "YEARLY":
      result = "#FDA7DF";
      break;
    default:
      result = "grey";
  }
  return result;
};
