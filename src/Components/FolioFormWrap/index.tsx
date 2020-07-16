import React, { useRef } from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import { db } from "../../firebase";
import { message } from "antd";

import iconStyles from "../../IconStyles";

import Form from "../Form";
import InputWrapper from "../FolioFormInputWrapper";
import ButtonCreate from "../FolioFormButtonCreate";
import Input from "../FolioFormInput";

const breakpoints = [48, 64];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}em)`);

const FormWrap = styled.div`
  max-width: 800px;
  margin: 2rem auto;
  height: 20vh;

  ${mq[0]} {
    margin: 8rem 8rem 4rem;
  }
`;

const createNewProject = (id: string) => {
  return {
    id: id,
    ano: "",
    demo: "",
    img:
      "https://images.unsplash.com/photo-1508182314998-3bd49473002f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=60",
    projeto: id,
    role: "",
    source: "",
    tools: [""],
    order: "0",
  };
};

const FolioFormWrap = (props: any) => {
  const { setCurrentProject, setVisible } = props;

  const inputRef: React.MutableRefObject<any | undefined> = useRef(); //type is any beacuse i'm using StyledComponents and HTMLInputElement doesn't work. <StyledComponent<Input, any, {}, never> doesn't work either

  const createProjectOnDb = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current.value === "") {
      message.warn("O projeto precisa de um nome...");
      return;
    }

    let newProject = createNewProject(inputRef.current.value);

    db.collection("projects")
      .doc(inputRef.current.value)
      .set(newProject)
      .then((res) => {
        props.reFetch();
        setCurrentProject(newProject);
        setVisible(true);
        message.success("Projeto criado com sucesso!");
      })
      .catch((err) => {
        message.error("Houve um erro inesperado, tente novamente");
      });
  };

  return (
    <FormWrap>
      <Form onSubmit={createProjectOnDb}>
        <InputWrapper>
          <Input
            type="text"
            name="newId"
            placeholder="Adicione um Projeto..."
            ref={inputRef}
          />
          <ButtonCreate type="submit">
            <FiPlus style={iconStyles as React.CSSProperties} />
          </ButtonCreate>
        </InputWrapper>
      </Form>
    </FormWrap>
  );
};

export default FolioFormWrap;
