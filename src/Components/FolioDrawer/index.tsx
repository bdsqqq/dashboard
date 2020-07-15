import React, { useState } from "react";
import { Drawer, Popconfirm } from "antd";

import { db } from "../../firebase";

import "antd/dist/antd.css";

import FolioDrawerForm from "../FolioDrawerForm";

interface FolioDrawerProps {
  visible: boolean;
  onClose: any;
  reFetch: any;
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
  console.log("FolioDrawer reRendered");

  const [tools, setTools] = useState([...props.project.tools]);

  const handleDelete = () => {
    db.collection("projects")
      .doc(props.project?.id)
      .delete()
      .then(() => {
        props.onClose();
        props.reFetch();
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
      <FolioDrawerForm
        tools={tools}
        setTools={setTools}
        project={props.project}
        reFetch={props.reFetch}
      />

      <Popconfirm
        placement="top"
        icon={null}
        title="Deletar esse projeto?"
        okText="Sim"
        cancelText="Não"
        onConfirm={handleDelete}
      >
        <button>Delete</button>
      </Popconfirm>

      <button onClick={() => console.log(tools)}>Print Tools State</button>
    </Drawer>
  );
};

export default FolioDrawer;
