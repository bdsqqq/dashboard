import React from "react";
import styled from "styled-components";
import { FiEdit3 } from "react-icons/fi";

import iconStyles from "../../IconStyles";
import { Project } from "../../project";

const MetaWrapper = styled.div`
  position: absolute;
  right: -5px;
  bottom: -15px;
  width: 95%;
  max-height: 105%;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.25rem;
    height: 0.25rem;
  }

  &::-webkit-scrollbar-track {
    background: #000000;
  }

  &::-webkit-scrollbar-thumb {
    background: #f3f3f3;
  }
`;

const CardWrapper = styled.div`
  position: relative;
  margin: 20px auto;
  height: fit-content;
  width: 95%;
`;
const CardImage = styled.img`
  width: 95%;
  display: block;
  height: auto;
  border-radius: 3px;
  object-fit: cover;
  transition: all 200ms cubic-bezier(0.785, 0.01, 0, 1.415);
`;

const Meta = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  border-radius: 3px;
  padding: 15px 15px 10px;
  width: 95%;
  background: rgba(0, 0, 0, 0.9);

  color: #f2f2f2;
  font-size: 1.6rem;

  overflow: hidden;
`;
const IconContainer = styled.div`
  > * {
    cursor: pointer;

    margin: 0 5px;
  }
`;
const MetaName = styled.div``;

interface FolioCardProps {
  project: Project;

  setVisible: any;
  setCurrentProject: any;
}

function Card(props: FolioCardProps) {
  return (
    <CardWrapper>
      <CardImage
        src={props.project.img}
        alt={"Imagem do projeto " + props.project.name}
      />
      <MetaWrapper>
        <Meta>
          <MetaName>{props.project.name}</MetaName>
          <IconContainer>
            <FiEdit3
              style={iconStyles as React.CSSProperties}
              onClick={() => {
                props.setCurrentProject(props.project);
                props.setVisible(true);
              }}
            />
          </IconContainer>
        </Meta>
        <span></span>
      </MetaWrapper>
    </CardWrapper>
  );
}

export default Card;
