import React, { useRef } from "react";
import { message, Popconfirm } from "antd";

import { db } from "../../firebase";

import useObjIsEmpty from "../../hooks/useObjIsEmpty";
import useCompareArrays from "../../hooks/useCompareArrays";

import Form from "../Form";

import Label from "../FolioDrawerLabel";
import Input from "../FolioDrawerInput";

import FakeInput from "../FolioDrawerFakeInput";
import Tools from "../FolioDrawerFormTools";

import Button from "../Button";

const postChangesToDataBase = async (
  changes: object,
  projectId: string,
  closeDrawer: any
) => {
  let projectRef = db.collection("projects").doc(projectId);

  return projectRef
    .update(changes)
    .then(() => {
      message.success("Documento atualizado com sucesso!");
      closeDrawer();
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      // The document probably doesn't exist.
      message.success("Occorreu um erro inesperado.");
      console.error("Error updating document: ", error);
    });
};

const FolioDrawerForm = (props: any) => {
  const { tools, setTools } = props;

  const objIsEmpty = useObjIsEmpty();
  const arraysAreEqual = useCompareArrays();

  const refs = {
    refName: useRef<any>(),
    refDemo: useRef<any>(),
    refSource: useRef<any>(),
    refImg: useRef<any>(),
    refYear: useRef<any>(),
    refOrder: useRef<any>(),
    refRole: useRef<any>(),
    refHeight: useRef<any>(),
  };

  const returnChangesOnProject = (
    refs: any,
    currentTools: string[],
    defaultTools: string[]
  ) => {
    let tempChanges: any = {};
    Object.entries(refs).forEach(([refKey, refValue]: any) => {
      if (refValue.current.value !== refValue.current.defaultValue) {
        tempChanges[refValue.current.name] = refValue.current.value;
        //console.log(refKey, "added");
      }
    });
    if (!arraysAreEqual(currentTools, defaultTools)) {
      tempChanges["tools"] = currentTools;
      //console.log("tool Changes", tempChanges["tools"]);
    }
    return tempChanges;
  };

  const updateDBifTheresChanges = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let changes: any = {};
    changes = returnChangesOnProject(refs, tools, props.project.tools);

    if (!objIsEmpty(changes)) {
      postChangesToDataBase(changes, props.project?.id, props.closeDrawer);
      props.reFetch();
    } else {
      message.warning("Não foram feitas mudanças");
    }
  };

  return (
    <Form onSubmit={updateDBifTheresChanges}>
      <Label>Id</Label>
      <FakeInput>{props.project?.id}</FakeInput>

      <Label>Name</Label>
      <Input
        name="name"
        defaultValue={props.project?.name}
        ref={refs.refName}
        id="inputName"
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
      <Label>Year</Label>
      <Input
        name="year"
        defaultValue={props.project?.year}
        ref={refs.refYear}
        id="inputYear"
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
      <Label>Height</Label>
      <Input
        name="height"
        defaultValue={props.project?.height}
        ref={refs.refHeight}
        id="inputHeight"
        type="text"
      />
      <Label>Tools</Label>
      <Tools tools={tools} setTools={setTools} />

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
        }}
      >
        <Button
          text="Salvar!"
          type="submit"
          color="#00ad7c"
          textColor="#f3f3f3"
        />
        <Popconfirm
          placement="top"
          icon={null}
          title="Deletar esse projeto?"
          okText="Sim"
          cancelText="Não"
          onConfirm={props.handleDelete}
        >
          <a href="#deletarProjeto">
            <Button
              text="Deletar Projeto"
              type="button"
              color="#bf1650"
              textColor="#f3f3f3"
            />
          </a>
        </Popconfirm>
      </div>
    </Form>
  );
};

export default FolioDrawerForm;
