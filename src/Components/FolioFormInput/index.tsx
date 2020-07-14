import React from "react";
import styled from "styled-components";

const InputNewId = styled.input`
  width: 100%;
  border: none;
  border-bottom: 2px solid #bebed2;
  padding: 5px;
  height: 1.8em;
  outline: none;
  font-size: 2em;
  transition: 200ms ease-in all;

  &:focus {
    border-bottom: 2px solid #78788c;
  }
`;

const FolioFormInput = React.forwardRef((props: any, ref: any) => {
  return <InputNewId ref={ref} {...props} />;
});

export default FolioFormInput;
