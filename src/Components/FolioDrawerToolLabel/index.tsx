import React from "react";
import styled from "styled-components";
import Label from "../FolioDrawerLabel";

const ToolLabel = styled(Label)`
  font-size: 1rem;
  margin: 0;
`;

const FolioDrawerToolLabel = (props: any) => {
  return <ToolLabel>{props.children}</ToolLabel>;
};

export default FolioDrawerToolLabel;
