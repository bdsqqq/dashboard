import React from "react";
import styled from "styled-components";

const Tool = styled.div`
  display: flex;
  flex-flow: column nowrap;

  margin: 0.66rem;
`;

const FolioDrawerTool = (props: any) => {
  return <Tool>{props.children}</Tool>;
};

export default FolioDrawerTool;
