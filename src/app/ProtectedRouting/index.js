import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { isCustomerAuthenticated, isAdminAuthenticated } from "../../session";
import { useDispatch } from "react-redux";
import { setSnakeBarContent } from "../../action";

const ProtectedRoute = ({ children }) => {
  const isCustomer =  window.location.href.includes("customer");
  const isLoggedIn = isCustomer
    ? isCustomerAuthenticated()
    : isAdminAuthenticated();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isLoggedIn) {
      dispatch(setSnakeBarContent("You are required to Login first"));
    }
  }, []);

  if (!isLoggedIn) {
    return <Navigate to={isCustomer? "/customer/login": "/admin/login"} replace={true} />;
  } else {
    return children;
  }
};

export default ProtectedRoute;
