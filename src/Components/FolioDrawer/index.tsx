import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { FiEdit3, FiInfo, FiTrash2, FiPlus } from 'react-icons/fi'
import { Drawer } from 'antd';

import useObjIsEmpty from '../../hooks/useObjIsEmpty'
import useCompareArrays from '../../hooks/useCompareArrays'
import usePureSplice from '../../hooks/usePureSplice'
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
    text-align: left;
    display: block;
    margin-top: 20px;
    color: white;
    font-size: 1.8rem;
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
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));

    width: 100%;
    padding: 10px -1em;
    margin: -1em auto 0;
`
const ToolWrapper = styled.div`
    display: flex;
    flex-flow: column nowrap;

    margin: .66rem;
`
const ToolHeader = styled.div`
    flex: 1;

    display: flex;
    justify-content: space-between;
    align-items: center;

	margin: 5px;
`
const ToolLabel = styled(Label)`
    font-size: 1rem;
    margin: 0;
`
const ToolRemoveButton = styled.span`
    font-size: 1.5em;
    color: #bf1650;

    opacity: 0.5;
    transition: 200ms ease-in all;

    &:hover{
        opacity: 1;
    }
`
const ToolInput = styled(Input)`
`
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
interface FolioDrawerProps {
    visible: boolean;
    onClose: any;
    flipIsEditable: any;
    isEditable: boolean | undefined;
    project: {
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
    const objIsEmpty = useObjIsEmpty();
    const pureSplice = usePureSplice();
    const arraysAreEqual = useCompareArrays();

    console.log("FolioDrawer reRendered")

    const refs = {
        refProjeto : useRef<any>(),
        refDemo : useRef<any>(),
        refSource : useRef<any>(),
        refImg : useRef<any>(),
        refAno : useRef<any>(),
        refOrder : useRef<any>(),
        refRole : useRef<any>(),
    }

    const [tools, setTools] = useState([...props.project.tools]);

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        let changes: any = {};

        Object.entries(refs).map(([refKey, refValue]:any) => {
            if(refValue.current.value !== refValue.current.defaultValue){
                changes[refValue.current.name] = refValue.current.value
                console.log(refKey, "added")
            }
        });

        if(!arraysAreEqual(tools, props.project.tools)){
            changes["tools"] = tools;
        }

        if(!objIsEmpty(changes)){
            let projectRef = db.collection("projects").doc(props.project?.id);

            return projectRef.update(changes)
                .then(() => {
                    console.log("Document successfully updated!");
                }
            ).catch((error) => {
                // The document probably doesn't exist.
                console.error("Error updating document: ", error);
            });
        } else {
            console.log('não houve mudança')
        }
    }
    
    const handleDelete = () => {
        db.collection("projects").doc(props.project?.id).delete()
        .then(() => {
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
                                <>
                                <Label>Id</Label>
                                <FakeInput>{props.project?.id}</FakeInput>

                                <Label>Projeto</Label>
                                <Input 
                                    name="projeto"
                                    defaultValue={props.project?.projeto}
                                    ref={refs.refProjeto}
                                    id="inputProjeto" type="text" 
                                />
                                <Label>Demo link</Label>
                                <Input 
                                    name="demo"
                                    defaultValue={props.project?.demo}
                                    ref={refs.refDemo}
                                    id="inputDemo" type="text" 
                                />
                                <Label>Source Link (vazio se privado)</Label>
                                <Input 
                                    name="source"
                                    defaultValue={props.project?.source}
                                    ref={refs.refSource}
                                    id="inputSource" type="text" 
                                />
                                <Label>Img Link</Label>
                                <Input 
                                    name="img"
                                    defaultValue={props.project?.img}
                                    ref={refs.refImg}
                                    id="inputLink" type="text" 
                                />
                                <Label>Ano</Label>
                                <Input 
                                    name="ano"
                                    defaultValue={props.project?.ano}
                                    ref={refs.refAno}
                                    id="inputAno" type="text" 
                                />
                                <Label>Order</Label>
                                <Input 
                                    name="order"
                                    defaultValue={props.project?.order}
                                    ref={refs.refOrder}
                                    id="inputOrder" type="text" 
                                />
                                <Label>Role</Label>
                                <Input 
                                    name="role" defaultValue={props.project?.role}
                                    ref={refs.refRole}
                                    id="inputRole" type="text" 
                                />
                                </>
                                <Label>Tools</Label>
                                <ToolsWrapper>
                                {tools.map((val, index) => (
                                    <ToolWrapper key={index}>
                                        <ToolHeader>
                                            <ToolLabel>Tool {index as number + 1}</ToolLabel>
                                            <ToolRemoveButton>
                                                <FiTrash2
                                                    style={{ 
                                                        cursor: "pointer",
                                                        height: "1em",
                                                        top: ".125em",
                                                        position: "relative", 
                                                    }}
                                                    onClick={() => {
                                                        const updatedTools = pureSplice(tools, index, 1);
                                                        setTools(updatedTools);
                                                    }}
                                                />
                                            </ToolRemoveButton>
                                        </ToolHeader>
                                        <ToolInput 
                                            id={`inputTool-${index}`}
                                            data-idx={index}
                                            type="text" 
                                            value={val} 
                                            onChange={(e:any) => {
                                                const updatedTools = [...tools];
                                                updatedTools[e.target.dataset.idx] = e.target.value;
                                                setTools(updatedTools);
                                            }}
                                        />
                                    </ToolWrapper>
                                ))}
                                <ToolAddWrapper>
                                    <FiPlus
                                        style={{ 
                                            cursor: "pointer",
                                            height: "1em",
                                            top: ".125em",
                                            position: "relative", 
                                        }} 
                                        onClick={() => setTools([...tools, ""])}
                                    />
                                </ToolAddWrapper>
                                </ToolsWrapper>

                                <button type="submit">Hej Do</button>
                            </Form>
                                <button onClick={handleDelete}>Delete</button>
                                <button onClick={() => console.log(tools)}>
                                    Print Tools State
                                </button>
                        </Body>
                    </> : <>
                        <Header>
                            <span>Edição Desabilitada</span>
                            <FiEdit3 
                                style={{ 
                                    cursor: "pointer",
                                    height: "1em",
                                    top: ".125em",
                                    position: "relative", 
                                }} 
                                onClick={props.flipIsEditable} />
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
                                {tools.map(tool => (
                                    <React.Fragment key={tools.indexOf(tool)}>
                                        <Label>
                                            Tool {tools.indexOf(tool) as number + 1}
                                        </Label>
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