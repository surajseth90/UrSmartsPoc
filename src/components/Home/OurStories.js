import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperNavigation from "../../app/SwiperNavigation";
import { Navigation, Pagination } from "swiper/modules";
import Story1 from "../../assets/images/story1.png";
import Story2 from "../../assets/images/story2.png";
import Story3 from "../../assets/images/story3.png";
import Story4 from "../../assets/images/story4.png";
import Story5 from "../../assets/images/story5.png";
import Story6 from "../../assets/images/story6.png";
import ContentPopup from "../Popups/ContentPopup";

const data = [
  {
    displayImg: Story1,
    hoverImgs: [Story2, Story3, Story4, Story5, Story6],
    city: "@Banglore",
    popupTitle: "@Banglore",
    popupDesc: "",
  },
  {
    displayImg: Story2,
    hoverImgs: [Story1, Story3, Story4, Story5, Story6],
    city: "@Goa",
    popupTitle: "@Goa",
    popupDesc: "",
  },
  {
    displayImg: Story3,
    hoverImgs: [Story2, Story1, Story4, Story5, Story6],
    city: "@Jaipur",
    popupTitle: "@Jaipur",
    popupDesc: "",
  },
  {
    displayImg: Story4,
    hoverImgs: [Story2, Story3, Story1, Story5, Story6],
    city: "@Dubai",
    popupTitle: "@Dubai",
    popupDesc: "",
  },
];

