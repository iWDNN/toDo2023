import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/todo/todoSlice";

const Container = styled.div`
  max-width: 1080px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 15px;
  form {
    width: 80%;
    input {
      width: 100%;
      padding: 10px;
      border: 2.5px solid ${(props) => props.theme.accentColor};
      border-radius: 15px;
      outline: none;
      &:focus {
        border-color: #000;
      }
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
