import React from 'react';
import styled from 'styled-components';

const ToolAddWrapper = styled.div`
    display: flex;
    align-items: center;
    
    margin: .66rem;
    font-size: 3em;
    color: #00ad7c;

    > * {
        opacity: 0.5;
        transition: 200ms ease-in all;

        &:hover{
            opacity: 1;
        }
    }
`

const FolioDrawerToolAddWrapper = (props:any) => {
    return (
        <ToolAddWrapper>
            {props.children}
        </ToolAddWrapper>
    );
}

export default FolioDrawerToolAddWrapper