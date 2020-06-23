import React from 'react';
import styled from 'styled-components';
import { FiEdit3, FiInfo } from "react-icons/fi";

interface project {
    nome: string;
    img_src: string;
    id: string;
}

function Card(props:project){

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
        margin: 4rem auto;
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
        width: 90%;
        
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
            <CardImage src={props.img_src} alt={"Imagem do projeto "+props.nome}/>
            <MetaWrapper>
                <Meta>
                    <MetaName>
                        {props.nome}
                    </MetaName>
                    <IconContainer>
                        <FiEdit3 /> <FiInfo />
                    </IconContainer>
                </Meta>
                <span>
                </span>
            </MetaWrapper>
        </CardWrapper>
    );
}

export default Card