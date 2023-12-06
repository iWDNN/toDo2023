import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ITodoState, selFilteredTodos } from "../redux/todo/todoSlice";
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
const SetList = styled.div`
  position: absolute;
  top: -10px;
  right: 10px;
  display: flex;
  justify-content: flex-end;
  padding: 10px 10px 0 0;
`;
const SetIcon = styled.div`
  font-size: 1.1em;
  margin-left: 10px;
`;

const ToDoList = styled.div`
  position: relative;
  height: 90vh;
  overflow-y: scroll;
  padding: 10px;
`;

export default function TodoPage() {
  const { filterId } = useParams();

  const toDoRedux = useAppSelector((state) => state.todos);
  const unpackFilteredArr = useSelector((state: ITodoState[]) =>
    selFilteredTodos(state, filterId?.toUpperCase())
  )[0];

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
        <ToDoList>
          {/* <SetList>
            <SetIcon
              onClick={() => {
                dispatch(setUi({ type: "SET" }));
              }}
            >
              <i className="fa-solid fa-gear" />
            </SetIcon>
            <SetIcon
              onClick={() => {
                if (window.confirm("모두 제거하시겠습니까?")) {
                  dispatch(resetToDos());
                }
              }}
            >
              <i className="fa-solid fa-trash" />
            </SetIcon>
          </SetList> */}
          <Todos
            recursiveData={filterId === "all" ? toDoRedux : unpackFilteredArr}
            // repeat={filterId === "all"}
          />
        </ToDoList>
      </Container>
    </>
  );
}
