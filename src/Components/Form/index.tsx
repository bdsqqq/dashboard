import React from "react";
import styled from "styled-components";

const Form = styled.form`
  width: 100%;
  padding: 2em;
`;

const FormComponentBase = (props: any) => {
  return <Form onSubmit={props.onSubmit}>{props.children}</Form>;
};

export default FormComponentBase;
