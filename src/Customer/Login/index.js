import React, { lazy, Suspense, useState } from "react";
import Logo from "../../assets/images/logo.svg";
import "./style.scss";
import { useSearchParams } from "react-router-dom";
import LoginForm from "./loginForm";
const ForgotPassword = lazy(() => import("./forgotPassword"));

function Login() {
  const [searchParams] = useSearchParams();
  const isForgotPassword = searchParams.get("forgot-password") === "true";

  return (
    <div
      className="d-flex login-page w-100 flex-md-row flex-column vh-100"
      role="main"
    >
      <section className="flex-center w-md-50 w-xl-60 w-100 h-100 p-4">
        <div className="d-flex flex-column align-items-center login-left-container">
          <img src={Logo} width={200} />
          <h5 className="admin-text-primary font-24 text-center mt-3">
            A smart business solution for business travels
          </h5>
          <p className="admin-label-text font-18 text-center">
            Experience Precision and organised: Elevate Your Travel Booking
            Experience with US!
          </p>
        </div>
      </section>
      <section className="login-right-container w-md-50 w-xl-40 w-100 h-100 p-4 flex-center">
        <div className="d-flex flex-column align-items-center">
          <h1 className="font-24 text-white text-center">
            Client <span>Pro</span>
          </h1>
          {isForgotPassword ? (
            <Suspense fallback={<div className="loader"></div>}>
              <ForgotPassword />
            </Suspense>
          ) : (
            <LoginForm />
          )}
        </div>
      </section>
    </div>
  );
}

export default React.memo(Login);
