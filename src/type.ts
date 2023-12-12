export const RESET_PERIOD = "reset period";

export const ADD = "ADD";
export const FIX = "FIX";
export const DEL = "DEL";

export const NONE = "NONE";
export const DAILY = "DAILY";
export const WEEKEND = "WEEKEND";
export const MONTHLY = "MONTHLY";
export const YEARLY = "YEARLY";

export type TodoOptionType =
  | "NONE"
  | "DAILY"
  | "WEEKEND"
  | "MONTHLY"
  | "YEARLY";

export type SetUiOptionType = "ADD" | "FIX" | "DEL" | "SET" | "RESET";

export interface IResetPeriod {
  weekendDay: number;
}

export const daylist = ["일", "월", "화", "수", "목", "금", "토"];
export const filterlist = ["ALL", DAILY, WEEKEND, MONTHLY, YEARLY, NONE];
