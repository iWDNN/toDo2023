import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { addTodo, fixTodo, ITodoState } from "../redux/todo/todoSlice";
import { TodoOptionType } from "../type";
import { IToggleState } from "./Todo";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 5px;
  form {
    width: 95%;
    display: grid;
    grid-template-columns: 15% 85%;
    align-items: center;
    color: ${(props) => props.theme.textColor};
    select,
    input {
      border: none;
      outline: none;
      padding: 7px;
    }
    select: {
    }
    input {
    }
  }
`;

interface IProps {
  type: "ADD" | "FIX";
  todoState: ITodoState;
  setTgFunction: React.Dispatch<React.SetStateAction<IToggleState>>;
}

interface IFormState {
  formOption: TodoOptionType;
  formInput: string;
}

export default function TodoTypeInput({
  type,
  todoState,
  setTgFunction,
}: IProps) {
  const dispatch = useAppDispatch();

  const { register, setFocus, handleSubmit } = useForm<IFormState>({
    defaultValues: {
      formOption: type === "FIX" ? todoState.option : "NONE",
      formInput: type === "FIX" ? todoState.text : "",
    },
  });

  const [blurTg, setBlurTg] = useState(false);

  const eventPregStop = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation();
  };
  const onBlurEvent = (e: React.FormEvent<HTMLFormElement>) => {
    if (!blurTg) {
      setTgFunction(() => {
        return {
          add: false,
          fix: false,
        };
      });
    }
  };

  const onValid = ({ formInput, formOption }: IFormState) => {
    switch (type) {
      case "ADD":
        dispatch(
          addTodo({
            parentId: todoState.id,
            text: formInput,
            option: formOption,
          })
        );
        break;
      case "FIX":
        dispatch(
          fixTodo({
            id: todoState.id,
            text: formInput,
            option: formOption,
          })
        );
        break;
      default:
        alert("TodoTypeInput.tsx error submit");
    }
  };
  useEffect(() => {
    setFocus("formInput");
  }, []);
  return (
    <Container>
      <form //form 내부에서 onBlur가 발생하지 않게
        onMouseOver={() => {
          setBlurTg(true);
        }}
        onMouseOut={() => {
          setBlurTg(false);
        }}
        onBlur={(e: React.FormEvent<HTMLFormElement>) => onBlurEvent(e)}
        onSubmit={handleSubmit(onValid)}
      >
        <select
          {...register("formOption")}
          onChange={() => setFocus("formInput")}
          onClick={eventPregStop}
        >
          <option value="NONE">NONE</option>
          <option value="DAILY">DAILY</option>
          <option value="WEEKEND">WEEKEND</option>
          <option value="MONTHLY">MONTHLY</option>
          <option value="YEARLY">YEARLY</option>
        </select>
        <input {...register("formInput")} onClick={eventPregStop} />
      </form>
    </Container>
  );
}
