import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
import BottomHeaderSliderImage1 from "../../assets/images/bottom_header_slider_image1.avif";
import BottomHeaderSliderImage2 from "../../assets/images/bottom_header_slider_image2.avif";
import BottomHeaderSliderImage3 from "../../assets/images/bottom_header_slider_image3.avif";

export default function TopBanner() {
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
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <img src={BottomHeaderSliderImage1} alt="home page logo" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <img src={BottomHeaderSliderImage2} alt="home page logo" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="d-flex justify-content-center">
              <img src={BottomHeaderSliderImage3} alt="home page logo" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </section>
  );
}
