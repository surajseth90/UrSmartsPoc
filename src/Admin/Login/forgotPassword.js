import React from "react";

export default function ForgotPassword() {
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

      <button className="admin-primary-btn w-100 mt-3" type="submit">
        Forgot Password
      </button>
    </form>
  );
}
