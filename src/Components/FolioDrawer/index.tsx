import React, { useRef } from 'react';
import styled from 'styled-components';
import { FiEdit3, FiInfo } from 'react-icons/fi'
import { Drawer } from 'antd';

import useDynamicRefs from '../../hooks/useDynamicRefs'
import useObjIsEmpty from '../../hooks/useObjIsEmpty'
import { db } from '../../firebase'

import 'antd/dist/antd.css';

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
const ToolsWrapper = styled.div`
    width: 100%;
    padding: 10px -1em;
    margin: -1em auto 0;
`
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
        order: string;
    }
}

const FolioDrawer = (props: FolioDrawerProps) => {
    const [getRef, setRef] = useDynamicRefs();
    const objIsEmpty = useObjIsEmpty();
    //const refProjeto = useRef<any>();
    //const refDemo = useRef<any>();
    //const refSource = useRef<any>();
    //const refImg = useRef<any>();
    //const refAno = useRef<any>();
    //const refOrder = useRef<any>();
    //const refRole = useRef<any>();

    const refs = {
        refProjeto : useRef<any>(),
        refDemo : useRef<any>(),
        refSource : useRef<any>(),
        refImg : useRef<any>(),
        refAno : useRef<any>(),
        refOrder : useRef<any>(),
        refRole : useRef<any>(),
    }

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        //console.log(refs.refProjeto.current.value);
       // Object.entries(refs).map(([refName, ref]:any) => console.log(refName, ref.current.value));

        //Logica criar o objeto de update
        let changes: any = {};

        Object.entries(refs).map(([refName, ref]:any) => {
            if(ref.current.value != ref.current.defaultValue){
                changes[ref.current.name] = ref.current.value
                console.log(refName, "added")
            }
        });

        if(!objIsEmpty(changes)){
            let projectRef = db.collection("projects").doc(props.project?.id);

            return projectRef.update(changes).then(() => {
                console.log("Document successfully updated!");
            })
            .catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        } else {
            console.log('não houve mudança')
        }
    }
    
    const handleDelete = () => {
        db.collection("projects").doc(props.project?.id).delete().then(() => {
            console.log("Document successfully deleted!");
        }).catch((error) => {
            console.error("Error removing document: ", error);
        });
    }

    return (
        <Drawer
            width={640}
            placement="right"
            closable={false}
            onClose={props.onClose}
            visible={props.visible}
            style={{backgroundColor: 'rgba(0, 0, 0, 0.7)'}}
            drawerStyle={{backgroundColor: '#222'}}
        >
            <Wrapper>
                {props.isEditable
                    ? <>
                        <Header>
                            <span>Edição Habilitada</span>
                            <FiInfo style={{ cursor: "pointer", height: "1em", top: ".125em", position: "relative", }} onClick={props.flipIsEditable} />
                        </Header>
                        <Body>
                            <Form onSubmit={onSubmit}>
                                <Label>Id</Label>
                                <FakeInput>{props.project?.id}</FakeInput>

                                <Label>Projeto</Label>
                                <Input name="projeto" defaultValue={props.project?.projeto} ref={refs.refProjeto} id="inputProjeto" type="text" />

                                <Label>Demo link</Label>
                                <Input name="demo" defaultValue={props.project?.demo} ref={refs.refDemo} id="inputDemo" type="text" />

                                <Label>Source Link (vazio se privado)</Label>
                                <Input name="source" defaultValue={props.project?.source} ref={refs.refSource} id="inputSource" type="text" />

                                <Label>Img Link</Label>
                                <Input name="img" defaultValue={props.project?.img} ref={refs.refImg} id="inputLink" type="text" />

                                <Label>Ano</Label>
                                <Input name="ano" defaultValue={props.project?.ano} ref={refs.refAno} id="inputAno" type="text" />

                                <Label>Order</Label>
                                <Input name="order" defaultValue={props.project?.order} ref={refs.refOrder} id="inputOrder" type="text" />

                                <Label>Role</Label>
                                <Input name="role" defaultValue={props.project?.role} ref={refs.refRole} id="inputRole" type="text" />

                                <Label>Tools</Label>
                                <ToolsWrapper>
                                {props.project?.tools.map(tool => (
                                    <React.Fragment key={props.project?.tools.indexOf(tool)}>
                                        <Label>Tool {props.project?.tools.indexOf(tool) as number + 1}</Label>
                                        <Input id={`inputTool${props.project?.tools.indexOf(tool)}`} type="text" defaultValue={tool} />
                                    </React.Fragment>
                                ))}
                                </ToolsWrapper>

                                <button type="submit">Hej Do</button>
                            </Form>
                                <button onClick={handleDelete}>Delete</button>
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

                            <Label>Order</Label>
                            <FakeInput>{props.project?.order}</FakeInput>

                            <Label>Role</Label>
                            <FakeInput>{props.project?.role}</FakeInput>

                            <Label>Tools</Label>
                            <ToolsWrapper>
                                {props.project?.tools.map(tool => (
                                    <React.Fragment key={props.project?.tools.indexOf(tool)}>
                                        <Label>Tool {props.project?.tools.indexOf(tool) as number + 1}</Label>
                                        <FakeInput>{tool}</FakeInput>
                                    </React.Fragment>
                                ))}
                            </ToolsWrapper>
                        </Body>
                    </>
                }
            </Wrapper>
        </Drawer>
    );
}

export default FolioDrawer