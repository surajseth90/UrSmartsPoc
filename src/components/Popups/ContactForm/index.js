import React, { useEffect } from "react";
import "./style.scss";

export default function ContentPopup({ onClose }) {
  useEffect(() => {
    document.body.scrollY = "hidden";

    return () => {
      document.body.scrollY = "auto";
    };
  }, []);

  return (
    <div className="contact-form-popup-wrapper position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3">
      <div className="overlay"></div>

      <div className="contact-form-popup-container bg-white w-100 d-flex position-relative">
        <button
          onClick={onClose}
          className="position-absolute close-btn"
          title="close"
          aria-label="close"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="23"
            height="24"
            viewBox="0 0 23 24"
            fill="none"
          >
            <path
              d="M1.94417 23.2692L0 21.325L9.5275 11.7971L0 2.2692L1.94417 0.325035L11.4721 9.85254L21 0.325035L22.9442 2.2692L13.4167 11.7971L22.9442 21.325L21 23.2692L11.4721 13.7417L1.94417 23.2692Z"
              fill="white"
            />
          </svg>
        </button>

        <div className="w-100 d-flex flex-column align-items-center">
          <h3>Contact Us</h3>
          <form action="" className="w-100">
            <div className="w-100">
              <input
                type="text"
                placeholder="Name"
                className="px-2 mb-3 rounded-3 w-100 mt-3"
              />
            </div>

            <div className="w-100">
              <input
                type="email"
                placeholder="Email"
                className="px-2 mb-3 rounded-3 w-100"
              />
            </div>

            <div className="w-100">
              <input
                type="text"
                placeholder="Phone"
                className="px-2 mb-3 rounded-3 w-100"
              />
            </div>

            <div className="w-100">
              <input
                type="text"
                placeholder="Subject"
                className="px-2 mb-3 rounded-3 w-100"
              />
            </div>

            <div className="w-100">
              <textarea
                placeholder="Message"
                style={{ height: "100px" }}
                className="px-2 mb-3 rounded-3 w-100"
              />
            </div>

            <button className="btn-orange w-100">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
}
