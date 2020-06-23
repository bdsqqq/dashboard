import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FiArrowRight } from 'react-icons/fi'

import db from '../../firebase';

import Card from '../FolioCard';
import Loader from '../LoaderFolioCard'

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
}

function Folio() {

    const [isLoaded, setIsloaded] = useState(false);
    const [newId, setNewId] = useState<string>('')
    const [projects, setProjects] = useState<Project[]>([]) //creates a state variable called projects and a method to update it

    useEffect(() => {
        db.ref('/projects').on('value', (snapshot) => { //creates a reference to /projects on the firebase db and creates a snapshot on each value change
            let projects:Project[] = [] ; // creates an empty array called projects to store the data from snapshots
            snapshot.forEach(childSnapshot => {
                projects.push({ ...childSnapshot.val(), key: childSnapshot.key }) //adds each value from a snapshot to the projects array
            });
            setProjects(projects) //sets the projects state to be equal to the projects array
            setIsloaded(true);
        })
    }, []); //dep is an empty array so this effect will be called only once

    console.log(projects, "array");

    const onChange = (event:React.ChangeEvent<HTMLInputElement>) => {
        setNewId(event.target.value);
    }

    const onSubmit = (event:React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if(newId === '') return;
        db.ref(`projects/${newId}`).set({
            id: newId,
            ano: "",
            demo: "",
            img: "",
            projeto: "",
            role: "",
            source: "",
            tools: []
        })
        .then(res => {
            console.log('then')
        })
        .catch(err => console.log(err));
    }

    return (
        <>
            <FormWrap>
                <Form onSubmit={onSubmit}>
                    <InputNewId 
                            type="text"
                            name="newId"
                            placeholder="Cadastre um Projeto..."
                            value={newId}
                            onChange={onChange}
                    />
                    <ButtonCreate type="submit"><FiArrowRight style={{height:"1em", top: ".125em",position: "relative"}} /></ButtonCreate>
                </Form>
            </FormWrap>
            

            <CardContainer>
                {isLoaded === false ? <> <Loader />  <Loader />  <Loader /></> :
                    projects.map(project => (
                        <Card
                            nome={project.projeto}
                            img_src={project.img}
                            id={project.id} />
                    ))
                }
            </CardContainer>
        </>
    );
}

export default Folio