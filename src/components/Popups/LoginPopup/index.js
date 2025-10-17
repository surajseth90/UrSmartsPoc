import React, { useEffect } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import { Link } from "react-router-dom";

export default function ContentPopup({ onClose }) {
  useEffect(() => {
    document.body.scrollY = "hidden";

    return () => {
      document.body.scrollY = "auto";
    };
  }, []);

  return (
    <div className="login-popup-wrapper position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-md-4 p-0">
      <div className="overlay"></div>

      <div className="login-popup-container bg-white w-100 d-flex position-relative">
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
              fill="currentColor"
            />
          </svg>
        </button>
        <div className="w-100 d-flex flex-column align-items-center">
          <h3>Login As</h3>
          <div className="d-flex gap-3 mt-3">

          <a
            className="btn-primary px-4 py-1 text-decoration-none"
            href="/customer/login"
            target="_blank"
          >
            Customer
          </a>
          <a
            className="btn-primary px-4 py-1 text-decoration-none"
            href="/customer/login"
            target="_blank"
          >
            Admin
          </a>
          </div>

        </div>
      </div>
    </div>
  );
}
