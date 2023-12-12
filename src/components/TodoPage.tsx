import React from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import uuid from "react-uuid";
import styled from "styled-components";
import { useAppSelector } from "../redux/hooks";
import { ITodoState, selFilteredTodos } from "../redux/todo/todoSlice";
import { filterlist } from "../type";
import Todos from "./Todos";
const Container = styled.div`
  width: 100%;
  color: ${(props) => props.theme.textColor};
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

const ToDoList = styled.div`
  position: relative;
  height: 90vh;
  overflow-y: scroll;
  padding: 10px;
`;

export default function TodoPage() {
  const { filterId } = useParams();

  const toDoRedux = useAppSelector((state) => state.storeTodos);
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
          <Todos
            recursiveData={filterId === "all" ? toDoRedux : unpackFilteredArr}
            // repeat={filterId === "all"}
          />
        </ToDoList>
      </Container>
    </>
  );
}
