import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import SwiperNavigation from "../../app/SwiperNavigation";
import { useSelector } from "react-redux";

const data = [
  {
    name: "Anuvrat & Tulika",
    feedback: `I would like to thank team UrSmartSpoc from bottom of my heart for arranging the birthday party of our cute little angel so well.
It was a perfect demonstration of our expectations meeting your commitments. Every single detail that you observed from us was taken care.<br />
There was no miscommunication, no hiccups and just perfection, we were worried a bit (as usual for any parent) but you handled each and every aspect of the party with grace and perfection.
Apart from all that, you went a step further, and even suggested some improvements and ideas which also were included and raised the overall experience to a new level.<br />
I will definitely recommend you and your organization to my friends and colleagues.`,
    img: "",
  },

  {
    name: "Paban and Bijoy",
    feedback:
      "Thanks Bevan and Charu for your excellent support and cooperation for making the event successful.",
    img: "",
  },

  {
    name: "Brizesh",
    feedback: `I would like to thank you and your team for your efforts in helping us host iUnite 2017 at Goa, Varca Beach.<br />
Right from the stay, to the location, to the service, to the food, everything was good, Which is something of an accomplishment in itself. <br />
I have rarely seen all factors swing and fit so well.<br />
Kudos to All of You and Keep Up the Good Work!!!`,
    img: "",
  },

  {
    name: "Mr. & Mrs. Suresh Yadav",
    feedback: `
We thank you from the bottom of our hearts for arranging the wonderful trip to Goa which truly deserves an applause from us.
<br />
Time just flew by and had not even realised how quickly we had completed 20 years of our marriage.  We wanted to spend some quiet moments enjoying nature and reflecting upon the good old memories.  A common friend had suggested us to approach the B & H Company for a tour package, which we think was the best thing done.  Our stay in Neelam’s Grand and the planning done for sightseeing is worth mentioning, the memories of which would be etched in our hearts forever.
<br />
On mentioning that this would be our first such tour, the efforts taken by the team to make the trip unforgettable and the follow up done to ensure the comfort and safety is truly commendable.  More than the business relationship, the personal touch given by the team had made us feel very homely and we would be looking forward to go on more such tours organized by you.`,
    img: "",
  },

  {
    name: "Prakash",
    feedback: `What an incredible experience: from check in to check out! We can’t say enough about how special you made us feel and the group games were fantastic! I totally recommend this beautiful experience to other teams within company and friends.
<br />
To add it food and service all worthy of a five star rating,
<br />
Thanks Bevan for taking care of team building/food and your recommendation for the place.
<br />
Thank you all very much and I wish you all the most in happiness and success...in that order!`,
    img: "",
  },
  {
    name: "Divya and Sawan",
    feedback: `
This email is regarding the feedback of Andaman trip.

<ol>
<li>
1. We had an amazing experience and wonderful memories with all the boat and ferry rides. The best experience was Scba diving.
</li>
<li>
2. Bevan, Charu and all the assigned  spoc were very supportive. Thanks for covering all the places which we wanted to visit. And we would also want to thank you for suggesting good vegetarian restaurant :) 
</li>
<li>
3. We just loved the accommodation which were near beach side.
</li>
</ol>

More or less it was one of the best trips which we have had, you guys are amazing in co-ordinating. We would love to go for many more trips organised by you guys.`,
    img: "",
  },
];

