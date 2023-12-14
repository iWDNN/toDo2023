import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import { useAppDispatch } from "../redux/hooks";
import { RESET_PERIOD } from "../type";
import {
  checkEmptyArr,
  dateInitialState,
  getLS,
  autoTodoReset,
  setLS,
} from "../utils";

const blink = keyframes`
to {
    visibility: hidden;
  }
`;
const Container = styled.div`
  width: 130px;
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  border-radius: 3px;
  color: ${(props) => props.theme.textColor};
  overflow: hidden;
  padding: 2px 4px;
  margin: 10px 0 5px 0;
  & > div:nth-child(1) {
    place-self: center;
    display: flex;
    flex-direction: column;
    span {
      height: 10px;
      font-size: 12px;
      text-align: start;
      &:last-child {
        margin-top: 3px;
      }
    }
  }
  & > div:nth-child(2) {
    place-self: center;
    display: flex;
    align-items: center;
    font-size: 30px;
    font-family: "Audiowide", sans-serif;
    & > span {
      animation: ${blink} 1s steps(5, start) infinite;
    }
  }
`;

export default function Time() {
  const dispatch = useAppDispatch();
  const [time, setTime] = useState(0);
  useEffect(() => {
    const testInterval = setInterval(() => {
      setTime(new Date().getTime());
      // if (checkEmptyArr(getLS(RESET_PERIOD)) || !getLS(RESET_PERIOD)) {
      //   setLS(RESET_PERIOD, dateInitialState);
      // } else {
      //   autoTodoReset(dispatch, getLS(RESET_PERIOD));
      // }
      return () => clearInterval(testInterval);
    }, 1000);
  }, []);
  const showHours = (time: number) => {
    const hour = new Date(time).getHours();
    return String(hour > 12 ? hour - 12 : hour).padStart(2, "0");
  };
  return (
    <Container>
      <div>
        <span>{new Date().getHours() < 12 && "AM"}</span>
        <span>{new Date().getHours() >= 12 && "PM"}</span>
      </div>
      <div>
        {showHours(time)}
        <span>:</span>
        {String(new Date(time).getMinutes()).padStart(2, "0")}
      </div>
    </Container>
  );
}
