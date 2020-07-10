import React from 'react';
import styled from 'styled-components'

const Header = styled.div`
    display: flex;
    justify-content: space-between;;

    width: 100%;
    padding: 1 1.5rem;

    font-size: 2em;
`

const FolioDrawerHeader = (props:any) => {
    return(
        <Header>
            {props.children}
        </Header>
    );
}

export default FolioDrawerHeader