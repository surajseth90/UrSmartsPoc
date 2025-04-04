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

          <a
            target="_blank"
            href="https://api.whatsapp.com/send/?phone=919148069148&text=Hi&type=phone_number&app_absent=0"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 32 32"
              fill="none"
            >
              <g clip-path="url(#clip0_666_5012)">
                <path
                  d="M25.4001 6.54675C22.9067 4.04008 19.5867 2.66675 16.0534 2.66675C8.7734 2.66675 2.84007 8.60008 2.84007 15.8801C2.84007 18.2134 3.4534 20.4801 4.60007 22.4801L2.7334 29.3334L9.7334 27.4934C11.6667 28.5467 13.8401 29.1067 16.0534 29.1067C23.3334 29.1067 29.2667 23.1734 29.2667 15.8934C29.2667 12.3601 27.8934 9.04008 25.4001 6.54675ZM16.0534 26.8667C14.0801 26.8667 12.1467 26.3334 10.4534 25.3334L10.0534 25.0934L5.8934 26.1867L7.00006 22.1334L6.7334 21.7201C5.64007 19.9734 5.0534 17.9467 5.0534 15.8801C5.0534 9.82675 9.98673 4.89341 16.0401 4.89341C18.9734 4.89341 21.7334 6.04008 23.8001 8.12008C25.8801 10.2001 27.0134 12.9601 27.0134 15.8934C27.0401 21.9467 22.1067 26.8667 16.0534 26.8667ZM22.0801 18.6534C21.7467 18.4934 20.1201 17.6934 19.8267 17.5734C19.5201 17.4667 19.3067 17.4134 19.0801 17.7334C18.8534 18.0667 18.2267 18.8134 18.0401 19.0267C17.8534 19.2534 17.6534 19.2801 17.3201 19.1067C16.9867 18.9467 15.9201 18.5867 14.6667 17.4667C13.6801 16.5867 13.0267 15.5067 12.8267 15.1734C12.6401 14.8401 12.8001 14.6667 12.9734 14.4934C13.1201 14.3467 13.3067 14.1067 13.4667 13.9201C13.6267 13.7334 13.6934 13.5867 13.8001 13.3734C13.9067 13.1467 13.8534 12.9601 13.7734 12.8001C13.6934 12.6401 13.0267 11.0134 12.7601 10.3467C12.4934 9.70675 12.2134 9.78675 12.0134 9.77341C11.8134 9.77341 11.6001 9.77341 11.3734 9.77341C11.1467 9.77341 10.8001 9.85341 10.4934 10.1867C10.2001 10.5201 9.34673 11.3201 9.34673 12.9467C9.34673 14.5734 10.5334 16.1467 10.6934 16.3601C10.8534 16.5867 13.0267 19.9201 16.3334 21.3467C17.1201 21.6934 17.7334 21.8934 18.2134 22.0401C19.0001 22.2934 19.7201 22.2534 20.2934 22.1734C20.9334 22.0801 22.2534 21.3734 22.5201 20.6001C22.8001 19.8267 22.8001 19.1734 22.7067 19.0267C22.6134 18.8801 22.4134 18.8134 22.0801 18.6534Z"
                  fill="black"
                />
              </g>
              <defs>
                <clipPath id="clip0_666_5012">
                  <rect width="32" height="32" fill="white" />
                </clipPath>
              </defs>
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
