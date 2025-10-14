import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";

import { BannerImgs } from "../../data";

export default function TopBanner() {
  return (
    <section className="home-page-carousel-container">
      <div className="container">
        <div class="mb-4">
          <div className="heading">
            <h1>Modern Travel</h1>
            <div className="d-flex align-items-center">  <h1>Retailing  </h1>
              <div class="ms-5 lh-lg" style={{ color: "#434343" }}>
                <p> At UrSmartSpoc, we offer unbeatable prices, top-tier customer support,
                  and endless travel options!  </p>
                <p>Our Best Price Guarantee ensures premium
                  Destination Management services at the most competitive rates. Need
                  help?</p>
              </div></div>

          </div>

          <div class="heading-mobile">
            <h1>Modern Travel Retailing</h1>
            <div class="lh-lg" style={{ color: "#434343" }}>
              <p> At UrSmartSpoc, we offer unbeatable prices, top-tier customer support,
                and endless travel options!  </p>
              <p>Our Best Price Guarantee ensures premium
                Destination Management services at the most competitive rates. Need
                help?</p>
            </div>

          </div>

        </div>
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
