import React from 'react';
import styled from 'styled-components';

const Body = styled.div`
    margin: 1em;
    padding: 2em;
`

const FolioDrawerBody = (props:any) => {
    return(
        <Body>
            {props.children}
        </Body>
    );
}

export default FolioDrawerBody