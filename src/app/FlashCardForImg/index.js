import React, { useRef, useState } from "react";

export default function Index({ data, setPopupData }) {
  const [hovered, setIsHovered] = useState(false);
  const timerRef = useRef();
  const imgRef = useRef();

  const onHoverHandle = () => {
    let index = 0;
    setIsHovered(true);
    // timerRef.current = setInterval(() => {
    //   imgRef.current.src = data.hoverImgs[index];
    //   if (index == data.hoverImgs.length - 1) {
    //     index = 0;
    //   } else index++;
    // }, 1000);
  };

  const onHoverLeaveHandle = () => {
    console.log("timerRef.current", timerRef.current);

    // clearInterval(timerRef.current);
    // imgRef.current.src = data.displayImg;
    setIsHovered(false);
    console.log("timerRef.current", timerRef.current);
  };

  return (
    <div
      className="d-flex flex-column position-relative img-flash-card-wrapper"
      onMouseOver={onHoverHandle}
      onMouseLeave={onHoverLeaveHandle}
    >
      <img
        ref={imgRef}
        className="w-100 story-img"
        src={data.displayImg}
        alt=""
      />
      <div
        className={`w-100 story-btn position-absolute top-0 h-100 flex-center flex-column gap-4 ${
          hovered ? "visible" : "invisible"
        }`}
      >
        <div
          className="bg-primary position-absolute top-0 w-100 h-100"
          style={{ opacity: 0.7 }}
        ></div>
        <span className="text-white z-1 position-relative font-22">
          {data.city}
        </span>
        <button
          className="btn-secondary z-1 position-relative text-decoration-none"
          onClick={() => setPopupData(data)}
        >
          Read More
        </button>
      </div>
    </div>
  );
}
