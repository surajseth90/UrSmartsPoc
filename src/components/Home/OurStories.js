import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import SwiperNavigation from "../../app/SwiperNavigation";
import FlashCardForImg from "../../app/FlashCardForImg";
import ContentPopup from "../Popups/ContentPopup";
import { useSelector } from "react-redux";

// --- IMAGES ---
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
import Goa10 from "../../assets/images/Goa/Goa-10.jpeg";
import Goa11 from "../../assets/images/Goa/Goa-11.jpeg";
import Goa12 from "../../assets/images/Goa/Goa-12.jpeg";
import Goa13 from "../../assets/images/Goa/Goa-13.jpeg";
import Goa14 from "../../assets/images/Goa/Goa-14.jpeg";
import Goa15 from "../../assets/images/Goa/Goa-15.jpeg";
import Goa16 from "../../assets/images/Goa/Goa-16.jpeg";
import Goa17 from "../../assets/images/Goa/Goa-17.jpeg";

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

// --- DATA ---
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
    cardDesc: "Stop sleeping at night — Thailand’s good nights are calling!",
    popupDesc: `<p>Pack a few outfits… looking cute matters too.</p>

<p>At URSMARTSPOC, we make things happen — from leisure trips to seamless MICE events. We handle everything from airport to airport, planning Meetings, Incentives, Conferences, and Exhibitions with precision so you can relax, enjoy, and achieve your business goals.</p>

<p>Your happiness, your perfect event — that’s our promise.</p>`,
  },
  {
    displayImg: Goa1,
    hoverImgs: [
      Goa3,
      Goa4,
      Goa5,
      Goa6,
      Goa7,
      Goa8,
      Goa9,
      Goa10,
      Goa11,
      Goa12,
      Goa13,
      Goa14,
      Goa15,
      Goa16,
      Goa17,
    ],
    city: "Goa",
    popupTitle: "@Goa",
    popupDesc:
      `<p>Goa’s beaches, nightlife, seafood, and charm make it unforgettable. Soak up the sun, let your hair down, and maybe even spot a mermaid or two along the shore.</p>
      <p>URSMARTSPOC – Weddings & Corporate Events</p>
      <p>From dream beach weddings to seamless corporate and MICE events, URSMARTSPOC handles everything under the sun — logistics, décor, and experiences. Just walk in, relax, and enjoy — we make every moment memorable.</p>
      `,

      cardDesc:"Goa – Where Memories Begin"  },
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
    popupDesc: `<p>Sit on the king’s throne and let the magic of Jaipur surround you. Leave the files and folders, just hand them over to us — we’ll organize everything for you. URSMARTSPOC arranges everything — from grand palace weddings and intimate royal-themed ceremonies to corporate events and seamless MICE experiences — so all you need to do is relax and enjoy your royal moment.</p>
    <p>Touch the sword of your choice, point it whichever way you like — at URSMARTSPOC, your royal wishes and corporate visions come true exactly the way you want!</p>
    `,
    cardDesc:"Jaipur – Feel Like Royalty"
  },
  {
    displayImg: Mumbai1,
    hoverImgs: [Mumbai2, Mumbai3, Mumbai4, Mumbai5, Mumbai6, Mumbai7],
    city: "Mumbai",
    popupTitle: "@Mumbai",
    popupDesc: `<p>From high-powered corporate events to product launches, conferences, and team-building experiences, Mumbai is the city that never sleeps — and neither does URSMARTSPOC when it comes to making your events unforgettable.</p>
    <p>We arrange everything from start to finish. Whether it’s a glamorous gala, an interactive workshop, or a large-scale corporate meet, we handle all the details — so you can sleep peacefully and enjoy the moment, while we stay up making sure everything is perfect and you’re happy.</p>
    `,
    cardDesc:"Mumbai – Where Business Meets Style"
  },
];

export default function OurStories() {
  const [popupData, setPopupData] = useState(null);
  const [activeIndex, setActiveIndex] = useState(1);
  const timerRef = useRef(null);
  const [dimension] = useSelector((state) => [state.dimension]);

  const onHoverHandle = (e, story) => {
    let index = 0;
    timerRef.current = setInterval(() => {
      e.target.src = story.hoverImgs[index];
      if (index === story.hoverImgs.length - 1) index = 0;
      else index++;
    }, 1000);
  };

  const onHoverLeaveHandle = (e, story) => {
    clearInterval(timerRef.current);
    e.target.src = story.displayImg;
  };

  const getCardsCountInOneRow = () => {
    if (dimension.containerSize > 992) return 3;
    if (dimension.containerSize > 768) return 2;
    return 1;
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
          centeredSlides={true}
          spaceBetween={30}
          initialSlide={1} // 👈 start from second slide
          onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          onSwiper={(swiper) => setActiveIndex(swiper.realIndex)} // 👈 sync active index on mount
          modules={[Pagination, Navigation]}
        >
          {data.map((story, index) => (
            <SwiperSlide key={`story-${index}`}>
              <div
                className={`transition-all duration-300 d-flex justify-content-center ${activeIndex === index ? "scale-110 z-10" : "scale-90 opacity-70"
                  }`}
                style={{ transition: "all 0.4s ease" }}
              >
                <FlashCardForImg
                  setPopupData={setPopupData}
                  data={story}
                  onMouseEnter={(e) => onHoverHandle(e, story)}
                  onMouseLeave={(e) => onHoverLeaveHandle(e, story)}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        <SwiperNavigation
          containerClass="position-absolute bottom-0"
          prevId="prev-story-btn"
          nextId="next-story-btn"
        />
      </div>

      {popupData && (
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
