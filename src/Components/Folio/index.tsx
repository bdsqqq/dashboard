import React, { useState, useEffect } from "react";
import { Spin } from "antd";
import { db } from "../../firebase";

import CardContainer from "../FolioCardContainer";

import FormWrap from "../FolioFormWrap";

import Card from "../FolioCard";
import FolioDrawer from "../FolioDrawer";

import { Project } from "../../project";

function Folio() {
  const [visible, setVisible] = useState<boolean>(false);
  const [currentProject, setCurrentProject] = useState<Project>();
  const [isLoaded, setIsloaded] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const FetchProjects = () => {
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
        //console.log(projects, "fetched projects");
      });
  };

  useEffect(() => {
    FetchProjects();
  }, []);

  const onClose = () => {
    setVisible(false);
    setCurrentProject(undefined);
  };

  const reFetch = () => {
    FetchProjects();
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
