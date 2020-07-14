import React from "react";
import styled from "styled-components";

const ButtonCreate = styled.button`
  cursor: pointer;

  display: flex;
  flex-flow: nowrap;
  align-items: center;

  height: 1.8em;
  text-align: center;
  color: #00ad7c;
  font-size: 3em;
  border: none;

  background-color: #00000000;
`;

const FolioFormButtonCreate = (props: any) => {
  return <ButtonCreate type={props.type}>{props.children}</ButtonCreate>;
};

export default FolioFormButtonCreate;
