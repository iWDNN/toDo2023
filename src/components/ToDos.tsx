import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  ITodoState,
  resetToDos,
  selFilteredTodos,
  selTodoUnpackList,
} from "../redux/todo/todoSlice";
import { setUi } from "../redux/uiState/uiStateSlice";
import { filterlist } from "../utils";
import Todo from "./Todo";
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
const Tab = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  border-right: 1px solid black;
  font-weight: 600;
  &:last-child {
    border: none;
  }
`;
const MenuList = styled.div`
  position: fixed;
  top: 0;
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 0 0;
`;
const Menu = styled.div`
  font-size: 1.1em;
  margin-left: 10px;
`;

const ToDoList = styled.div`
  height: 90vh;
  overflow-y: scroll;
  padding: 10px;
`;

export default function Todos() {
  const { filterId } = useParams();

  const dispatch = useAppDispatch();
  const toDoRedux = useAppSelector((state) => state.todos);
  const filteredTodos = useSelector((state: ITodoState[]) =>
    selFilteredTodos(state, filterId?.toUpperCase())
  );
  return (
    <>
      <MenuList>
        <Menu
          onClick={() => {
            dispatch(setUi({ type: "SET" }));
          }}
        >
          <i className="fa-solid fa-gear" />
        </Menu>
        <Menu
          onClick={() => {
            dispatch(resetToDos());
          }}
        >
          <i className="fa-solid fa-trash" />
        </Menu>
      </MenuList>
      <Container>
        <Tabs>
          {filterlist.map((filter) => (
            <Link key={uuid()} to={`/todo/${filter.toLocaleLowerCase()}`}>
              <Tab>{filter}</Tab>
            </Link>
          ))}
        </Tabs>
        <ToDoList>
          <Todo
            recursiveData={filterId === "all" ? toDoRedux : filteredTodos}
            repeat={filterId === "all"}
          />
        </ToDoList>
      </Container>
    </>
  );
}
