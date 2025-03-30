import React from "react";
import RocketImg from "../../assets/images/rocket.svg";

function HowMudWorksSection() {
  return (
    <section className="card-section how-mud-works-section">
      <div className="container">
        <div className="card-section-top-container our-services-section-top">
          <p>How Mud Works </p>
        </div>
        <ul className="card-list-wrapper mt-24 row">
          <li className="card-wrapper col-md-4 mb-3">
            <div className="card">
              <img
                src={RocketImg}
                aria-hidden
                alt="send logo"
                className="rocket-img"
              ></img>
              <span>Post your requirement</span>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <div>
                <button>READ MORE</button>
              </div>
            </div>
          </li>
          <li className="card-wrapper col-md-4 mb-3">
            <div className="card">
              <img
                src={RocketImg}
                aria-hidden
                alt="send logo"
                className="rocket-img"
              ></img>
              <span>Get customised responses</span>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <div>
                <button>READ MORE</button>
              </div>
            </div>
          </li>
          <li className="card-wrapper col-md-4 mb-3">
            <div className="card">
              <img
                src={RocketImg}
                aria-hidden
                alt="send logo"
                className="rocket-img"
              ></img>
              <span>Select the best professional</span>
              <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </p>
              <div>
                <button>READ MORE</button>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default React.memo(HowMudWorksSection);
