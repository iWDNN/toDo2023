import React from "react";
import styled from "styled-components";

const Ct = styled.div`
  width: 100%;
  display: inline-block;
  form {
    width: 100%;
    input {
      padding: 5px;
      width: 80%;
      outline: none;
      border: 2px solid #eee;
    }
  }
`;
export default function Form() {
  return (
    <Ct>
      <form>
        <input placeholder="할 일 추가" />
      </form>
    </Ct>
  );
}
