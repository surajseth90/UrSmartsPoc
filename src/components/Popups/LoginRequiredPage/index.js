import React from "react";
import "./style.scss";

export default function LoginRequiredPopup(props) {
  const {
    setIsPopupOpened,
    heading = "Access Denied",
    text = "Please login!",
    btnLabel = "Login",
    containerClasses,
    wrapperClasses,
  } = props;
  return (
    <div className={`lr-popup-container ${containerClasses}`}>
      <div className={`lr-popup-wrapper ${wrapperClasses}`}>
        <button
          className="close-btn"
          onClick={() => {
            setIsPopupOpened(false);
          }}
        ></button>
        <div>
          <h3 className="label-black font-18 font-bold">{heading}</h3>
          <p className="label-black mt-2 font-medium">{text}</p>
        </div>

          <button className="btn-orange mt-4">{btnLabel}</button>
      </div>
    </div>
  );
}
