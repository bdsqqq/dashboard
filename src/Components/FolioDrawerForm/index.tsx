import React, { useRef } from "react";

import { db } from "../../firebase";

import useObjIsEmpty from "../../hooks/useObjIsEmpty";
import useCompareArrays from "../../hooks/useCompareArrays";

import Form from "../Form";

import Label from "../FolioDrawerLabel";
import Input from "../FolioDrawerInput";

import FakeInput from "../FolioDrawerFakeInput";
import Tools from "../FolioDrawerFormTools";

const FolioDrawerForm = (props: any) => {
  const { tools, setTools } = props;

  const objIsEmpty = useObjIsEmpty();
  const arraysAreEqual = useCompareArrays();

  const refs = {
    refProjeto: useRef<any>(),
    refDemo: useRef<any>(),
    refSource: useRef<any>(),
    refImg: useRef<any>(),
    refAno: useRef<any>(),
    refOrder: useRef<any>(),
    refRole: useRef<any>(),
  };

  const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let changes: any = {};

    Object.entries(refs).map(([refKey, refValue]: any) => {
      if (refValue.current.value !== refValue.current.defaultValue) {
        changes[refValue.current.name] = refValue.current.value;
        console.log(refKey, "added");
      }
    });

    if (!arraysAreEqual(tools, props.project.tools)) {
      changes["tools"] = tools;
    }

    if (!objIsEmpty(changes)) {
      let projectRef = db.collection("projects").doc(props.project?.id);

      return projectRef
        .update(changes)
        .then(() => {
          console.log("Document successfully updated!");
        })
        .catch((error) => {
          // The document probably doesn't exist.
          console.error("Error updating document: ", error);
        });
    } else {
      console.log("não houve mudança");
    }
  };

  return (
    <Form onSubmit={onSubmit}>
      <Label>Id</Label>
      <FakeInput>{props.project?.id}</FakeInput>

      <Label>Projeto</Label>
      <Input
        name="projeto"
        defaultValue={props.project?.projeto}
        ref={refs.refProjeto}
        id="inputProjeto"
        type="text"
      />
      <Label>Demo link</Label>
      <Input
        name="demo"
        defaultValue={props.project?.demo}
        ref={refs.refDemo}
        id="inputDemo"
        type="text"
      />
      <Label>Source Link (vazio se privado)</Label>
      <Input
        name="source"
        defaultValue={props.project?.source}
        ref={refs.refSource}
        id="inputSource"
        type="text"
      />
      <Label>Img Link</Label>
      <Input
        name="img"
        defaultValue={props.project?.img}
        ref={refs.refImg}
        id="inputLink"
        type="text"
      />
      <Label>Ano</Label>
      <Input
        name="ano"
        defaultValue={props.project?.ano}
        ref={refs.refAno}
        id="inputAno"
        type="text"
      />
      <Label>Order</Label>
      <Input
        name="order"
        defaultValue={props.project?.order}
        ref={refs.refOrder}
        id="inputOrder"
        type="text"
      />
      <Label>Role</Label>
      <Input
        name="role"
        defaultValue={props.project?.role}
        ref={refs.refRole}
        id="inputRole"
        type="text"
      />
      <Label>Tools</Label>
      <Tools tools={tools} setTools={setTools} />

      <button type="submit">Hej Do</button>
    </Form>
  );
};

export default FolioDrawerForm;
