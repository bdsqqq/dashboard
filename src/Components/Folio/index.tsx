import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

import db from '../../firebase';

import Card from '../FolioCard';
import Loader from '../LoaderFolioCard'

const breakpoints = [48, 64]

const mq = breakpoints.map(
    bp => `@media (min-width: ${bp}em)`
)

const Wrapper = styled.div`
    margin: -15px 2rem;
`
const Title = styled.span`
    font-size: 3em;
    color: #f3f3f3;

    ${mq[0]}{
        font-size: 4em;
    }
`
const CardContainer = styled.div`
    width: 100%;
    min-height: 24rem;
    height: auto;
    background: #575151;
    border-radius: 10px 10px 0 0;
    margin: 0 auto;
    padding: 1em;

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
    ano: number;
    demo: string;
    img: string;
    projeto: string;
    role: string;
    source: string;
    tools: string[];
}

function Folio() {

    const [isLoaded, setIsloaded] = useState(false);
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

    return (
        <>
            <Wrapper>
                <Title>
                    Folio
            </Title>
            </Wrapper>

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