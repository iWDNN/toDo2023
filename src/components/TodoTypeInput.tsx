import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addTodo, fixTodo } from "../redux/todo/todoSlice";
import { setCurTodo, setUi } from "../redux/uiState/uiStateSlice";
import { todoAdapter } from "../utils";

const Ct = styled.div<{ type: "FIX" | "ADD" }>`
  width: 100%;
  display: flex;
  justify-content: ${(props) =>
    props.type === "ADD" ? "center" : "flex-start"};
  align-items: center;

  form {
    width: 95%;
    input {
      width: 100%;
      padding: 7px;
      border: none;
      border-radius: 7px;
      background-color: #f4f4f4;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
      outline: none;
      &:focus {
        border: 2px solid #2d2d2d;
      }
    }
  }
`;
interface IFormProps {
  type: "ADD" | "FIX";
}
interface IFormState {
  text: string;
}
export default function TodoTypeInput({ type }: IFormProps) {
  const dispatch = useAppDispatch();
  const { id, text } = useAppSelector((state) => state.uiState.currentTodo);

  const { register, handleSubmit, setValue, setFocus } = useForm<IFormState>({
    defaultValues: {
      text: type === "FIX" ? text : "",
    },
  });
  const onValid = ({ text }: IFormState) => {
    if (text) {
      switch (type) {
        case "ADD":
          dispatch(addTodo({ parentId: id, text }));
          break;
        case "FIX":
          dispatch(fixTodo({ id, text }));
          break;
        default:
          alert("Form.tsx component error");
      }
    }
    dispatch(setUi({ type, id }));
    dispatch(setCurTodo(todoAdapter.getInitialState()));
    setValue("text", "");
  };
  useEffect(() => {
    setFocus("text");
  }, [type]);
  return (
    <Ct type={type}>
      <form onSubmit={handleSubmit(onValid)}>
        <input
          {...register("text")}
          placeholder={type !== "FIX" ? "할 일 추가" : "할 일 수정"}
          autoComplete="off"
        />
      </form>
    </Ct>
  );
}
