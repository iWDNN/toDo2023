import uuid from "react-uuid";
import { ITodoState, testReducer } from "./redux/todo/todoSlice";
import { DAILY, IResetPeriod, RESET_PERIOD, TodoOptionType } from "./type";

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
  testCmpReset: (
    state: ITodoState[],
    type: TodoOptionType,
    repeat?: boolean
  ) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (repeat) {
          todo.completed = false;
        }

        if (key === "option" && value === type) {
          todo.completed = false;
        } else if (key === "comment" && !checkEmptyArr(value)) {
          if (unpack.testCmpReset(todo.comment, type, (repeat = true))) {
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

export const dateInitialState = {
  daily: {
    value: 0,
    reset: false,
  },
  weekend: {
    value: 0,
    reset: false,
  },
  monthly: {
    value: 0,
    reset: false,
  },
  yearly: {
    value: 0,
    reset: false,
  },
};

export const autoTodoReset = (dispatch: Function, getLSData: any) => {
  const today = new Date();
  //daily
  if (getLSData.daily.value !== today.getDate()) {
    if (!getLSData.daily.reset) {
      dispatch(testReducer("DAILY"));
      getLSData.daily.value = today.getDate();
      getLSData.daily.reset = true;
    }
  } else if (getLSData.daily.value === today.getDate()) {
    getLSData.daily.reset = false;
  }
  //monthly
  // if (getLSData.monthly.value !== today.getMonth()) {
  //   if (!getLSData.monthly.reset) {
  //     dispatch(testReducer("MONTHLY"));
  //     getLSData.monthly.value = today.getMonth();
  //     getLSData.monthly.reset = true;
  //   }
  // } else if (getLSData.monthly.value === today.getMonth()) {
  //   getLSData.monthly.reset = false;
  // }
  //yearly
  // if (getLSData.yearly.value !== today.getFullYear()) {
  //   if (!getLSData.yearly.reset) {
  //     dispatch(testReducer("YEARLY"));
  //     getLSData.yearly.value = today.getFullYear();
  //     getLSData.yearly.reset = true;
  //   }
  // } else if (getLSData.yearly.value === today.getFullYear()) {
  //   getLSData.yearly.reset = false;
  // }
  //weekend
  // if (getLSData.weekend.value !== today.getDay()) {
  //   getLSData.daily.reset = false;
  // } else if (getLSData.weekend.value === today.getDay()) {
  //   if (!getLSData.weekend.reset) {
  //     dispatch(testReducer("WEEKEND"));
  //     getLSData.weekend.reset = true;
  //   }
  // }
  setLS(RESET_PERIOD, getLSData);
};

export const checkEmptyArr = (arr: any[]) => {
  return JSON.stringify(arr) === "[]";
};

export const optionColor = (option: TodoOptionType, mode: boolean): string => {
  let result = "";
  if (mode) {
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
  } else {
    switch (option) {
      case "DAILY":
        result = "#1da014";
        break;
      case "WEEKEND":
        result = "#deab11";
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
  }
  return result;
};
