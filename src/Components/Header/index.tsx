import React from 'react';
import Styled from 'styled-components';
import { FiLogOut } from "react-icons/fi";

import { app } from '../../firebase'
import LogoIcon from '../../assets/logo.svg'

const Wrapper = Styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    width: 100%;
    min-height: 48px;
    max-height: 7vh;
    padding: 0 15px;
    background-color: #4F4F4F;

    color: #f2f2f2;
`
const Logo = Styled.li`
    display: inline;
`
const LogoImg = Styled.img`
    min-height: 36px;
    max-height: 6vh;
`
const SignOut = Styled.div`
    cursor: pointer;

    display: flex;
    align-items: center;

    font-size: 16pt;

    transition: 200ms ease-in-out;

    &:hover{
        opacity: 0.7;
    }
`
const SignOutText = Styled.span`
    margin: 0 8px;
`

const Header = () =>{
    return(
        <Wrapper>
            <Logo><LogoImg src={LogoIcon} alt="Logotipo"/></Logo>
            <SignOut onClick={() => app.auth().signOut()}> <SignOutText>SignOut</SignOutText> <FiLogOut /></SignOut>
        </Wrapper>
    );
}

export default Header