export default function OurStories() {
  const [popupData, setPopupData] = useState(null);
  const timerRef = useRef(null);

  const onHoverHandle = (e, story) => {
    let index = 0;
    timerRef.current = setInterval(() => {
      e.target.src = story.hoverImgs[index];
      if (index == story.hoverImgs.length - 1) {
        index = 0;
      } else index++;
    }, 1000);
  };

  const onHoverLeaveHandle = (e, story) => {
    clearInterval(timerRef.current);
    e.target.src = story.displayImg;
  };

  return (
    <section className="our-stories w-100">
      <div className="container d-flex justify-content-between">
        <h2 className="text-white">OUR STORIES</h2>
        <div className="text-white d-flex align-items-center">
          <span>FOLLOW US: </span>
          <a href="https://www.facebook.com/share/14zhDoza24/" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M23.4463 18L24.335 12.2087H18.7782V8.45063C18.7782 6.86625 19.5544 5.32188 22.0432 5.32188H24.5694V0.39125C24.5694 0.39125 22.2769 0 20.085 0C15.5088 0 12.5175 2.77375 12.5175 7.795V12.2087H7.43066V18H12.5175V32H18.7782V18H23.4463Z"
                fill="white"
              />
            </svg>
          </a>

          <a href="#" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M16.0063 8.81245C12.0313 8.81245 8.82505 12.0187 8.82505 15.9937C8.82505 19.9687 12.0313 23.1749 16.0063 23.1749C19.9813 23.1749 23.1875 19.9687 23.1875 15.9937C23.1875 12.0187 19.9813 8.81245 16.0063 8.81245ZM16.0063 20.6625C13.4375 20.6625 11.3375 18.5687 11.3375 15.9937C11.3375 13.4187 13.4313 11.325 16.0063 11.325C18.5813 11.325 20.675 13.4187 20.675 15.9937C20.675 18.5687 18.575 20.6625 16.0063 20.6625ZM25.1563 8.5187C25.1563 9.44995 24.4063 10.1937 23.4813 10.1937C22.5501 10.1937 21.8063 9.4437 21.8063 8.5187C21.8063 7.5937 22.5563 6.8437 23.4813 6.8437C24.4063 6.8437 25.1563 7.5937 25.1563 8.5187ZM29.9125 10.2187C29.8063 7.97495 29.2938 5.98745 27.65 4.34995C26.0125 2.71245 24.025 2.19995 21.7813 2.08745C19.4688 1.9562 12.5375 1.9562 10.225 2.08745C7.98755 2.1937 6.00005 2.7062 4.3563 4.3437C2.71255 5.9812 2.2063 7.9687 2.0938 10.2125C1.96255 12.525 1.96255 19.4562 2.0938 21.7687C2.20005 24.0124 2.71255 26 4.3563 27.6375C6.00005 29.275 7.9813 29.7875 10.225 29.9C12.5375 30.0312 19.4688 30.0312 21.7813 29.9C24.025 29.7937 26.0125 29.2812 27.65 27.6375C29.2875 26 29.8001 24.0124 29.9125 21.7687C30.0438 19.4562 30.0438 12.5312 29.9125 10.2187ZM26.925 24.25C26.4375 25.475 25.4938 26.4187 24.2626 26.9125C22.4188 27.6437 18.0438 27.475 16.0063 27.475C13.9688 27.475 9.58755 27.6375 7.75005 26.9125C6.52505 26.425 5.5813 25.4812 5.08755 24.25C4.3563 22.4062 4.52505 18.0312 4.52505 15.9937C4.52505 13.9562 4.36255 9.57495 5.08755 7.73745C5.57505 6.51245 6.5188 5.5687 7.75005 5.07495C9.5938 4.3437 13.9688 4.51245 16.0063 4.51245C18.0438 4.51245 22.4251 4.34995 24.2626 5.07495C25.4876 5.56245 26.4313 6.5062 26.925 7.73745C27.6563 9.5812 27.4875 13.9562 27.4875 15.9937C27.4875 18.0312 27.6563 22.4125 26.925 24.25Z"
                fill="white"
              />
            </svg>
          </a>
          <a
            href="https://x.com/UrSmartSpoc?t=JZx_616CcG6Up7yLxTLUUg&s=08"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M5.87243 4C5.00976 4 4.50409 4.97169 4.99743 5.67969L12.9818 17.0911L4.96618 26.4609C4.44751 27.0663 4.87718 28 5.67451 28H6.55993C6.95059 28 7.32222 27.8286 7.57555 27.5312L14.5599 19.349L19.8177 26.862C20.3177 27.574 21.1333 28 22.0026 28H26.4479C27.3106 28 27.8163 27.0296 27.3229 26.3229L18.8985 14.2656L26.5339 5.32031C26.9766 4.80031 26.6072 4 25.9245 4H24.7969C24.4076 4 24.0372 4.17015 23.7839 4.46615L17.3282 12.013L12.5261 5.14062C12.0274 4.42596 11.2132 4 10.3412 4H5.87243Z"
                fill="white"
              />
            </svg>
          </a>
          <a href="#" target="_blank">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M30.5364 8.6712C30.1874 7.35731 29.1593 6.32253 27.8539 5.97136C25.4878 5.33325 16 5.33325 16 5.33325C16 5.33325 6.5122 5.33325 4.14603 5.97136C2.84065 6.32259 1.81253 7.35731 1.46359 8.6712C0.82959 11.0527 0.82959 16.0215 0.82959 16.0215C0.82959 16.0215 0.82959 20.9903 1.46359 23.3717C1.81253 24.6856 2.84065 25.6773 4.14603 26.0285C6.5122 26.6666 16 26.6666 16 26.6666C16 26.6666 25.4878 26.6666 27.8539 26.0285C29.1593 25.6773 30.1874 24.6856 30.5364 23.3717C31.1704 20.9903 31.1704 16.0215 31.1704 16.0215C31.1704 16.0215 31.1704 11.0527 30.5364 8.6712ZM12.8969 20.5328V11.5102L20.8269 16.0216L12.8969 20.5328Z"
                fill="white"
              />
            </svg>
          </a>
          <a
            href="https://www.linkedin.com/in/ursmartspoc-co-b8b5b8129?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <path
                d="M28 2H3.99375C2.89375 2 2 2.90625 2 4.01875V27.9813C2 29.0938 2.89375 30 3.99375 30H28C29.1 30 30 29.0938 30 27.9813V4.01875C30 2.90625 29.1 2 28 2ZM10.4625 26H6.3125V12.6375H10.4688V26H10.4625ZM8.3875 10.8125C7.05625 10.8125 5.98125 9.73125 5.98125 8.40625C5.98125 7.08125 7.05625 6 8.3875 6C9.7125 6 10.7937 7.08125 10.7937 8.40625C10.7937 9.7375 9.71875 10.8125 8.3875 10.8125ZM26.0187 26H21.8687V19.5C21.8687 17.95 21.8375 15.9563 19.7125 15.9563C17.55 15.9563 17.2188 17.6438 17.2188 19.3875V26H13.0688V12.6375H17.05V14.4625H17.1062C17.6625 13.4125 19.0188 12.3062 21.0375 12.3062C25.2375 12.3062 26.0187 15.075 26.0187 18.675V26Z"
                fill="white"
              />
            </svg>
          </a>
        </div>
      </div>

      <div className="stories-wrapper position-relative">
        <Swiper
          navigation={{
            prevEl: "#prev-story-btn",
            nextEl: "#next-story-btn",
          }}
          pagination={true}
          slidesPerView={4}
          spaceBetween={0}
          modules={[Pagination, Navigation]}
        >
          {data.map((story, index) => {
            return (
              <SwiperSlide key={`story-${index}`}>
                <div className="d-flex flex-column">
                  <img
                    className="w-100"
                    src={story.displayImg}
                    alt=""
                    onMouseOver={(e) => onHoverHandle(e, story)}
                    onMouseLeave={(e) => onHoverLeaveHandle(e, story)}
                  />
                  <button
                    className="w-100 bg-white py-2"
                    onClick={() => setPopupData(story)}
                  >
                    {story.city}
                  </button>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <SwiperNavigation
          containerClass="position-absolute bottom-0"
          prevId="prev-story-btn"
          nextId="next-story-btn"
        />
      </div>

      {popupData != null && (
        <ContentPopup
          img={popupData.hoverImgs}
          title={popupData.popupTitle}
          description={popupData.popupDesc}
          onClose={() => setPopupData(null)}
        />
      )}
    </section>
  );
}
