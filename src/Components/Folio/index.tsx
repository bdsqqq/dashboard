import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { db } from "../../firebase";

import CardContainer from "../FolioCardContainer";

import FormWrap from "../FolioFormWrap";

import Card from "../FolioCard";
import FolioDrawer from "../FolioDrawer";

interface Project {
  id: string;
  ano: string;
  demo: string;
  img: string;
  projeto: string;
  role: string;
  source: string;
  tools: string[];
  order: string;
}

function Folio() {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project>();
  const [isLoaded, setIsloaded] = useState(false);
  const [updateProjects, setUpdateProjects] = useState(0);

  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    db.collection("projects")
      .orderBy("order", "asc")
      .get()
      .then((snapshot) => {
        let projects: Project[] = [];
        snapshot.forEach((doc) =>
          projects.push({ ...(doc.data() as Project) })
        );
        setProjects(projects);
        setIsloaded(true);
        console.log(projects, "fetched projects");
      });
  }, [updateProjects]);

  const onClose = () => {
    setVisible(false);
    setCurrentProject(undefined);
  };

  const reFetch = () => {
    setUpdateProjects(updateProjects + 1);
  };

  return (
    <>
      <FormWrap
        reFetch={reFetch}
        setCurrentProject={setCurrentProject}
        setVisible={setVisible}
      />

      <CardContainer>
        {isLoaded === false ? (
          <Spin />
        ) : (
          projects.map((project) => (
            <Card
              key={project.id}
              project={project}
              setVisible={setVisible}
              setCurrentProject={setCurrentProject}
            />
          ))
        )}
      </CardContainer>

      {currentProject !== undefined && (
        <FolioDrawer
          visible={visible}
          onClose={onClose}
          project={currentProject}
          reFetch={reFetch}
        />
      )}
    </>
  );
}

export default Folio;
