import React, { useRef, useState } from "react";
import styled from "styled-components";
import { FiTrash2, FiPlus } from "react-icons/fi";
import { Drawer, Popconfirm } from "antd";

import useObjIsEmpty from "../../hooks/useObjIsEmpty";
import useCompareArrays from "../../hooks/useCompareArrays";
import usePureSplice from "../../hooks/usePureSplice";
import { db } from "../../firebase";

import "antd/dist/antd.css";
import iconStyles from "../../IconStyles";

import Wrapper from "../FolioDrawerWrapper";

import Form from "../FolioDrawerForm";

import Label from "../FolioDrawerLabel";
import Input from "../FolioDrawerInput";
import FakeInput from "../FolioDrawerFakeInput";
import ToolsWrapper from "../FolioDrawerToolsWrapper";

import Tool from "../FolioDrawerTool";

import ToolHeader from "../FolioDrawerToolHeader";
import ToolLabel from "../FolioDrawerToolLabel";
import ToolRemoveButton from "../FolioDrawerToolRemoveButton";
import ToolAddWrapper from "../FolioDrawerToolAddWrapper";

const ToolInput = styled(Input)``;

interface FolioDrawerProps {
  visible: boolean;
  onClose: any;
  project: {
    id: string;
    ano: string;
    demo: string;
    img: string;
    projeto: string;
    role: string;
    source: string;
    tools: string[];
    order: string;
  };
}

const FolioDrawer = (props: FolioDrawerProps) => {
  const objIsEmpty = useObjIsEmpty();
  const pureSplice = usePureSplice();
  const arraysAreEqual = useCompareArrays();

  console.log("FolioDrawer reRendered");

  const refs = {
    refProjeto: useRef<any>(),
    refDemo: useRef<any>(),
    refSource: useRef<any>(),
    refImg: useRef<any>(),
    refAno: useRef<any>(),
    refOrder: useRef<any>(),
    refRole: useRef<any>(),
  };

  const [tools, setTools] = useState([...props.project.tools]);

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

  const handleDelete = () => {
    db.collection("projects")
      .doc(props.project?.id)
      .delete()
      .then(() => {
        console.log("Document successfully deleted!");
      })
      .catch((error) => {
        console.error("Error removing document: ", error);
      });
  };

  return (
    <Drawer
      width={640}
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={props.visible}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      drawerStyle={{ backgroundColor: "#222" }}
    >
      <Wrapper>
        <Form onSubmit={onSubmit}>
          <>
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
          </>
          <Label>Tools</Label>
          <ToolsWrapper>
            {tools.map((val, index) => (
              <Tool key={index}>
                <ToolHeader>
                  <ToolLabel>Tool {(index as number) + 1}</ToolLabel>
                  <ToolRemoveButton>
                    <Popconfirm
                      icon={null}
                      placement="left"
                      title="Deletar essa ferramenta？"
                      okText="Sim"
                      cancelText="Não"
                      onConfirm={() => {
                        const updatedTools = pureSplice(tools, index, 1);
                        setTools(updatedTools);
                      }}
                    >
                      <FiTrash2 style={iconStyles as React.CSSProperties} />
                    </Popconfirm>
                  </ToolRemoveButton>
                </ToolHeader>
                <ToolInput
                  id={`inputTool-${index}`}
                  data-idx={index}
                  type="text"
                  value={val}
                  onChange={(e: any) => {
                    const updatedTools = [...tools];
                    updatedTools[e.target.dataset.idx] = e.target.value;
                    setTools(updatedTools);
                  }}
                />
              </Tool>
            ))}
            <ToolAddWrapper>
              <FiPlus
                style={iconStyles as React.CSSProperties}
                onClick={() => setTools([...tools, ""])}
              />
            </ToolAddWrapper>
          </ToolsWrapper>

          <button type="submit">Hej Do</button>
        </Form>
        <Popconfirm
          placement="left"
          icon={null}
          title="Deletar esse projeto?"
          okText="Sim"
          cancelText="Não"
          onConfirm={handleDelete}
        >
          <button>Delete</button>
        </Popconfirm>

        <button onClick={() => console.log(tools)}>Print Tools State</button>
      </Wrapper>
    </Drawer>
  );
};

export default FolioDrawer;
