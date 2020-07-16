import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
  display: flex;
  flex-flow: wrap;
  align-items: center;
`;

const FolioFormInputWrapper = (props: any) => {
  return <InputWrapper>{props.children}</InputWrapper>;
};

export default FolioFormInputWrapper;
