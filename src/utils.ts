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
    };
  },
};
export const unpack = {
  allArr: [] as ITodoState[],
  cmpArr: [] as ITodoState[],
  notCmpArr: [] as ITodoState[],
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
          if (JSON.stringify(beforeArr) === "[]") {
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
          if (JSON.stringify(beforeArr) === "[]") {
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
          // if (JSON.stringify(beforeArr) === "[]") {
          //   beforeArr = state;
          // }
          // const findIdx = beforeArr.findIndex((el) => el.id === id);
          // beforeArr[findIdx] = {
          //   ...beforeArr[findIdx],
          //   completed: !beforeArr[findIdx].completed,
          // };
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
  record(state: ITodoState[]) {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo)) {
        if (key === "id" && value) {
          this.allArr.push(todo);
        }
        if (key === "completed" && value === false) {
          this.notCmpArr.push(todo);
        } else if (key === "completed" && value === true) {
          this.cmpArr.push(todo);
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

  unpackReset() {
    this.allArr = [];
    this.cmpArr = [];
    this.notCmpArr = [];
  },
};

export const resetDatePeriod = (type: string) => {
  switch (type) {
    case "DAILY":
  }
};

export const setLS = (name: string, content: any) => {
  localStorage.setItem(name, JSON.stringify(content));
};
export const getLS = (name: string) => {
  return JSON.parse(localStorage.getItem(name) as any);
};

export const resetPeriodLS = (dispatch: Function, resetFunc: Function) => {
  if (!getLS("resetPeriod")) {
    setLS("resetPeriod", { daily: 0, weekend: false, monthly: 0, yearly: 0 });
  } else {
    const today = new Date();
    if (!getLS("resetPeriod").daily) {
      setLS("resetPeriod", {
        ...getLS("resetPeriod"),
        daily: today.getDate(),
      });
    } else {
      if (getLS("resetPeriod") !== today.getDate()) {
        dispatch(
          resetFunc({ type: "completed", option: "DAILY", value: false })
        );
        setLS("resetPeriod", {
          ...getLS("resetPeriod"),
          daily: today.getDate(),
        });
      }
    }
    if (today.getDay() === 1 && getLS("resetPeriod").weekend === false) {
      dispatch(
        resetFunc({ type: "completed", option: "WEEKEND", value: false })
      );
      setLS("resetPeriod", {
        ...getLS("resetPeriod"),
        weekend: true,
      });
    } else if (today.getDay() !== 1 && getLS("resetPeriod").weekend === true) {
      setLS("resetPeriod", {
        ...getLS("resetPeriod"),
        weekend: false,
      });
    }

    if (!getLS("resetPeriod").monthly) {
      setLS("resetPeriod", {
        ...getLS("resetPeriod"),
        monthly: today.getMonth(),
      });
    } else {
      if (getLS("resetPeriod") !== today.getMonth()) {
        dispatch(
          resetFunc({ type: "completed", option: "MONTHLY", value: false })
        );
        setLS("resetPeriod", {
          ...getLS("resetPeriod"),
          monthly: today.getMonth(),
        });
      }
    }

    if (!getLS("resetPeriod").yearly) {
      setLS("resetPeriod", {
        ...getLS("resetPeriod"),
        yearly: today.getFullYear(),
      });
    } else {
      if (getLS("resetPeriod") !== today.getFullYear()) {
        dispatch(
          resetFunc({ type: "completed", option: "YEARLY", value: false })
        );
        setLS("resetPeriod", {
          ...getLS("resetPeriod"),
          yearly: today.getFullYear(),
        });
      }
    }
  }
};
