import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi'

import { db } from '../../firebase';

import Card from '../FolioCard';
import Loader from '../LoaderFolioCard';
import FolioDrawer from '../FolioDrawer';

import iconStyles from '../../IconStyles'

const breakpoints = [48, 64]

const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}em)`
)

const FormWrap = styled.div`
    width: 30%;
    margin: 8rem 8rem 4rem;
    height: 10vh;
`
const Form = styled.form`
    display: flex;
    width: 100%;
`
const InputNewId = styled.input`
    width: 100%;
    border: none;
    border-bottom: 2px solid #bebed2;
    padding: 5px;
    height: 1.8em;
    outline: none;
    font-size: 2em;
    transition: 200ms ease-in all;

    
    &:focus{
        border-bottom: 2px solid #78788c;
    }
`
const ButtonCreate = styled.button`
    cursor: pointer;

    width: 1.8em;
    height: 1.8em;
    text-align: center;
    color: #00ad7c;
    font-size: 2em;
    border: none;

    background-color: #00000000;
`
const CardContainer = styled.div`
    width: 100%;
    min-height: 24rem;
    height: auto;
    margin: 0 auto;
    padding: 0 8em;

    display: flex;
    flex-wrap: wrap;

    grid-template-columns: repeat(auto-fit, minmax(8rem, 24rem));

    @supports (display: grid) {
        display: grid;
        grid-gap: 2rem;

        ${mq[0]}{
            grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
        }
    }
`

interface Project{
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

function Folio() {
    const [visible, setVisible] = useState<boolean>(false);
    const [isEditable, setIsEditable] = useState<boolean | undefined>()
    const [currentProject, setCurrentProject] = useState<Project>();
    const [isLoaded, setIsloaded] = useState(false);

    const inputRef:React.MutableRefObject<any | undefined> = useRef();//type is any beacuse i'm using StyledComponents and HTMLInputElement doesn't work. <StyledComponent<Input, any, {}, never> doesn't work either

    const [projects, setProjects] = useState<Project[]>([]) //creates a state variable called projects and a method to update it

    useEffect(() => {
        db.collection("projects")
        .orderBy("order", "asc")
        .get()
        .then((snapshot) => {
            let projects:Project[] = [];
            snapshot.forEach(doc => projects.push({...doc.data() as Project}));
            setProjects( projects );
            setIsloaded(true);
            console.log(projects, "fetched projects");
        })
    }, []); //dep is an empty array so this effect will be called only once

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(inputRef.current.value === '') return;
        
        db.collection('projects').doc(inputRef.current.value).set({
            id: inputRef.current.value,
            ano: "",
            demo: "",
            img: "",
            projeto: "",
            role: "",
            source: "",
            tools: [
                "",
            ],
            order: "0",
        })
        .then(res => {
            console.log(res)
        })
        .catch(err => console.log(err));
    }

    const onClose = () =>{
        setVisible(false);
    }

    return (
        <>
            <FormWrap>
                <Form onSubmit={onSubmit}>
                    <InputNewId
                        type="text"
                        name="newId"
                        placeholder="Cadastre um Projeto..."
                        ref={inputRef}
                    />
                    <ButtonCreate type="submit"><FiArrowRight style={iconStyles as React.CSSProperties} /></ButtonCreate>
                </Form>
            </FormWrap>
            

            <CardContainer>
                {isLoaded === false ? <> <Loader />  <Loader />  <Loader /></> :
                    projects.map(project => (
                        <Card
                            key={project.id}
                            project={project}

                            setIsEditable={setIsEditable}
                            setVisible={setVisible}
                            setCurrentProject={setCurrentProject}
                        />
                    ))
                }
            </CardContainer>
            
            {currentProject !== undefined &&
            <FolioDrawer 
                visible={visible} 
                onClose={onClose}
                isEditable={isEditable}
                flipIsEditable={() => setIsEditable(!isEditable)} 
                project={currentProject} 
            />
            }
        </>
    );
}

export default Folio