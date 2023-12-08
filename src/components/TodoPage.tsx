import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  hideTodo,
  ITodoState,
  resetToDos,
  selFilteredTodos,
} from "../redux/todo/todoSlice";
import { setToggleEdit } from "../redux/uiState/uiStateSlice";
import { filterlist } from "../type";
import Todos from "./Todos";
const Container = styled.div`
  width: 100%;
`;

const Tabs = styled.div`
  width: 100%;
  height: 5vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-top: 10px;
`;
const Tab = styled.div<{ $isActive: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  /* border-right: 1px solid ${(props) => props.theme.textColor}; */
  a {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px 10px;
    font-weight: 600;
    border-bottom: ${(props) =>
      props.$isActive && "2px solid" + props.theme.textColor};
    border-radius: 1px;
  }
  &:last-child {
    border-right: none;
  }
`;
const SetCt = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  /* width: 100%; */
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const SetGrp = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border: 2px solid ${(props) => props.theme.textColor};
  padding: 5px;
  border-radius: 7px;
  margin-right: 30px;
`;
const SetIcon = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.1em;
`;

const ToDoList = styled.div`
  position: relative;
  height: 90vh;
  overflow-y: scroll;
  padding: 10px;
`;

export default function TodoPage() {
  const { filterId } = useParams();

  const dispatch = useAppDispatch();

  const toDoRedux = useAppSelector((state) => state.todos);
  const unpackFilteredArr = useSelector((state: ITodoState[]) =>
    selFilteredTodos(state, filterId?.toUpperCase())
  )[0];
  const onClickEdit = () => {
    dispatch(setToggleEdit());
  };
  const onClickReset = () => {
    if (window.confirm("모두 제거하시겠습니까?")) dispatch(resetToDos());
  };
  const onClickOpen = () => {
    dispatch(hideTodo({ open: true }));
  };
  const onClickClose = () => {
    dispatch(hideTodo({ close: true }));
  };
  return (
    <>
      <Container>
        <Tabs>
          {filterlist.map((filter) => (
            <Tab
              key={uuid()}
              $isActive={filterId === filter.toLocaleLowerCase()}
            >
              <Link key={uuid()} to={`/todo/${filter.toLocaleLowerCase()}`}>
                {filter}
              </Link>
            </Tab>
          ))}
        </Tabs>
        <SetCt>
          <SetGrp>
            <SetIcon onClick={onClickEdit}>
              <i className="fa-solid fa-gear" />
            </SetIcon>
            <SetIcon onClick={onClickReset}>
              <i className="fa-solid fa-trash" />
            </SetIcon>
            <SetIcon onClick={onClickOpen}>
              <i className="fa-solid fa-folder-open" />
            </SetIcon>
            <SetIcon onClick={onClickClose}>
              <i className="fa-solid fa-folder" />
            </SetIcon>
          </SetGrp>
        </SetCt>
        <ToDoList>
          <Todos
            recursiveData={filterId === "all" ? toDoRedux : unpackFilteredArr}
            // repeat={filterId === "all"}
          />
        </ToDoList>
      </Container>
    </>
  );
}
