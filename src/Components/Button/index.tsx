import React from "react";
import styled from "styled-components";

interface ButtonProps {
  text: string;
  color: string;
  textColor: string;
  type: "button" | "submit" | "reset" | undefined;
}

const ButtonComponent = (props: ButtonProps) => {
  const Button = styled.button`
    cursor: pointer;

    background-color: ${props.color};
    color: ${props.textColor};

    font-size: 1em;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid ${props.color};
    border-radius: 2px;

    opacity: 0.8;

    transition: 200ms ease-in all;

    &:hover {
      opacity: 1;
    }
  `;

  return <Button type={props.type}>{props.text}</Button>;
};

export default ButtonComponent;
