import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import { AuthContext } from "../../Auth";

const PrivateRoute = ({ component: RouteComponent, ...rest }: any) => {
  const currentUser: firebase.User | null = useContext(AuthContext);

  return (
    <Route
      {...rest}
      render={(routeProps) => {
        if (currentUser) {
          return <RouteComponent {...routeProps} />;
        } else {
          return <Redirect to={"/"} />;
        }
      }}
    />
  );
};

export default PrivateRoute;
