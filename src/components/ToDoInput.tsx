import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/todo/todoSlice";

const Container = styled.div`
  form {
    input {
      min-width: 360px;
      padding: 10px;
      border: none;
      border-radius: 7px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
      outline: none;
    }
  }
`;

interface IForm {
  todo: string;
}
export default function TodoInput() {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ todo }: IForm) => {
    dispatch(addTodo({ parentId: "", text: todo }));
    setValue("todo", "");
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete="off"
          {...register("todo", {
            required: true,
          })}
          placeholder="할 일 작성"
        />
      </form>
    </Container>
  );
}
