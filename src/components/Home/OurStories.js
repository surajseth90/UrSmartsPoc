import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import SwiperNavigation from "../../app/SwiperNavigation";
import FlashCardForImg from '../../app/FlashCardForImg'
import { Navigation, Pagination } from "swiper/modules";

import ContentPopup from "../Popups/ContentPopup";

import Thailand1 from "../../assets/images/Thailand/Thailand-1.jpeg";
import Thailand2 from "../../assets/images/Thailand/Thailand-2.jpeg";
import Thailand3 from "../../assets/images/Thailand/Thailand-3.jpeg";
import Thailand4 from "../../assets/images/Thailand/Thailand-4.jpeg";
import Thailand5 from "../../assets/images/Thailand/Thailand-5.jpeg";
import Thailand6 from "../../assets/images/Thailand/Thailand-6.jpeg";
import Thailand7 from "../../assets/images/Thailand/Thailand-7.jpeg";
import Thailand8 from "../../assets/images/Thailand/Thailand-8.jpeg";
import Thailand9 from "../../assets/images/Thailand/Thailand-9.jpeg";
import Thailand10 from "../../assets/images/Thailand/Thailand-10.jpeg";
import Thailand11 from "../../assets/images/Thailand/Thailand-11.jpeg";
import Thailand12 from "../../assets/images/Thailand/Thailand-12.jpeg";
import Thailand13 from "../../assets/images/Thailand/Thailand-13.jpeg";
import Thailand14 from "../../assets/images/Thailand/Thailand-14.jpeg";
import Thailand15 from "../../assets/images/Thailand/Thailand-15.jpeg";
import Thailand16 from "../../assets/images/Thailand/Thailand-16.jpeg";
import Thailand17 from "../../assets/images/Thailand/Thailand-17.jpeg";
import Thailand18 from "../../assets/images/Thailand/Thailand-18.jpeg";
import Thailand19 from "../../assets/images/Thailand/Thailand-19.jpeg";

import Goa1 from "../../assets/images/Goa/Goa-1.jpeg";
import Goa3 from "../../assets/images/Goa/Goa-3.jpeg";
import Goa4 from "../../assets/images/Goa/Goa-4.jpeg";
import Goa5 from "../../assets/images/Goa/Goa-5.jpeg";
import Goa6 from "../../assets/images/Goa/Goa-6.jpeg";
import Goa7 from "../../assets/images/Goa/Goa-7.jpeg";
import Goa8 from "../../assets/images/Goa/Goa-8.jpeg";
import Goa9 from "../../assets/images/Goa/Goa-9.jpeg";

import Jaipur1 from "../../assets/images/Jaipur/Jaipur-1.jpeg";
import Jaipur2 from "../../assets/images/Jaipur/Jaipur-2.jpeg";
import Jaipur3 from "../../assets/images/Jaipur/Jaipur-3.jpeg";
import Jaipur4 from "../../assets/images/Jaipur/Jaipur-4.jpeg";
import Jaipur5 from "../../assets/images/Jaipur/Jaipur-5.jpeg";
import Jaipur6 from "../../assets/images/Jaipur/Jaipur-6.jpeg";
import Jaipur7 from "../../assets/images/Jaipur/Jaipur-7.jpeg";
import Jaipur8 from "../../assets/images/Jaipur/Jaipur-8.jpeg";
import Jaipur9 from "../../assets/images/Jaipur/Jaipur-9.jpeg";
import Jaipur10 from "../../assets/images/Jaipur/Jaipur-10.jpeg";
import Jaipur11 from "../../assets/images/Jaipur/Jaipur-11.jpeg";

