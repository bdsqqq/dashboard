import React from 'react';
import styled from 'styled-components';
import { FiEdit3, FiInfo } from 'react-icons/fi'
import { Drawer } from 'antd';

import useDynamicRefs from '../../hooks/useDynamicRefs'

import 'antd/dist/antd.css';

interface FolioDrawerProps {
    visible: boolean;
    onClose: any;
    flipIsEditable: any;
    isEditable: boolean | undefined;
    project?: {
        id: string;
        ano: string;
        demo: string;
        img: string;
        projeto: string;
        role: string;
        source: string;
        tools: string[];
    }
}

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;

    height: 100%;
    width: 100%;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;;

    width: 100%;
    padding: 1 1.5rem;

    font-size: 2em;
`
const Body = styled.div`
    margin: 1em;
    padding: 2em;

    background-color: #8f8f8f;
`
const Form = styled.form`
    max-width: 700px;
    margin: 0 auto;
`
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
const Label = styled.label`
    line-height: 2;
    text-align: left;
    display: block;
    margin-bottom: 13px;
    margin-top: 20px;
    color: white;
    font-size: 14px;
    font-weight: 200;
`
const FakeInput = styled.p`
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    background: none;
    border: 0;
    font-family: 'Montserrat',
        sans-serif;
    border-bottom: 2px solid #bebed2;
    color: #f3f3f3;
`
const FolioDrawer = (props: FolioDrawerProps) => {
    const [getRef, setRef] = useDynamicRefs();

    return (
        <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={props.onClose}
            visible={props.visible}
        >
            <Wrapper>
                {props.isEditable
                    ? <>
                        <Header>
                            <span>Edição Habilitada</span>
                            <FiInfo style={{ cursor: "pointer", height: "1em", top: ".125em", position: "relative", }} onClick={props.flipIsEditable} />
                        </Header>
                        <Body>
                            <Label>Id</Label>
                            <Input type="text"/>

                            <Label>Projeto</Label>
                            <Input type="text"/>

                            <Label>Demo link</Label>
                            <Input type="text"/>

                            <Label>Source Link (vazio se privado)</Label>
                            <Input type="text"/>

                            <Label>Img Link</Label>
                            <Input type="text"/>

                            <Label>Ano</Label>
                            <Input type="text"/>

                            <Label>Role</Label>
                            <Input type="text"/>

                            

                        </Body>
                    </> : <>
                        <Header>
                            <span>Edição Desabilitada</span>
                            <FiEdit3 style={{ cursor: "pointer", height: "1em", top: ".125em", position: "relative", }} onClick={props.flipIsEditable} />
                        </Header>
                        <Body>
                            <Label>Id</Label>
                            <FakeInput>{props.project?.id}</FakeInput>

                            <Label>Projeto</Label>
                            <FakeInput>{props.project?.projeto}</FakeInput>

                            <Label>Demo link</Label>
                            <FakeInput>{props.project?.demo}</FakeInput>

                            <Label>Source Link (vazio se privado)</Label>
                            <FakeInput>{props.project?.source}</FakeInput>
                            
                            <Label>Img Link</Label>
                            <FakeInput>{props.project?.img}</FakeInput>

                            <Label>Ano</Label>
                            <FakeInput>{props.project?.ano}</FakeInput>

                            <Label>Role</Label>
                            <FakeInput>{props.project?.role}</FakeInput>

                            { props.project?.tools.map(tool => (
                                <span>{ tool + props.project?.tools.indexOf(tool) }</span>
                            )) }

                        </Body>
                    </>
                }
            </Wrapper>
        </Drawer>
    );
}

export default FolioDrawer