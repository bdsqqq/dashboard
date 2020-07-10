import React from 'react';
import styled from 'styled-components';

const ToolRemoveButton = styled.span`
  font-size: 1.5em;
  color: #bf1650;

  opacity: 0.5;
  transition: 200ms ease-in all;

  &:hover {
    opacity: 1;
  }
`;

const FolioDrawerToolRemoveButton = (props:any) => {
    return (
        <ToolRemoveButton>
            {props.children}
        </ToolRemoveButton>
    );
}

export default FolioDrawerToolRemoveButton