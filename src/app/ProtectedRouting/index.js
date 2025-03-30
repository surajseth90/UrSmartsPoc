import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isAuthenticated } from "../../session";
import { useDispatch } from "react-redux";
import { setSnakeBarContent } from "../../action";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = isAuthenticated();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setSnakeBarContent("You are required to Login first"));
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to="/" replace={true} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
