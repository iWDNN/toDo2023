import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { ITodoState } from "../redux/todo/todoSlice";

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  margin-left: 15px;
`;

const IsCmp = styled.div`
  i {
    display: none;
    opacity: 0.1;
  }
`;
const Title = styled.div`
  word-break: break-all;
  white-space: pre-line;
`;
const SetMenu = styled.div``;

const ShowCt = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 10% 80% 10% 0%;
  align-items: center;
  padding: 10px 0;
  border-bottom: 2px solid ${(props) => props.theme.accentColor};
`;
const AddCt = styled.div`
  width: 100%;
  form {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    input {
      margin-top: 10px;
      width: 80%;
      padding: 10px;
      outline: none;
      border: 2px solid #eee;
    }
  }
`;

interface IToDoProps {
  recursiveData: ITodoState[];
}
interface IForm {
  title: string;
}
export default function Todo({ recursiveData }: IToDoProps) {
  const uiTg = useAppSelector((state) => state.uiState.todoSetBtn);

  const [addId, setAddId] = useState("");

  const onAddClick = (todoId: string) => {
    if (addId) {
      if (addId === todoId) {
        setAddId("");
      } else {
        setAddId(todoId);
      }
    } else {
      setAddId(todoId);
    }
  };
  const onDelClick = (todoId: string) => {};
  const { register, handleSubmit } = useForm<IForm>();
  const onValid = (data: IForm) => {
    setAddId("");
  };
  return (
    <Container>
      {recursiveData.map((todo) => (
        <Content key={todo.id}>
          <ShowCt>
            <IsCmp>
              <i className="fa-solid fa-check" />
            </IsCmp>
            <Title>{todo.text}</Title>
            <SetMenu>
              {uiTg ? (
                <div onClick={() => onDelClick(todo.id)}>
                  <i className="fa-solid fa-xmark" />
                </div>
              ) : (
                <div onClick={() => onAddClick(todo.id)}>
                  <i className="fa-solid fa-plus" />
                </div>
              )}
            </SetMenu>
          </ShowCt>
          {addId === todo.id && (
            <AddCt>
              <form onSubmit={handleSubmit(onValid)}>
                <input
                  onFocus={() => {
                    setAddId(todo.id);
                  }}
                  {...register("title")}
                  placeholder="할 일 추가하기"
                />
              </form>
            </AddCt>
          )}
          {todo.comment && <Todo recursiveData={todo.comment} />}
        </Content>
      ))}
    </Container>
  );
}
