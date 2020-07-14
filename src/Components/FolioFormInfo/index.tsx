import React from "react";
import styled from "styled-components";

const FormInfo = styled.label`
  text-align: left;
  display: block;
  font-size: 1.5rem;
  color: #bf1650;
  font-weight: 200;
`;

const FolioFormInfo = (props: any) => {
  return <FormInfo>{props.children}</FormInfo>;
};

export default FolioFormInfo;
