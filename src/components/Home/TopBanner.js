import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import BottomHeaderSliderImage1 from "../../assets/images/aus.png";
import BottomHeaderSliderImage2 from "../../assets/images/ista.png";
import BottomHeaderSliderImage3 from "../../assets/images/thai.png";
import BottomHeaderSliderImage4 from "../../assets/images/sou-e-as.png";
import BottomHeaderSliderImage5 from "../../assets/images/swiss.png";
import BottomHeaderSliderImage6 from "../../assets/images/eu.png";
import BottomHeaderSliderImage7 from "../../assets/images/dubai.png";

export default function TopBanner() {
  const imgData = [
    BottomHeaderSliderImage1,
    BottomHeaderSliderImage2,
    BottomHeaderSliderImage3,
    BottomHeaderSliderImage4,
    BottomHeaderSliderImage5,
    BottomHeaderSliderImage6,
    BottomHeaderSliderImage7,
  ];

  return (
    <section className="home-page-carousel-container bg">
      <div className="container">
        <Swiper
          pagination={true}
          modules={[Pagination, Autoplay]}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          className="mySwiper"
        >
          {imgData.map((img, key) => {
            return (
              <SwiperSlide key={`top-banner-img-${key}`}>
                <div className="d-flex justify-content-center w-100">
                  <img src={img} alt="home page logo" className="w-100" />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
