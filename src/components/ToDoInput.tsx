import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { addTodo } from "../redux/todo/todoSlice";
import { DAILY, MONTHLY, WEEKEND, YEARLY } from "../type";

const Container = styled.div`
  form {
    select {
      padding: 10px;
      border: none;
      border-top-left-radius: 7px;
      border-bottom-left-radius: 7px;
      outline: none;
      background-color: white;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
      option {
      }
    }
    input {
      margin-left: 2px;
      min-width: 360px;
      padding: 10px;
      border: none;
      border-top-right-radius: 7px;
      border-bottom-right-radius: 7px;
      box-shadow: 0 2px 3px rgba(0, 0, 0, 0.1), 0 10px 20px rgba(0, 0, 0, 0.06);
      outline: none;
    }
  }
`;

interface IForm {
  text: string;
  type: "DAILY" | "WEEKEND" | "MONTHLY" | "YEARLY";
}
export default function TodoInput() {
  const dispatch = useAppDispatch();

  const { register, handleSubmit, setValue } = useForm<IForm>({
    defaultValues: {
      type: "DAILY",
    },
  });
  const onSubmit = ({ text, type }: IForm) => {
    dispatch(addTodo({ parentId: "", text, type }));
    setValue("text", "");
  };
  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <select {...register("type")}>
          <option value={DAILY}>일간</option>
          <option value={WEEKEND}>주간</option>
          <option value={MONTHLY}>월간</option>
          <option value={YEARLY}>연간</option>
        </select>
        <input
          autoComplete="off"
          {...register("text", {
            required: true,
          })}
          placeholder="할 일 작성"
        />
      </form>
    </Container>
  );
}
