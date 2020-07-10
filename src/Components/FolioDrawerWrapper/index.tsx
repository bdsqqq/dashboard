import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
`

const FolioDrawerWrapper = (props:any) => {
    
    return (
        <Wrapper>
            {props.children}
        </Wrapper>
    );
}

export default FolioDrawerWrapper