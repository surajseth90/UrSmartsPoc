import React, { useEffect } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

export default function ContentPopup({ img, title, description, onClose }) {
  useEffect(() => {
    document.body.scrollY = "hidden";

    return () => {
      document.body.scrollY = "auto";
    };
  }, []);

  return (
    <div className="content-popup-wrapper position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-md-4 p-0">
      <div className="overlay"></div>

      <div className="content-popup-container bg-white w-100 d-flex position-relative">
        <button
          onClick={onClose}
          className="position-absolute"
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
        <div className="images-wrapper col-lg-4 d-flex col-sm-6">
          {Array.isArray(img) && img.length > 1 ? (
            <Swiper
              pagination={true}
              modules={[Pagination, Autoplay]}
              autoplay={{
                delay: 2000,
                disableOnInteraction: false,
              }}
              slidesPerView={1}
              className="mySwiper"
            >
              {img.map((image) => {
                return (
                  <SwiperSlide>
                    <div className="">
                      <img className="w-100" src={image} alt="content image" />
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <img src={img} className="w-100" alt="content image" />
          )}
        </div>

        <div className="w-100 d-flex flex-column align-items-center">
          <h3>{title}</h3>
          <p
            className="mt-3"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </div>
      </div>
    </div>
  );
}
