import React, { useEffect, useState } from "react";
import "./style.scss";
import { useDispatch } from "react-redux";
import { setIsOverlay } from "../../../action";

export default function RejectPopup(props) {
  const { setIsPopupOpened } = props;
  const [starsCount, setStarsCount] = useState(0);
  const [hoverStarsCount, setHoverStarsCount] = useState(0);

  const dispatch = useDispatch();

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(setIsOverlay(true));
    document.body.style.overflow = "hidden";

    return () => {
      dispatch(setIsOverlay(false));
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className={`ratings-popup-container`}>
      <div className={`ratings-popup-wrapper`}>
        <div className="rating-popup-top d-flex justify-content-between w-100 align-items-center ">
          <p className="label-black font-18 font-bold">Write a Review</p>
          <button
            className="close-btn"
            onClick={() => {
              setIsPopupOpened(false);
            }}
          ></button>
        </div>

        <form onSubmit={reviewSubmitHandler} className="w-100">
          <div className="star-wrapper text-center">
            <label htmlFor="" className="label-grey font-12">
              Click to star to rate
            </label>
            <div className="d-flex justify-content-center mt-2">
              {Array.from(Array(5).keys()).map((star) => {
                return (
                  <div
                    className="star-main position-relative ms-2 me-2 d-flex"
                    key={`star_${star}`}
                  >
                    <div
                      className={`star-left ${
                        hoverStarsCount > 0
                          ? hoverStarsCount >= star + 0.5
                            ? "star-filled"
                            : ""
                          : starsCount >= star + 0.5
                          ? "star-filled"
                          : ""
                      }`}
                    ></div>
                    <div
                      className={`star-right ${
                        hoverStarsCount > 0
                          ? hoverStarsCount >= star + 1
                            ? "star-filled"
                            : ""
                          : starsCount >= star + 1
                          ? "star-filled"
                          : ""
                      }`}
                    ></div>

                    <svg
                      className="position-absolute top-0 end-0 start-0 bottom-0 m-auto"
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 18 18"
                      fill="none"
                    >
                      <path
                        d="M9.68812 1.95161C9.56921 1.67742 9.29888 1.5 9.00003 1.5C8.70118 1.5 8.43085 1.67742 8.31195 1.95161L6.56975 5.96904L2.18124 6.37323C1.88241 6.40075 1.62875 6.60376 1.53641 6.88931C1.44408 7.17485 1.53085 7.48795 1.75699 7.68523L5.06451 10.5706L4.0969 14.834C4.03065 15.1259 4.14432 15.4293 4.38608 15.6058C4.62784 15.7823 4.9514 15.7981 5.20925 15.646L9.00003 13.4108L12.7908 15.646C13.0487 15.7981 13.3722 15.7823 13.614 15.6058C13.8557 15.4293 13.9694 15.1259 13.9032 14.834L12.9356 10.5706L16.2431 7.68523C16.4692 7.48795 16.556 7.17485 16.4637 6.88931C16.3713 6.60376 16.1177 6.40075 15.8188 6.37323L11.4303 5.96904L9.68812 1.95161Z"
                        fill="#FFF"
                      ></path>
                    </svg>

                    <button
                      className="star-left-btn position-absolute top-0 start-0"
                      onClick={() => setStarsCount(star + 0.5)}
                      onMouseOver={() => setHoverStarsCount(star + 0.5)}
                      onMouseLeave={() => setHoverStarsCount(0)}
                    ></button>
                    <button
                      className="star-right-btn position-absolute top-0 end-0"
                      onClick={() => setStarsCount(star + 1)}
                      onMouseOver={() => setHoverStarsCount(star + 1)}
                      onMouseLeave={() => setHoverStarsCount(0)}
                    ></button>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="review-input-wrapper w-100">
            <label htmlFor="review" className="label-black">
              Write a review
            </label>
            <textarea
              name="review"
              id="review"
              className="w-100 p-2 "
            ></textarea>
          </div>

          <div className="rating-popup-bottom w-100">
            <button className="btn-orange w-100" type="submit">
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
