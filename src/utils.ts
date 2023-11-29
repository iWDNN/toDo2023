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
      isFold: false,
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
          if (unpack.delete(value, id, temp)) {
            return true;
          }
        }
      }
      temp = [];
    }
  },
  fix: (
    state: ITodoState[],
    payload: {
      id: string;
      text: string;
      option: TodoOptionType;
    },
    temp: ITodoState[] = []
  ) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "id" && value === payload.id) {
          if (JSON.stringify(temp) === "[]") {
            temp = state;
          }
          const findIdx = temp.findIndex((el) => el.id === value);
          temp[findIdx] = {
            ...temp[findIdx],
            text: payload.text,
            option: payload.option,
          };
          return true;
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          temp = value;
          if (unpack.fix(value, payload, temp)) {
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
          if (unpack.toggled(value, id, temp)) {
            return true;
          }
        }
      }
      temp = [];
    }
  },
  fold: (state: ITodoState[], id: string, temp: ITodoState[] = []) => {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo) as any) {
        if (key === "id" && value === id) {
          if (JSON.stringify(temp) === "[]") {
            temp = state;
          }
          const findIdx = temp.findIndex((el) => el.id === id);
          temp[findIdx] = {
            ...temp[findIdx],
            isFold: !temp[findIdx].isFold,
          };
          return true;
        } else if (
          key === "comment" &&
          Array.isArray(value) &&
          value.length > 0
        ) {
          temp = value;
          if (unpack.fold(value, id, temp)) {
            return true;
          }
        }
      }
      temp = [];
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
    }
  ) {
    for (const todo of state) {
      for (const [key, value] of Object.entries(todo)) {
        if (payload.type === "completed") {
          if (key === "completed" && value === true) {
            if (todo.option === payload.option) {
              todo.completed = false;
            } else if (payload.option === "ALL") {
              todo.completed = false;
            }
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
        dispatch(resetFunc({ type: "completed", option: "DAILY" }));
        setLS("resetPeriod", {
          ...getLS("resetPeriod"),
          daily: today.getDate(),
        });
      }
    }
    if (today.getDay() === 1 && getLS("resetPeriod").weekend === false) {
      dispatch(resetFunc({ type: "completed", option: "WEEKEND" }));
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
        dispatch(resetFunc({ type: "completed", option: "MONTHLY" }));
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
        dispatch(resetFunc({ type: "completed", option: "YEARLY" }));
        setLS("resetPeriod", {
          ...getLS("resetPeriod"),
          yearly: today.getFullYear(),
        });
      }
    }
  }
};
