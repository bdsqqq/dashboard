import React from "react";
import styled from "styled-components";

const breakpoints = [48, 64];

const mq = breakpoints.map((bp) => `@media (min-width: ${bp}em)`);

const CardContainer = styled.div`
  width: 100%;
  min-height: 24rem;
  height: auto;
  margin: 0 auto;
  padding: 1rem 2rem;

  display: flex;
  flex-wrap: wrap;

  grid-template-columns: repeat(auto-fit, minmax(8rem, 24rem));

  ${mq[0]} {
    padding: 1rem 8em;
  }

  @supports (display: grid) {
    display: grid;
    grid-gap: 2rem;

    ${mq[0]} {
      grid-template-columns: repeat(auto-fit, minmax(24rem, 1fr));
    }
  }
`;

const FolioCardContainer = (props: any) => {
  return <CardContainer>{props.children}</CardContainer>;
};

export default FolioCardContainer;
