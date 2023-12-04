import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addTodo, fixTodo } from "../redux/todo/todoSlice";
import { setCurTodo, setUi } from "../redux/uiState/uiStateSlice";
import { DAILY, MONTHLY, NONE, TodoOptionType, WEEKEND, YEARLY } from "../type";
import { todoAdapter } from "../utils";

const Ct = styled.div<{ type: "FIX" | "ADD" }>`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.type === "ADD" ? "center" : "flex-start"};
  align-items: center;

  form {
    display: grid;
    grid-template-columns: 15% 85%;
    align-items: center;
    width: 95%;
    select {
      padding: 7px;
      border: none;
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
      outline: none;
      /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06); */
      option {
      }
    }
    input {
      margin-left: 1px;
      width: 100%;
      padding: 7px;
      border: none;
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
      /* box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06); */
      outline: none;
      &:focus {
        border: 1px solid #2d2d2d;
      }
    }
  }
`;
interface IProps {
  type: "ADD" | "FIX";
}
interface IFormState {
  formText: string;
  formOption: TodoOptionType;
}
export default function TodoTypeInput({ type }: IProps) {
  const dispatch = useAppDispatch();
  const { id, text, option } = useAppSelector(
    (state) => state.uiState.currentTodo
  );

  const { register, handleSubmit, setValue, setFocus } = useForm<IFormState>({
    defaultValues: {
      formText: type === "FIX" ? text : "",
      formOption: type === "FIX" ? option : "NONE",
    },
  });
  const onValid = ({ formText, formOption }: IFormState) => {
    if (text) {
      switch (type) {
        case "ADD":
          dispatch(
            addTodo({ parentId: id, text: formText, option: formOption })
          );
          break;
        case "FIX":
          dispatch(fixTodo({ id, text: formText, option: formOption }));
          break;
        default:
          alert("Form.tsx component error");
      }
    }
    dispatch(setUi({ type, id }));
    dispatch(setCurTodo(todoAdapter.getInitialState()));
    setValue("formText", "");
  };
  useEffect(() => {
    setFocus("formText");
  }, [type]);
  return (
    <Ct type={type}>
      <form
        onSubmit={handleSubmit(onValid)}
        onClick={(e: React.FormEvent<HTMLFormElement>) => {
          e.stopPropagation();
        }}
      >
        <select
          {...register("formOption")}
          onChange={() => {
            setFocus("formText"); // enter submit
          }}
        >
          <option value={NONE}>미정</option>
          <option value={DAILY}>일간</option>
          <option value={WEEKEND}>주간</option>
          <option value={MONTHLY}>월간</option>
          <option value={YEARLY}>연간</option>
        </select>
        <input
          {...register("formText", {
            required: true,
          })}
          onBlur={() => {
            // dispatch(setUi({ type: "RESET" }));
          }}
          placeholder={type !== "FIX" ? "할 일 추가" : "할 일 수정"}
          autoComplete="off"
        />
      </form>
    </Ct>
  );
}
