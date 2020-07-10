import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: none;
    outline: none;
    resize: none;
    border: 0;
    font-family: 'Montserrat',
        sans-serif;
    transition: all .3s;
    border-bottom: 2px solid #bebed2;
    color: #f3f3f3;

    &:focus{
        border-bottom: 2px solid #78788c;
    }
`

const FolioDrawerInput = React.forwardRef((props:any, ref:any) => {
    return (
        <Input ref={ref} {...props} />
    );
});

export default FolioDrawerInput