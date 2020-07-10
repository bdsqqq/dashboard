import React from "react";
import styled from "styled-components";

const ToolHeader = styled.div`
  flex: 1;

  display: flex;
  justify-content: space-between;
  align-items: center;

  margin: 5px;
`;

const FolioDrawerToolHeader = (props: any) => {
  return <ToolHeader>{props.children}</ToolHeader>;
};

export default FolioDrawerToolHeader;
