import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FiPlus } from "react-icons/fi";
import { db } from "../../firebase";

import iconStyles from "../../IconStyles";

import Form from "../Form";

const FormWrap = styled.div`
  max-width: 800px;
  margin: 8rem 8rem 4rem;
  height: 20vh;
`;

const FormInfo = styled.label`
  text-align: left;
  display: block;
  font-size: 1.5rem;
  color: #bf1650;
  font-weight: 200;
`;
const InputWrapper = styled.div`
  display: flex;
  flex-flow: nowrap;
  align-items: center;
`;
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
const ButtonCreate = styled.button`
  cursor: pointer;

  display: flex;
  flex-flow: nowrap;
  align-items: center;

  height: 1.8em;
  text-align: center;
  color: #00ad7c;
  font-size: 3em;
  border: none;

  background-color: #00000000;
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
          <InputNewId
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
