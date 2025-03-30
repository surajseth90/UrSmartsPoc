import { memo, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { postCallByRequest } from "../../helper";
import { setTopProfessionals } from "../../action";

function TopProfessionalsSection() {
  const [dimension, topProfessionals] = useSelector((state) => [
    state.dimension,
    state.topProfessionals,
  ]);

  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();

  useEffect(() => {
    if (topProfessionals && topProfessionals?.length > 0) return;
    getHelpers();
  }, []);

  const getHelpers = async () => {
    let body = {
      startLimit: 0,
      endLimit: 20,
      sortBy: "",
    };
    setLoading(true);
    try {
      const res = await postCallByRequest("top-helpers", body);
      if (res && res?.response && res?.response?.helpers)
        dispatch(setTopProfessionals(res?.response?.helpers));
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getCardsCountInOneRow = () => {
    let count = 0;
    dimension.containerSize > 992
      ? (count = 4)
      : dimension.containerSize < 992 && dimension.containerSize > 768
      ? (count = 3)
      : dimension.containerSize < 768 && dimension.containerSize > 576
      ? (count = 2)
      : (count = 1);

    return count;
  };

  return (
    <section
      className="card-section top-professional-section"
      style={{
        display: !loading && !topProfessionals?.length > 0 ? "none" : "",
      }}
    >
      <div className="container">
        <div className="card-section-top-container our-services-section-top">
          <p>Top Professionals</p>
          <div className="card-section-top-btn-container our-services-section-top-btn-container">
            <button
              className="card-prev-btn prev-professional-btn"
              id="prev-professional-btn"
              disabled={!topProfessionals || !topProfessionals.length > 0}
            >
              <div />
            </button>
            <button
              className="card-next-btn next-professional-btn"
              id="next-professional-btn"
              disabled={!topProfessionals || !topProfessionals.length > 0}
            >
              <div />
            </button>
          </div>
        </div>
        <div className="card-list-wrapper mt-24">
          {topProfessionals && topProfessionals.length > 0 ? (
            <Swiper
              navigation={{
                prevEl: "#prev-professional-btn",
                nextEl: "#next-professional-btn",
              }}
              modules={[Navigation]}
              spaceBetween={25}
              slidesPerView={getCardsCountInOneRow()}
            >
              {topProfessionals.map((data, index) => {
                return (
                  <SwiperSlide key={`service-${index}`}>
                    <li className="card">
                      <button>
                        <div className="top-professional-img-container"></div>
                        <p className="professional-name">{data.name}</p>
                        <p>{data.service}</p>
                        <p className="professional-exp">{`${data.experience} experience`}</p>
                        <div className="rating-star-wrapper d-flex justify-content-center align-items-center">
                          <span>{`${data.rating}/5`}</span>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="12"
                              height="18"
                              viewBox="0 0 18 18"
                              fill="none"
                            >
                              <path
                                d="M9.68812 1.95161C9.56921 1.67742 9.29888 1.5 9.00003 1.5C8.70118 1.5 8.43085 1.67742 8.31195 1.95161L6.56975 5.96904L2.18124 6.37323C1.88241 6.40075 1.62875 6.60376 1.53641 6.88931C1.44408 7.17485 1.53085 7.48795 1.75699 7.68523L5.06451 10.5706L4.0969 14.834C4.03065 15.1259 4.14432 15.4293 4.38608 15.6058C4.62784 15.7823 4.9514 15.7981 5.20925 15.646L9.00003 13.4108L12.7908 15.646C13.0487 15.7981 13.3722 15.7823 13.614 15.6058C13.8557 15.4293 13.9694 15.1259 13.9032 14.834L12.9356 10.5706L16.2431 7.68523C16.4692 7.48795 16.556 7.17485 16.4637 6.88931C16.3713 6.60376 16.1177 6.40075 15.8188 6.37323L11.4303 5.96904L9.68812 1.95161Z"
                                fill="#FFF"
                              ></path>
                            </svg>
                          </span>
                        </div>
                      </button>
                    </li>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            Array.from(Array(getCardsCountInOneRow()).keys()).map((index) => {
              return (
                <div key={`professional-skeleton-${index}`}>
                  <Skeleton height={250} width={200} className="mx-2" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(TopProfessionalsSection);
