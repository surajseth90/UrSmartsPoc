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
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M25.9208 6.06902C23.2886 3.44636 19.788 2.00156 16.0586 2C8.37408 2 2.12004 8.22378 2.11692 15.8737C2.11598 18.319 2.75776 20.7059 3.97787 22.8102L2 30L9.39068 28.0705C11.427 29.1759 13.7197 29.7586 16.053 29.7592H16.0586C16.0583 29.7592 16.0589 29.7592 16.0586 29.7592C23.7422 29.7592 29.9969 23.5348 30 15.8846C30.0016 12.1774 28.5529 8.69169 25.9208 6.06902ZM10.397 16.3786C10.2228 16.1472 8.9746 14.4989 8.9746 12.7924C8.9746 11.086 9.8746 10.2472 10.1938 9.90036C10.5129 9.55347 10.8906 9.46667 11.1228 9.46667C11.3551 9.46667 11.5877 9.46884 11.7906 9.4788C12.0044 9.48969 12.2917 9.39791 12.5743 10.074C12.8647 10.768 13.5612 12.4748 13.6484 12.6481C13.7356 12.8217 13.7935 13.0239 13.6775 13.2554C13.5615 13.4865 13.5034 13.6312 13.3292 13.8337C13.1551 14.0363 12.9635 14.2858 12.8066 14.441C12.6321 14.614 12.4505 14.8016 12.6537 15.1485C12.8569 15.4957 13.5559 16.6309 14.5915 17.5503C15.922 18.7316 17.0446 19.0974 17.3928 19.271C17.7411 19.4446 17.9443 19.4157 18.1475 19.1842C18.3507 18.9528 19.0184 18.1719 19.2507 17.825C19.4829 17.4781 19.7152 17.536 20.0344 17.6514C20.3538 17.7671 22.0663 18.6059 22.4146 18.7792C22.7628 18.9528 22.9951 19.0396 23.0823 19.1842C23.1695 19.3289 23.1695 20.023 22.8791 20.8328C22.5887 21.6426 21.197 22.3818 20.5277 22.4811C19.9275 22.5704 19.1681 22.6077 18.3335 22.3436C17.8277 22.184 17.1787 21.9705 16.3475 21.6134C12.8534 20.1116 10.5714 16.6101 10.397 16.3786Z"
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
