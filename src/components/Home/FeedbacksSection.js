import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import QuoteImg from "../../assets/images/quote.svg";

function FeedbacksSection() {

  const dimension = useSelector((state) => state.dimension);


  return (
    <section className="card-section card-section-2-cards">
    <div className="container">
      <div className="card-section-top-container our-services-section-top">
        <p>Why people love Mud?</p>
        <div className="card-section-top-btn-container">
          <button
            className="card-prev-btn prev-people-feedback-btn"
            id="prev-people-feedback-btn"
          >
            <div />
          </button>
          <button
            className="card-next-btn next-people-feedback-btn"
            id="next-people-feedback-btn"
          >
            <div />
          </button>
        </div>
      </div>

      <div className="card-list-wrapper mt-24">
        <Swiper
          navigation={{
            prevEl: ".prev-people-feedback-btn",
            nextEl: ".next-people-feedback-btn",
          }}
          modules={[Navigation]}
          spaceBetween={25}
          slidesPerView={dimension.containerSize > 768 ? 2 : 1}
          onSlideChange={() => {}}
          onSwiper={(swiper) => {}}
        >
          <SwiperSlide>
            <div className="card">
              <img
                src={QuoteImg}
                aria-hidden
                alt="quote logo"
                className="quote-img"
              ></img>
              <p className="user-feedback">
                There are many variations of passages of Lorem Ipsum
                available but the majority have suffered alteration in
                some form, by injected humour or randomised words which
                don't look even slightly believable. If you are going to
                use a passage of Lorem Ipsum you need to be sure there
                isn't anything embarrassing hidden in the middle of text.
                All the Lorem Ipsum generators on the Internet tend.
              </p>
              <div className="feedback-user-container d-flex align-items-center mt-24">
                <div className="feedback-img">{/* <img></img> */}</div>
                <div className="feedback-text">
                  <p>Arushi Agarwal</p>
                  <span>Manager, Kotak Bank</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src={QuoteImg}
                aria-hidden
                alt="quote logo"
                className="quote-img"
              ></img>
              <p className="user-feedback">
                There are many variations of passages of Lorem Ipsum
                available but the majority have suffered alteration in
                some form, by injected humour or randomised words which
                don't look even slightly believable. If you are going to
                use a passage of Lorem Ipsum you need to be sure there
                isn't anything embarrassing hidden in the middle of text.
                All the Lorem Ipsum generators on the Internet tend.
              </p>
              <div className="feedback-user-container d-flex align-items-center mt-24">
                <div className="feedback-img">{/* <img></img> */}</div>
                <div className="feedback-text">
                  <p>Arushi Agarwal</p>
                  <span>Manager, Kotak Bank</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src={QuoteImg}
                aria-hidden
                alt="quote logo"
                className="quote-img"
              ></img>
              <p className="user-feedback">
                There are many variations of passages of Lorem Ipsum
                available but the majority have suffered alteration in
                some form, by injected humour or randomised words which
                don't look even slightly believable. If you are going to
                use a passage of Lorem Ipsum you need to be sure there
                isn't anything embarrassing hidden in the middle of text.
                All the Lorem Ipsum generators on the Internet tend.
              </p>
              <div className="feedback-user-container d-flex align-items-center mt-24">
                <div className="feedback-img">{/* <img></img> */}</div>
                <div className="feedback-text">
                  <p>Arushi Agarwal</p>
                  <span>Manager, Kotak Bank</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="card">
              <img
                src={QuoteImg}
                aria-hidden
                alt="quote logo"
                className="quote-img"
              ></img>
              <p className="user-feedback">
                There are many variations of passages of Lorem Ipsum
                available but the majority have suffered alteration in
                some form, by injected humour or randomised words which
                don't look even slightly believable. If you are going to
                use a passage of Lorem Ipsum you need to be sure there
                isn't anything embarrassing hidden in the middle of text.
                All the Lorem Ipsum generators on the Internet tend.
              </p>
              <div className="feedback-user-container d-flex align-items-center mt-24">
                <div className="feedback-img">{/* <img></img> */}</div>
                <div className="feedback-text">
                  <p>Arushi Agarwal</p>
                  <span>Manager, Kotak Bank</span>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  </section>
  );
}
export default React.memo(FeedbacksSection);
