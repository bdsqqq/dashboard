import React from "react";
import styled from "styled-components";

const FakeInput = styled.p`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: none;
  border: 0;
  font-family: "Montserrat", sans-serif;
  border-bottom: 2px solid #bebed2;
  color: #f3f3f3;
`;

const FolioDrawerFakeInput = (props: any) => {
  return <FakeInput>{props.children}</FakeInput>;
};

export default FolioDrawerFakeInput;
