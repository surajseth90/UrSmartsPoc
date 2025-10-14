import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import SwiperNavigation from "../../app/SwiperNavigation";
import { useSelector } from "react-redux";
import TestimonialCard from "./TestimonialCard";

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

  const getCardsCountInOneRow = () => {
    let count = 0;
    dimension.containerSize > 992
      ? (count = 3)
      : dimension.containerSize < 992 && dimension.containerSize > 576
        ? (count = 2)
        : (count = 1);

    return count;
  };

  return (
    <section className="w-100 testimonial section-padding">
      <div className="container">
        <h2 className="h3-heading">What Our Customers Say</h2>
        <h2 className="h3-heading">About Us</h2>


        <div className="w-100 position-relative testimonials-wrapper mt-5">
          {data && data.length > 0 ? (
            <Swiper
              navigation={{
                prevEl: "#prev-feedback-btn",
                nextEl: "#next-feedback-btn",
              }}
              pagination={true}
              modules={[Pagination, Navigation]}
              spaceBetween={30}
              slidesPerView={getCardsCountInOneRow()}
            >
              {data.map((feedback, key) => {
                return (
                  <SwiperSlide key={`feedbacks-row-${key}`}>
                    <TestimonialCard feedback={feedback} />
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
