import React from "react";
import { Route, Navigate } from "react-router-dom";

const protectedroute = ({ element: Component, isAuthenticated, ...rest }) => {
  if (!isAuthenticated) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  return <Route {...rest} element={<Component />} />;
};

export default protectedroute;
