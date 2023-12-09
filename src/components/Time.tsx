import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";

const blink = keyframes`
to {
    visibility: hidden;
  }
`;
const Container = styled.div`
  width: 120px;
  display: grid;
  grid-template-columns: 20% 80%;
  align-items: center;
  /* border: 2.5px solid ${(props) => props.theme.textColor}; */
  border-radius: 3px;
  background-color: ${(props) => props.theme.textColor};
  color: ${(props) => props.theme.bgColor};
  overflow: hidden;
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
    padding: 2px;
    font-size: 30px;
    font-family: "Audiowide", sans-serif;
    & > span {
      animation: ${blink} 1s steps(5, start) infinite;
    }
  }
`;

export default function Time() {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const testInterval = setInterval(() => {
      setTime(new Date().getTime());
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
