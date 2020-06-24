import React from 'react';
import styled from 'styled-components';
import { FiEdit3, FiInfo } from "react-icons/fi";

interface FolioCardProps{
    project: any;

    setIsEditable: any;
    setVisible: any;
    setCurrentProject: any;
}

function Card(props:FolioCardProps){

    const breakpoints = [48, 64]

    const mq = breakpoints.map(
        bp => `@media (min-width: ${bp}em)`
    )

    const MetaWrapper = styled.div`
        position: absolute;
        right: -5px;
        bottom: -15px;
        width: 95%;
        max-height: 105%;
        overflow: auto;

        ${mq[1]}{
            transform: scale(0);
            transform-origin: 50% 50%;
            transition: all 100ms ease-out;
            visibility: hidden;
        }

        &::-webkit-scrollbar{
            width: 0.25rem;
            height: 0.25rem;
        }

        &::-webkit-scrollbar-track{
            background: #000000;
        }

        &::-webkit-scrollbar-thumb{
            background: #f3f3f3;
        }
    `

    const CardWrapper = styled.div`
        position: relative;
        margin: 20px auto;
        height: fit-content;
        width: 95%;

        ${mq[1]}{
            &:hover {
                cursor: pointer;

                & ${MetaWrapper} {
                    transform: scale(1);
                    transition: all 200ms cubic-bezier(0.785, 0.010, 0.000, 1.415);
                    visibility: visible;
                }
            } 
        }
    `
    const CardImage = styled.img`
        width: 95%;
        display: block;
        height: auto;
        object-fit: cover;
        transition: all 200ms cubic-bezier(0.785, 0.010, 0.000, 1.415);
    `
    
    const Meta = styled.div`
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 15px 15px 10px;
        width: 95%;
        
        background: rgba(0, 0, 0, 0.9);

        color: #f2f2f2;
        font-size: 1.6rem;

        overflow: hidden;
    `
    const IconContainer = styled.div`
    `
    const MetaName = styled.div`
    `

    return(
        <CardWrapper>
            <CardImage src={props.project.img} alt={"Imagem do projeto "+props.project.projeto}/>
            <MetaWrapper>
                <Meta>
                    <MetaName>
                        {props.project.projeto}
                    </MetaName>
                    <IconContainer>
                        <FiEdit3 onClick={() => {
                            props.setCurrentProject(props.project)
                            props.setVisible(true);
                            props.setIsEditable(true);
                        }} /> 
                        <FiInfo onClick={() => {
                            props.setCurrentProject(props.project)
                            props.setVisible(true);
                            props.setIsEditable(false);
                        }} />
                    </IconContainer>
                </Meta>
                <span>
                </span>
            </MetaWrapper>
        </CardWrapper>
    );
}

export default Card