import React, { useEffect } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { setIsOverlay } from "../../../action";

export default function RejectPopup(props) {
  const {
    setIsPopupOpened,
    heading,
    text,
    leftBtnLabel = "No",
    rightBtnLabel = "Yes",
    containerClasses,
    wrapperClasses,
    actionHandler = () => {
      console.log("No Action Added");
    },
  } = props;

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setIsOverlay(true));
    document.body.style.overflow = "hidden";

    return () => {
      dispatch(setIsOverlay(false));
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`reject-popup-container ${containerClasses}`}>
      <div className={`reject-popup-wrapper ${wrapperClasses}`}>
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

        <div className="reject-popup-btns-container">
          <button
            className="cancel-btn"
            onClick={() => {
              setIsPopupOpened(false);
            }}
          >
            {leftBtnLabel}
          </button>
          <button className="btn-orange" onClick={actionHandler}>
            {rightBtnLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
