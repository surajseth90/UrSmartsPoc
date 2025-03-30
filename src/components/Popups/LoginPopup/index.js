import React, { useEffect, useRef, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import * as actions from "../../../action";
import { setToken } from "../../../session";
import GoogleIcon from "../../../assets/images/google.png";
import FBIcon from "../../../assets/images/facebook.png";
import { BackArrowIcon } from "../../../app/Icons";
import { postCallByRequest } from "../../../helper";

export default function Login() {
  const [mobileNumber, setMobileNumber] = useState("");
  const [isOTPView, setIsOPTView] = useState(false);
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [resendTime, setResendTime] = useState(30);
  const [isLoginBtnDisabled, setIsLoginBtnDisabled] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const timerRef = useRef(null);
  const resendTimeRef = useRef(resendTime);

  const dispatch = useDispatch();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    resendTimeRef.current = resendTime;
  }, [resendTime]);

  useEffect(() => {
    if (isOTPView) {
      timerFunction();
    }
  }, [isOTPView]);

  useEffect(() => {
    let length = 0;
    otp.forEach((data) => {
      if (data > 0) length++;
    });
    if (length === 4) {
      setIsLoginBtnDisabled(false);
    } else {
      setIsLoginBtnDisabled(true);
    }
  }, [otp]);

  const timerFunction = () => {
    timerRef.current = setInterval(() => {
      if (resendTimeRef.current > 0) setResendTime((time) => time - 1);
      else clearInterval(timerRef.current);
    }, 1000);
  };

  const inputHandler = (e) => {
    let input = e.target.value.replace(/\D/g, "");
    if (input.length > 10) {
      input = input.slice(0, 10);
    }
    setMobileNumber(input);
  };

  const handleOtpChange = (e, index) => {
    const value = e.target.value;

    if (/^[0-9]*$/.test(value) && value !== "") {
      const updatedOtp = [...otp];
      updatedOtp[index] = value;
      if (index < 3) {
        document.getElementById(`otpInput${index + 1}`).focus();
      }
      setOtp(updatedOtp);
    } else {
      const updatedOtp = [...otp];
      updatedOtp[index] = "";

      setOtp(updatedOtp);
    }
  };

  const onBackBtnHandler = () => {
    setBtnLoading(false);
    setMobileNumber("");
    setOtp(["", "", "", ""]);
    setIsOPTView(false);
    clearInterval(timerRef.current);
    setResendTime(30);
  };

  const mobileNumberSubmitHandler = async (e) => {
    e.preventDefault();
    setBtnLoading(true);

    setToken("4325153");
    return


    try {
      const res = await postCallByRequest("login", { mobileNo: mobileNumber });
      localStorage.setItem("requestId", res.requestId);
      setIsOPTView(true);
      dispatch(actions.setSnakeBarContent("OTP sent successfully"));
    } catch (error) {
      dispatch(actions.setSnakeBarContent("Failed to sent OTP, Try again!"));
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const loginClickHandler = async (e) => {
    e.preventDefault();
    const body = {
      requestId: localStorage.getItem("requestId"),
      mobileNo: mobileNumber,
      code: otp.join(""),
    };
    setBtnLoading(true);

    try {
      const res = await postCallByRequest("verify-otp", body);
      const user = await postCallByRequest("fetch-profile", {
        oauthToken: res.oauthToken,
      });

      dispatch(actions.setUserProfile(user));
      dispatch(actions.setSnakeBarContent("Login successfully"));

      document.body.style.overflowY = "auto";
      dispatch(actions.setIsLogin(true));
      dispatch(actions.setIsLoginPopupOpened(false));
      dispatch(actions.setIsOverlay(false));
      onBackBtnHandler();
      setToken(res.oauthToken);
    } catch (error) {
      console.log(error);
    } finally {
      setBtnLoading(false);
    }
  };

  const resendOTPClickHandler = async () => {
    setResendTime(30);
    timerFunction();
    try {
      const res = await postCallByRequest("resend-otp", {
        mobileNo: mobileNumber,
      });
      localStorage.setItem("requestId", res.requestId);
      dispatch(actions.setSnakeBarContent("OTP resent successfully"));
    } catch (error) {
      dispatch(actions.setSnakeBarContent("Failed to sent OTP, Try again!"));
      console.log(error);
    }
  };

  return (
    <div className="login-page-container z-101 w-100 h-100 position-fixed bg-transparent">
      <div className="overlay"></div>
      <div className="position-absolute z-101 w-100 h-100">
        {isOTPView ? (
          <div className="login-form position-relative text-center">
            <button
              type="button"
              className="close-btn position-absolute end-0 me-3 top-0 mt-3 btn-close"
              onClick={() => {
                document.body.style.overflowY = "auto";
                dispatch(actions.setIsLoginPopupOpened(false));
                dispatch(actions.setIsOverlay(false));
              }}
            ></button>
            <button
              className="position-absolute start-0 ms-4 top-0 mt-3 label-grey"
              onClick={onBackBtnHandler}
              title="back"
              disabled={btnLoading}
            >
              <BackArrowIcon scale="2" />
            </button>
            <p>Login to MUD</p>
            <span>
              Enter 4 digit code sent to your phone
              <br />
              {`+91-${mobileNumber}`}
            </span>

            <form onSubmit={loginClickHandler}>
              <div className="otp-input-field-wrapper max-wid">
                {otp.map((value, index) => (
                  <input
                    disabled={btnLoading}
                    key={index}
                    id={`otpInput${index}`}
                    type="text"
                    value={value}
                    onChange={(e) => handleOtpChange(e, index)}
                    maxLength="1"
                    name="otp"
                    className={`otp-input-${value === "" ? "empty" : "filled"}`}
                  />
                ))}
              </div>

              <button
                disabled={isLoginBtnDisabled || btnLoading}
                className="continue-btn btn-orange max-wid"
                type="submit"
              >
                {btnLoading ? (
                  <div className="btn-orange-loader"></div>
                ) : (
                  <span>LOGIN</span>
                )}
              </button>
            </form>

            {resendTime === 0 ? (
              <div>
                <button
                  className="resend-otp-btn"
                  onClick={resendOTPClickHandler}
                  type="button"
                  disabled={btnLoading}
                >
                  Resend code
                </button>
                <div className="verification-failed-text">
                  <span>Verification failed</span>
                </div>
              </div>
            ) : (
              <div className="resend-code-text">{`Resend code (In ${resendTime} secs)`}</div>
            )}
          </div>
        ) : (
          <div className="login-form position-relative text-center">
            <button
              className="close-btn position-absolute end-0 me-3 top-0 mt-3 btn-close"
              type="button"
              onClick={() => {
                document.body.style.overflowY = "auto";
                dispatch(actions.setIsOverlay(false));
                dispatch(actions.setIsLoginPopupOpened(false));
              }}
            ></button>

            <p>Login to MUD</p>
            <span>
              Enter your phone number to
              <br />
              Login/Sign up
            </span>

            <form onSubmit={mobileNumberSubmitHandler}>
              <div className="mobile-input-field-wrapper max-wid">
                <span>+91</span>
                <input
                  type="text"
                  onChange={inputHandler}
                  id="phone"
                  name="phone"
                  value={mobileNumber}
                  disabled={btnLoading}
                ></input>
              </div>
              <button
                disabled={mobileNumber.length < 10 || btnLoading}
                className="continue-btn btn-orange max-wid"
                type="submit"
              >
                {btnLoading ? (
                  <div className="btn-orange-loader"></div>
                ) : (
                  <span>CONTINUE</span>
                )}
              </button>
            </form>

            <div className="fg-login-btns-container mt-5">
              <span className="font-12 label-grey">EASILY USING</span>
              <div className="fg-login-btns-wrapper d-flex max-wid">
                <button
                  className="fg-login-btns d-flex w-50 align-items-center bg-white"
                  type="button"
                  disabled={btnLoading}
                >
                  <img src={FBIcon} alt="facebook icon"></img>
                  <span>FACEBOOK</span>
                </button>

                <button
                  className="fg-login-btns d-flex w-50 align-items-center bg-white"
                  type="button"
                  disabled={btnLoading}
                >
                  <img src={GoogleIcon} alt="google icon"></img>
                  <span>GOOGLE</span>
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
