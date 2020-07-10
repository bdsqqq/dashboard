import React from 'react';
import styled from 'styled-components';

const Form = styled.form`
    max-width: 700px;
    margin: 0 auto;
`

const FolioDrawerForm = (props:any) => {
    return (
        <Form onSubmit={props.onSubmit}>
            {props.children}
        </Form>
    );
}

export default FolioDrawerForm