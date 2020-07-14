import React, { useState, useEffect } from "react";
import { db } from "../../firebase";

import CardContainer from "../FolioCardContainer";

import FormWrap from "../FolioFormWrap";

import Card from "../FolioCard";
import Loader from "../LoaderFolioCard";
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
  }, []); //dep is an empty array so this effect will be called only once

  const onClose = () => {
    setVisible(false);
  };

  return (
    <>
      <FormWrap setCurrentProject={setCurrentProject} setVisible={setVisible} />

      <CardContainer>
        {isLoaded === false ? (
          <>
            {" "}
            <Loader /> <Loader /> <Loader />
          </>
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
        />
      )}
    </>
  );
}

export default Folio;
