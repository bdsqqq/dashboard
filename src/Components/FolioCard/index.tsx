import React from 'react';
import styled from 'styled-components';

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
        margin: 20px auto;
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
        background: rgba(0, 0, 0, 0.9);
        padding: 15px 15px 10px;
        color: white;
        width: 100%;
    `

    return(
        <CardWrapper>
            <CardImage src={props.img_src} alt={"Imagem do projeto "+props.nome}/>
            <MetaWrapper>
                <Meta>
                    
                </Meta>
                <span>
                </span>
            </MetaWrapper>
        </CardWrapper>
    );
}

export default Card