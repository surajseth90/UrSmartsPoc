import React, { useEffect, useState, Suspense } from "react";
import "./style.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import HomePageBG1 from "../../assets/images/HomePage_BG1.png";
import OurServicesSection from "./OurServicesSection.js";

export default function Home() {
  return (
    <>
      <div className="home-page-carousel-container">
        <Swiper pagination={true} modules={[Pagination]} className="mySwiper">
          <SwiperSlide>
            <div className="carousel-slide">
              <img src={HomePageBG1} alt="home page logo" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              <img src={HomePageBG1} alt="home page logo" />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="carousel-slide">
              <img src={HomePageBG1} alt="home page logo" />
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="home-page-wrapper">
        <OurServicesSection />
      </div>
    </>
  );
}
