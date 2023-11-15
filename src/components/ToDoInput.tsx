import React from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { addToDo } from "../redux/toDo/toDoSlice";

const Container = styled.div`
  max-width: 1080px;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  margin-bottom: 15px;
  form {
    input {
      width: 100%;
      padding: 10px;
      border: 2.5px solid ${(props) => props.theme.accentColor};
      border-radius: 15px;
      outline: none;
    }
  }
`;

interface IForm {
  toDo: string;
  detail: string;
}
export default function ToDoInput() {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue } = useForm<IForm>();
  const onSubmit = ({ toDo }: IForm) => {
    dispatch(
      addToDo({
        id: uuid(),
        title: toDo,
        check: false,
        comment: [],
      })
    );
    setValue("toDo", "");
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          autoComplete="off"
          {...register("toDo", {
            required: true,
          })}
          placeholder="할 일 작성"
        />
      </form>
    </Container>
  );
}
