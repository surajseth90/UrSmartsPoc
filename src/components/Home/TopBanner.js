import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import { BannerImgs } from "../../data";

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
          {BannerImgs.map((img, key) => {
            return (
              <SwiperSlide key={`top-banner-img-${key}`}>
                <div className="d-flex justify-content-center w-100">
                  <img
                    src={img}
                    alt="home page logo"
                    className="w-100"
                    loading="eager"
                  />
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
}
