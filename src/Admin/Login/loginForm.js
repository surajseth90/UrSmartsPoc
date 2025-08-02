import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { EyeOpened, EyeClosed } from "../../app/Icons";
import { generateCredentials } from "../../helper";
import { setAdminToken } from "../../session";
import { useDispatch } from "react-redux";
import { setAdminDetails, setSnakeBarContent } from "../../action";

export default function LoginForm() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [passwordType, setPasswordType] = useState("password");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const updatePasswordVisibility = () => {
    if (passwordType == "password") setPasswordType("text");
    else setPasswordType("password");
  };
  const submitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (formData.email == "admin@sys.com" && formData.password == "admin123") {
      let token = generateCredentials(formData.email, formData.password);
      let userData = {
        email: formData.email
      }
      dispatch(setAdminDetails(userData))
      setAdminToken(token);
      navigate("/admin/dashboard");
    } else {
      dispatch(setSnakeBarContent("Invalid credentials"));
    }

    setIsLoading(false);
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
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
        <input
          type="text"
          id="admin-email"
          name="email"
          value={formData.email}
          onChange={(e) => handleChange("email", e.target.value)}
        />
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
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
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

      <button
        className={`admin-primary-btn w-100 mt-3 d-flex justify-content-center`}
        type="submit"
      >
        {isLoading ? (
          <div className="btn-loader-white"></div>
        ) : (
          <span> Sign in</span>
        )}
      </button>
    </form>
  );
}