import Mumbai1 from "../../assets/images/Mumbai/Mumbai-1.jpeg";
import Mumbai2 from "../../assets/images/Mumbai/Mumbai-2.jpeg";
import Mumbai3 from "../../assets/images/Mumbai/Mumbai-3.jpeg";
import Mumbai4 from "../../assets/images/Mumbai/Mumbai-4.jpeg";
import Mumbai5 from "../../assets/images/Mumbai/Mumbai-5.jpeg";
import Mumbai6 from "../../assets/images/Mumbai/Mumbai-6.jpeg";
import Mumbai7 from "../../assets/images/Mumbai/Mumbai-7.jpeg";
import { useSelector } from "react-redux";

const data = [
  {
    displayImg: Thailand1,
    hoverImgs: [
      Thailand2,
      Thailand3,
      Thailand4,
      Thailand5,
      Thailand6,
      Thailand7,
      Thailand8,
      Thailand9,
      Thailand10,
      Thailand11,
      Thailand12,
      Thailand13,
      Thailand14,
      Thailand15,
      Thailand16,
      Thailand17,
      Thailand18,
      Thailand19,
    ],
    city: "Thailand",
    popupTitle: "@Thailand",
    popupDesc: "",
  },
  {
    displayImg: Goa1,
    hoverImgs: [Goa3, Goa4, Goa5, Goa6, Goa7, Goa8, Goa9],
    city: "Goa",
    popupTitle: "@Goa",
    popupDesc:
      "Orchestrated the Annual Sales Meet 2025 in Goa with precision and flair, managing end-to-end logistics for attendees from multiple cities. The 3-day event featured seamless group transfers, warm airport welcomes, structured review sessions, collaborative workshops, and personalized team activities. From thoughtful refreshments and team briefings to evening beach dinners and leadership walk-and-talks, the event was a hit.",
  },
  {
    displayImg: Jaipur1,
    hoverImgs: [
      Jaipur2,
      Jaipur3,
      Jaipur4,
      Jaipur5,
      Jaipur6,
      Jaipur7,
      Jaipur8,
      Jaipur9,
      Jaipur10,
      Jaipur11,
    ],
    city: "Jaipur",
    popupTitle: "@Jaipur",
    popupDesc: "",
  },
  {
    displayImg: Mumbai1,
    hoverImgs: [Mumbai2, Mumbai3, Mumbai4, Mumbai5, Mumbai6, Mumbai7],
    city: "Mumbai",
    popupTitle: "@Mumbai",
    popupDesc: "",
  },
];

export default function OurStories() {
  const [popupData, setPopupData] = useState(null);
  const timerRef = useRef(null);
  const [dimension] = useSelector((state) => [state.dimension]);

  const onHoverHandle = (e, story) => {
    let index = 0;
    timerRef.current = setInterval(() => {
      e.target.src = story.hoverImgs[index];
      if (index == story.hoverImgs.length - 1) {
        index = 0;
      } else index++;
    }, 1000);
  };

  const getCardsCountInOneRow = () => {
    let count = 0;
    dimension.containerSize > 992
      ? (count = 3)
      : dimension.containerSize < 992 && dimension.containerSize > 768
        ? (count = 2)
        : dimension.containerSize < 768 && dimension.containerSize > 576
          ? (count = 1)
          : (count = 1);

    return count;
  };

  const onHoverLeaveHandle = (e, story) => {
    clearInterval(timerRef.current);
    e.target.src = story.displayImg;
  };

  return (
    <section className="our-stories w-100 section-padding">
      <div className="container d-flex justify-content-between flex-column flex-md-row align-items-center mb-4 gap-3">
        <h2 className="h3-heading">OUR STORIES</h2>
      </div>

      <div className="container stories-wrapper position-relative">
        <Swiper
          navigation={{
            prevEl: "#prev-story-btn",
            nextEl: "#next-story-btn",
          }}
          pagination={true}
          slidesPerView={getCardsCountInOneRow()}
          // spaceBetween={20}
          modules={[Pagination, Navigation]}
          // slidesPerView={'auto'}
          // centeredSlides={true}
        >
          {data.map((story, index) => {
            return (
              <SwiperSlide key={`story-${index}`}>
                <FlashCardForImg setPopupData={setPopupData} data={story} />

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
