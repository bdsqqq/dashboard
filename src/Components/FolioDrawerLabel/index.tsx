import React from 'react';
import styled from 'styled-components';

const Label = styled.label`
    text-align: left;
    display: block;
    margin-top: 20px;
    color: white;
    font-size: 1.8rem;
    font-weight: 200;
`

const FolioDrawerLabel = (props:any) => {
    return(
        <Label>
            {props.children}
        </Label>
    );
}

export default FolioDrawerLabel