export default function Testimonial() {
  const [dimension] = useSelector((state) => [state.dimension]);

  return (
    <section className="w-100 testimonial section-padding">
      <div className="container">
        <h2 className="text-center">WHAT OUR CUSTOMER SAYS</h2>

        <div className="w-100 position-relative testimonials-wrapper">
          {data && data.length > 0 ? (
            <Swiper
              navigation={{
                prevEl: "#prev-feedback-btn",
                nextEl: "#next-feedback-btn",
              }}
              pagination={true}
              modules={[Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={dimension.containerSize > 786 ? 2 : 1}
            >
              {data.map((feedback, key) => {
                return (
                  <SwiperSlide key={`feedbacks-row-${key}`}>
                    <div className="d-flex flex-column card h-100 position-relative">
                      <div className="position-absolute  quote">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="60px"
                          height="60px"
                          viewBox="0 0 60 60"
                          version="1.1"
                        >
                          <g
                            id="Asset-Artboard-Page"
                            stroke="none"
                            stroke-width="1"
                            fill="none"
                            fill-rule="evenodd"
                          >
                            <g id="quote-copy">
                              <g id="quote">
                                <rect
                                  id="Rectangle"
                                  x="0"
                                  y="0"
                                  width="60"
                                  height="60"
                                />
                                <g
                                  id="Group-32"
                                  transform="translate(1.000000, 3.000000)"
                                  fill="#FF8453"
                                >
                                  <g id="Group-30">
                                    <path
                                      d="M22.5894737,24.1875902 L22.5894737,46.952381 L0,46.952381 L0,31.3015873 C0,25.3393504 0.983615895,19.8514646 2.95087719,14.8377654 C4.91813849,9.82406618 8.34383523,4.87819384 13.2280702,0 L21.5719298,6.50422593 C17.7730804,10.4338821 15.1953284,14.1263484 13.8385965,17.5817357 C12.9896363,19.7439066 12.4062939,21.9458494 12.0885642,24.1875902 L22.5894737,24.1875902 Z M10.9368366,25.1875902 L11.0984596,24.0472592 C11.4271884,21.7279136 12.030537,19.4504516 12.907777,17.2162564 C14.2235408,13.8652087 16.6190546,10.3353727 20.0876409,6.61512283 L13.3146383,1.33541524 C8.85279718,5.916245 5.71149433,10.539881 3.88178066,15.2030307 C1.96142681,20.0971831 1,25.4612693 1,31.3015873 L1,45.952381 L21.5894737,45.952381 L21.5894737,25.1875902 L10.9368366,25.1875902 Z"
                                      id="Path"
                                      fill-rule="nonzero"
                                    />
                                    <path
                                      d="M18.557373,9.06835938 C20.4206543,10.4934082 21.5047607,11.3846436 23,12.5443115 C19.0176114,16.5066325 16.3493171,20.3921712 14.9951172,24.2009277 L11,24.2009277 C13.1995056,16.9538449 15.7186299,11.9096554 18.557373,9.06835938 Z"
                                      id="Path-29"
                                    />
                                    <polygon
                                      id="Path-30"
                                      points="24.4174805 30.3447266 22.4389648 30.3447266 22.4389648 45.952381 2 45.952381 2 52.9697266 24.4174805 52.9697266"
                                    />
                                  </g>
                                  <g
                                    id="Group-30"
                                    transform="translate(33.000000, 0.000000)"
                                  >
                                    <path
                                      d="M22.5894737,24.1875902 L22.5894737,46.952381 L0,46.952381 L0,31.3015873 C0,25.3393504 0.983615895,19.8514646 2.95087719,14.8377654 C4.91813849,9.82406618 8.34383523,4.87819384 13.2280702,0 L21.5719298,6.50422593 C17.7730804,10.4338821 15.1953284,14.1263484 13.8385965,17.5817357 C12.9896363,19.7439066 12.4062939,21.9458494 12.0885642,24.1875902 L22.5894737,24.1875902 Z M10.9368366,25.1875902 L11.0984596,24.0472592 C11.4271884,21.7279136 12.030537,19.4504516 12.907777,17.2162564 C14.2235408,13.8652087 16.6190546,10.3353727 20.0876409,6.61512283 L13.3146383,1.33541524 C8.85279718,5.916245 5.71149433,10.539881 3.88178066,15.2030307 C1.96142681,20.0971831 1,25.4612693 1,31.3015873 L1,45.952381 L21.5894737,45.952381 L21.5894737,25.1875902 L10.9368366,25.1875902 Z"
                                      id="Path"
                                      fill-rule="nonzero"
                                    />
                                    <path
                                      d="M18.557373,9.06835938 C20.4206543,10.4934082 21.5047607,11.3846436 23,12.5443115 C19.0176114,16.5066325 16.3493171,20.3921712 14.9951172,24.2009277 L11,24.2009277 C13.1995056,16.9538449 15.7186299,11.9096554 18.557373,9.06835938 Z"
                                      id="Path-29"
                                    />
                                    <polygon
                                      id="Path-30"
                                      points="24.4174805 30.3447266 22.4389648 30.3447266 22.4389648 45.952381 2 45.952381 2 52.9697266 24.4174805 52.9697266"
                                    />
                                  </g>
                                </g>
                              </g>
                            </g>
                          </g>
                        </svg>
                      </div>
                      <div className="card-body">
                        <h3 className="card-title font-bold text-uppercase">
                          {feedback.name}
                        </h3>

                        <p
                          className="font-14 mt-3 card-text"
                          dangerouslySetInnerHTML={{
                            __html: feedback.feedback,
                          }}
                        ></p>
                      </div>
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
          ) : (
            <p>No Feedback</p>
          )}

          <SwiperNavigation
            containerClass="position-absolute bottom-0"
            prevId="prev-feedback-btn"
            nextId="next-feedback-btn"
          />
        </div>
      </div>
    </section>
  );
}
