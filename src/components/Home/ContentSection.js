import React from "react";

export default function ContentSection() {
  function SVGImg() {
    return (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="96"
          height="96"
          viewBox="0 0 96 96"
          fill="none"
        >
          <g clip-path="url(#clip0_337_288)">
            <path
              d="M56.24 39.76L48 36L56.24 32.24L60 24L63.76 32.24L72 36L63.76 39.76L60 48L56.24 39.76ZM16 56L19.76 47.76L28 44L19.76 40.24L16 32L12.24 40.24L4 44L12.24 47.76L16 56ZM34 36L38.36 26.36L48 22L38.36 17.64L34 8L29.64 17.64L20 22L29.64 26.36L34 36ZM18 82L42 57.96L58 73.96L92 35.72L86.36 30.08L58 61.96L42 45.96L12 76L18 82Z"
              fill="black"
            />
          </g>
          <defs>
            <clipPath id="clip0_337_288">
              <rect width="96" height="96" fill="white" />
            </clipPath>
          </defs>
        </svg>

        <div className="line"></div>
      </>
    );
  }

  return (
    <section className="home-page-content-section w-100">
      <div className="container">
        <p className="text-center mb-3 font-medium">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book.
        </p>

        <div className="row pt-5">
          <div className="col-lg-4 col-md-5 d-flex flex-column align-items-center px-4">
            {SVGImg()}
            <p className="font-bold text-center">State of modern retailing report 2025</p>
          </div>

          <div className="col-lg-4 col-md-5 d-flex flex-column align-items-center px-4">
            {SVGImg()}
            <p className="font-bold text-center">State of modern retailing report 2025</p>
          </div>

          <div className="col-lg-4 col-md-5 d-flex flex-column align-items-center px-4">
            {SVGImg()}
            <p className="font-bold text-center">State of modern retailing report 2025</p>
          </div>
        </div>
      </div>
    </section>
  );
}
