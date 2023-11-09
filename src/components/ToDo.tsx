import React, { ReactEventHandler, useState } from "react";
import { useForm } from "react-hook-form";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { delToDo, IToDoState, setToDo } from "../redux/toDo/toDoSlice";

const TempCt = styled.div`
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: grid;
  grid-template-columns: 10% 75% 15%;
  align-items: center;
  padding: 20px;
  border: 2px solid ${(props) => props.theme.accentColor};
  border-radius: 15px;
  * {
    transition: all 0.1s linear;
  }
`;
const Check = styled.div<{ isCmp: boolean }>`
  color: ${(props) => (props.isCmp ? "#4cd137" : "#dbdbdb")};
  font-size: 18px;
  font-weight: 700;
  &:hover {
    color: ${(props) => props.theme.textColor};
  }
`;
const Title = styled.div<{ isCmp: boolean }>`
  font-size: 20px;
  font-weight: 500;
  letter-spacing: 0.5px;
`;

const Setting = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 14px;
`;
const SetOne = styled.div`
  display: flex;
  div:last-child {
    margin-left: 10px;
  }
`;
const SetTwo = styled.div``;

interface IToDoProps {
  data: IToDoState;
}

interface IForm {
  inputToDo: string;
}

export default function ToDo({
  data: { id, title, check, detail },
}: IToDoProps) {
  const dispatch = useAppDispatch();
  const setTg = useAppSelector((state) => state.uiState.todoSetBtn);
  const [contentTg, setContentTg] = useState(false);
  const [fix, setFix] = useState(false);

  const onClickCheck = (e: React.FormEvent<HTMLElement>) => {
    e.stopPropagation();
    dispatch(setToDo({ id, title, check: !check }));
  };

  const { register, setValue, handleSubmit } = useForm<IForm>();
  const onSubmit = ({ inputToDo }: IForm) => {
    setFix(false);
    if (inputToDo) {
      dispatch(
        setToDo({
          id,
          title: inputToDo,
          check,
        })
      );
    }

    setValue("inputToDo", "");
  };
  return (
    <TempCt>
      <Container
        key={uuid()}
        onClick={() => {
          setContentTg((prev) => !prev);
        }}
      >
        <Check isCmp={check} onClick={onClickCheck}>
          <i className="fa-solid fa-check"></i>
        </Check>
        <Title isCmp={check}>
          {fix ? (
            <form onSubmit={handleSubmit(onSubmit)}>
              <input placeholder={title} {...register("inputToDo")} />
            </form>
          ) : (
            title
          )}
        </Title>
        <Setting>
          {setTg ? (
            <SetOne>
              <div
                onClick={() => {
                  setFix((prev) => !prev);
                }}
              >
                수정
              </div>
              <div
                onClick={() => {
                  dispatch(delToDo(id));
                }}
              >
                삭제
              </div>
            </SetOne>
          ) : (
            <SetTwo>
              {contentTg ? (
                <i className="fa-solid fa-chevron-up" />
              ) : (
                <i className="fa-solid fa-chevron-down"></i>
              )}
            </SetTwo>
          )}
        </Setting>
      </Container>
    </TempCt>
  );
}
