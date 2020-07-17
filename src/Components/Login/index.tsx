import React, { useCallback, useContext } from "react";
import { RouteComponentProps } from "react-router-dom";
import styled from "styled-components";
import { withRouter, Redirect } from "react-router";
import { app } from "../../firebase";
import { AuthContext } from "../../Auth";

import Button from "../Button";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;
const FormWrapper = styled.div`
  padding: 2em;
  border-radius: 5px;

  background-color: #f8f8f8;

  box-shadow: 6px 6px 5px 0px rgba(0, 0, 0, 0.1);
`;
const Label = styled.label`
  text-align: left;
  display: block;
  margin-top: 20px;
  color: #0d0d0d;
  font-size: 1.8rem;
  font-weight: 200;
`;
const Input = styled.input`
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background: none;
  outline: none;
  resize: none;
  border: 0;
  font-family: "Montserrat", sans-serif;
  transition: all 0.3s;
  border-bottom: 2px solid #bebed2;
  color: #78788c;

  &:focus {
    border-bottom: 2px solid #78788c;
  }
`;

const Login: React.SFC<RouteComponentProps> = ({ history }) => {
  //Using type React.SFC<RouteComponentProps> so i can access the history prop type correctly
  const handleLogin = useCallback(
    async (event) => {
      event.preventDefault();
      const { email, password } = event.target.elements;
      try {
        await app
          .auth()
          .signInWithEmailAndPassword(email.value, password.value);
        history.push("/dashboard");
      } catch (error) {
        alert(error);
      }
    },
    [history]
  );

  const currentUser = useContext(AuthContext);

  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }

  return (
    <Wrapper>
      <FormWrapper>
        <h1>Log in</h1>
        <form onSubmit={handleLogin}>
          <Label> Email </Label>
          <Input name="email" type="email" placeholder="Email" />
          <Label> Password </Label>
          <Input name="password" type="password" placeholder="Password" />
          <Button
            text="Entrar"
            type="submit"
            color="#00ad7c"
            textColor="#f3f3f3"
          />
        </form>
      </FormWrapper>
    </Wrapper>
  );
};

export default withRouter(Login);
