import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Time from "../components/Time";
import TodoInput from "../components/TodoInput";
import TodoPage from "../components/TodoPage";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  hideTodo,
  ITodoState,
  resetToDos,
  selFilteredTodos,
} from "../redux/todo/todoSlice";
import { setEditToggle, setThemeToggle } from "../redux/uiState/uiStateSlice";
import { daylist } from "../type";

const ToolBar = styled.div`
  position: absolute;
  top: 1vh;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SetCt = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;
const SetGrp = styled.div`
  width: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px;
  border-radius: 7px;
`;
const SetIcon = styled.div<{ $editTg?: number }>`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  padding: 2px;
  font-size: 1.1em;
  ${({ $editTg, theme }) => {
    if ($editTg === 1 || $editTg === 2) {
      return `
      box-shadow:0 0 0 2px ${theme.textColor};
      ${
        $editTg === 2 &&
        `
        color:${theme.elementColor.boxBg};
        background-color:${theme.textColor};
        `
      }
      `;
    }
  }}
`;

const ThemeModeCt = styled.div`
  display: flex;
  align-items: center;
  span {
    font-weight: 700;
    font-size: 12px;
    text-transform: uppercase;
    margin: 0 5px;
    color: ${(props) => props.theme.textColor};
  }
`;
const ThemeBox = styled.div<{ $themeMode: boolean }>`
  position: relative;
  width: 35px;
  height: 18px;
  border: 3.5px solid ${(props) => props.theme.textColor};
  background-color: ${(props) => props.theme.textColor};
  border-radius: 10px;
  opacity: 0.85;
  & > div {
    ${({ $themeMode }) =>
      $themeMode ? `transform: translateX(0);` : `transform: translateX(100%);`}
  }
  &:hover {
    opacity: 1;
  }
`;
const ThemeBtn = styled.div`
  position: absolute;
  width: 50%;
  height: 100%;
  border-radius: 50%;
  background-color: ${(props) => props.theme.bgColor};
`;

const Title = styled.div`
  font-size: 1.4em;
  font-weight: 600;
  margin-bottom: 5px;
  h4 {
    font-size: 0.7em;
  }
`;
const Header = styled.header`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.textColor};
  & > *:nth-child(1) {
    //header
    ${Title} {
      font-size: 2.5em;
      @media screen and (min-width: 1040px) {
        font-size: 1.5em;
      }
    }
  }
  & > *:nth-child(2) {
    // wrap
    margin-top: 35px;
  }
`;
const Wrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
const DateBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 10px;
  @media screen and (max-width: 1040px) {
    font-size: 2em;
  }
  & > div {
    font-weight: 600;
  }
  & > div:nth-child(1) {
    // 요일
    font-size: 20px;
    span:first-child {
      font-weight: 700;
      font-size: 30px;
    }
  }
  & > div:nth-child(2) {
    // 날짜
    font-size: 16px;
  }
`;
const BgBar = styled.div`
  width: 80px;
  height: 5px;
  border-radius: 7px;
  background-color: ${(props) => props.theme.elementColor.inputBg};
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.12);
`;
const Bar = styled.div<{ $percent: number }>`
  width: ${(props) => (props.$percent ? props.$percent + "%" : "0%")};
  height: 100%;
  background-color: #389729;
  border-radius: inherit;
  /* transition: all 0.2s ease-in-out; */
`;
export default function Main() {
  const { filterId } = useParams();

  const dispatch = useAppDispatch();
  const { editTg, themeTg } = useAppSelector((state) => state.uiState);

  const reduxTodos = useAppSelector((state) => state.todos);
  const filteredPercent = useSelector((state: ITodoState[]) =>
    selFilteredTodos(state, filterId?.toUpperCase())
  )[1];

  const onClickEdit = () => {
    dispatch(setEditToggle());
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

  const checkTitle = () => {
    let result: any = "";

    if (reduxTodos.length > 0) {
      result = filteredPercent + "%";
      if (Number.isNaN(filteredPercent)) {
        result = <h4>"현재 탭의 할 일이 존재하지 않습니다"</h4>;
      }
    } else {
      result = <h4>"할 일을 추가해주세요"</h4>;
    }
    return result;
  };
  return (
    <>
      <Header>
        <ToolBar>
          <SetCt>
            <SetGrp>
              <SetIcon $editTg={editTg} onClick={onClickEdit}>
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
          <ThemeModeCt>
            <span>dark</span>
            <ThemeBox $themeMode={themeTg}>
              <ThemeBtn
                onClick={() => {
                  dispatch(setThemeToggle());
                }}
              />
            </ThemeBox>
            <span>light</span>
          </ThemeModeCt>
        </ToolBar>
        <Wrap>
          <DateBox>
            <div>
              <span>{daylist[new Date().getDay()]}</span>
              <span>요일</span>
            </div>
            <div>{<span>{new Date().toLocaleDateString()}</span>}</div>
            <Time />
          </DateBox>
          <Title>{checkTitle()}</Title>
          <BgBar>
            <Bar $percent={filteredPercent} />
          </BgBar>
        </Wrap>
        <TodoInput />
      </Header>
      <div />
      <TodoPage />
    </>
  );
}
