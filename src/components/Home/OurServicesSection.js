import { memo } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation } from "swiper/modules";

import MaidImg from "../../assets/images/HomePage/maid.svg";
import CookImg from "../../assets/images/HomePage/cook.svg";
import BabysitterImg from "../../assets/images/HomePage/babysitter.svg";
import NurseImg from "../../assets/images/HomePage/nurse.svg";
import CaretakerImg from "../../assets/images/HomePage/caretaker.svg";
import DogwalkerImg from "../../assets/images/HomePage/dogwalker.svg";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function OurServicesSection() {
  const [dimension, services] = useSelector((state) => [
    state.dimension,
    state.services,
  ]);
  const navigate = useNavigate();

  const getServiceImage = (service) => {
    let image = "";
    let trimedService = service.replace(/\s/g, "").toLowerCase();
    switch (trimedService) {
      case "maid":
        image = MaidImg;
        break;
      case "cook":
        image = CookImg;
        break;
      case "babysitter":
        image = BabysitterImg;
        break;
      case "nurse":
        image = NurseImg;
        break;
      case "caretaker":
        image = CaretakerImg;
        break;
      case "dogwalker":
        image = DogwalkerImg;
        break;
      default:
        image = CaretakerImg;
        break;
    }

    return image;
  };

  const getCardsCountInOneRow = () => {
    let count = 0;
    dimension.containerSize > 992
      ? (count = 6)
      : dimension.containerSize < 992 && dimension.containerSize > 768
      ? (count = 5)
      : dimension.containerSize < 768 && dimension.containerSize > 576
      ? (count = 4)
      : (count = 2);

    return count;
  };

  return (
    <section className="card-section our-services-section">
      <div className="container">
        <div className="card-section-top-container our-services-section-top">
          <p>Our Services</p>
          <div className="card-section-top-btn-container our-services-section-top-btn-container">
            <button
              className="card-prev-btn prev-service-btn"
              id="prev-service-btn"
              disabled={!services?.length > 0}
            >
              <div />
            </button>
            <button
              className="card-next-btn next-service-btn"
              id="next-service-btn"
              disabled={!services?.length > 0}
            >
              <div />
            </button>
          </div>
        </div>

        <div className="card-list-wrapper mt-24">
          {services && services.length > 0 ? (
            <Swiper
              navigation={{
                prevEl: "#prev-service-btn",
                nextEl: "#next-service-btn",
              }}
              modules={[Navigation]}
              spaceBetween={28}
              slidesPerView={getCardsCountInOneRow()}
            >
              {services.map((service, index) => {
                return (
                  <SwiperSlide key={`service-${index}`}>
                    <div className={`card`}>
                      <button
                        onClick={() => navigate(`/services/${service.header}`)}
                      >
                        <img
                          src={getServiceImage(service.header)}
                          alt={service.header}
                        ></img>
                        <p>{service.header}</p>
                      </button>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            Array.from(Array(getCardsCountInOneRow()).keys()).map((index) => {
              return (
                <div key={`service-${index}`}>
                  <Skeleton height={190} width={150} className="mx-2" />
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(OurServicesSection);
