import React from "react";
import styled from "styled-components";

const ToolsWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

  width: 100%;
  padding: 10px -1em;
  margin: -1em auto 0;
`;

const FolioDrawerToolsWrapper = (props: any) => {
  return <ToolsWrapper>{props.children}</ToolsWrapper>;
};

export default FolioDrawerToolsWrapper;
