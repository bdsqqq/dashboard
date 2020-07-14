import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import { db } from "../../firebase";

import iconStyles from "../../IconStyles";

import Form from "../Form";
import FormInfo from "../FolioFormInfo";
import ButtonCreate from "../FolioFormButtonCreate";
import Input from "../FolioFormInput";

const FormWrap = styled.div`
  max-width: 800px;
  margin: 8rem 8rem 4rem;
  height: 20vh;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-flow: nowrap;
  align-items: center;
`;

const FolioFormWrap = (props: any) => {
  const { setCurrentProject, setVisible } = props;
  const [formInfo, setFormInfo] = useState("");

  const inputRef: React.MutableRefObject<any | undefined> = useRef(); //type is any beacuse i'm using StyledComponents and HTMLInputElement doesn't work. <StyledComponent<Input, any, {}, never> doesn't work either

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (inputRef.current.value === "") return;

    let newProject = {
      id: inputRef.current.value,
      ano: "",
      demo: "",
      img:
        "https://images.unsplash.com/photo-1508182314998-3bd49473002f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=60",
      projeto: "",
      role: "",
      source: "",
      tools: [""],
      order: "0",
    };

    db.collection("projects")
      .doc(inputRef.current.value)
      .set(newProject)
      .then((res) => {
        setCurrentProject(newProject);
        setVisible(true);
        setFormInfo("");
      })
      .catch((err) => {
        setFormInfo("Houve um erro inesperado, tente novamente");
      });
  };

  return (
    <FormWrap>
      <Form onSubmit={onSubmit}>
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
        <FormInfo>{formInfo}</FormInfo>
        <input
          type={"button"}
          onClick={() => {
            setFormInfo("Houve um erro inesperado, tente novamente");
          }}
          value={"Test feature"}
        />
      </Form>
    </FormWrap>
  );
};

export default FolioFormWrap;
