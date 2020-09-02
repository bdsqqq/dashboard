import React, { useState } from "react";
import { Drawer, message } from "antd";

import useResizer from "../../hooks/useResizer";

import { db } from "../../firebase";

import "antd/dist/antd.css";

import FolioDrawerForm from "../FolioDrawerForm";
import { Project } from "../../project";

interface FolioDrawerProps {
  visible: boolean;
  onClose: any;
  reFetch: any;
  project: Project;
}

const FolioDrawer = (props: FolioDrawerProps) => {
  const isMobile = useResizer();

  const [tools, setTools] = useState([...props.project.tools]);

  const handleDelete = () => {
    db.collection("projects")
      .doc(props.project?.id)
      .delete()
      .then(() => {
        props.onClose();
        props.reFetch();
        message.success("Documento deletado com sucesso!");
      })
      .catch((error) => {
        message.error("Ocorreu um erro inesperado");
        console.log(error);
      });
  };

  return (
    <Drawer
      width={isMobile ? "90%" : "40%"}
      placement="right"
      closable={false}
      onClose={props.onClose}
      visible={props.visible}
      style={{ backgroundColor: "rgba(0, 0, 0, 0.7)" }}
      drawerStyle={{ backgroundColor: "#222" }}
    >
      <FolioDrawerForm
        tools={tools}
        setTools={setTools}
        project={props.project}
        reFetch={props.reFetch}
        handleDelete={handleDelete}
        closeDrawer={props.onClose}
      />
    </Drawer>
  );
};

export default FolioDrawer;
