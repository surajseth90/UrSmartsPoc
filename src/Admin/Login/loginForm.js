import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { EyeOpened, EyeClosed } from "../../app/Icons";

export default function LoginForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordType, setPasswordType] = useState("password");

  const updatePasswordVisibility = () => {
    if (passwordType == "password") setPasswordType("text");
    else setPasswordType("password");
  };
  const submitHandler = (e) => {
    e.preventDefault();
  };
  return (
    <form
      action="submit"
      className="form-container bg-white p-4 rounded-2 mt-4"
      onSubmit={submitHandler}
    >
      <div className="input-container w-100 d-flex flex-column">
        <label htmlFor="admin-email" className="admin-label-text">
          Email
        </label>
        <input type="text" id="admin-email" name="email" />
      </div>
      <div className="input-container w-100 d-flex flex-column mt-3">
        <label htmlFor="admin-password" className="admin-label-text">
          Password
        </label>
        <div className="position-relative password-input-wrapper">
          <input
            type={passwordType}
            id="amin-password"
            name="password"
            className="w-100"
          />
          <button
            className="position-absolute top-50"
            type="button"
            onClick={updatePasswordVisibility}
          >
            {passwordType == "password" ? <EyeOpened /> : <EyeClosed />}
          </button>
        </div>
      </div>
      <div className="w-100 text-end">
        <button
          className="forgot-btn font-14"
          type="button"
          onClick={() => {
            searchParams.set("forgot-password", "true");
            setSearchParams(searchParams);
          }}
        >
          Forgot your password?
        </button>
      </div>

      <button className="admin-primary-btn w-100 mt-3" type="submit">
        Sign in
      </button>
    </form>
  );
}
