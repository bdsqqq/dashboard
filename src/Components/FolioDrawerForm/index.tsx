import React from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  padding: 2em;
`;

const FolioDrawerForm = (props: any) => {
  return <Form onSubmit={props.onSubmit}>{props.children}</Form>;
};

export default FolioDrawerForm;
