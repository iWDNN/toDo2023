import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { addTodo, fixTodo } from "../redux/todo/todoSlice";
import { setCurTodo, setUi } from "../redux/uiState/uiStateSlice";
import { todoAdapter } from "../utils";

const Ct = styled.div`
  width: 100%;
  display: inline-block;
  form {
    width: 100%;
    input {
      padding: 5px;
      width: 80%;
      outline: none;
      border: 2px solid #eee;
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
    dispatch(setUi({ type, id: id }));
    dispatch(setCurTodo(todoAdapter.getInitialState()));
    setValue("text", "");
  };
  useEffect(() => {
    setFocus("text");
  }, [type]);
  return (
    <Ct>
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
