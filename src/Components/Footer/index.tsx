import React from 'react';
import styled from 'styled-components'
import { FiHeart } from "react-icons/fi";

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    min-height: 48px;
    max-height: 7vh;
    padding: 0 15px;
    background-color: #4F4F4F;

    color: #f2f2f2;
`
const Link = styled.a`
    text-decoration: none;
    font-weight: bold;

    color: #f2f2f2;
`


const Footer = () =>{
    return(
        <Wrapper>
            <span>Feito com <FiHeart /> por <Link href={"https://github.com/bdsqqq"} target={"_blank"}>Igor Bedesqui</Link>. atribuições podem ser encontradas no <Link href={"https://github.com/bdsqqq/dashboard"} target={"_blank"}>repositorio</Link>.</span>
        </Wrapper>
    );
}

export default Footer;