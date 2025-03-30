import "./style.scss";
import { useState } from "react";

export default function FAQsPage() {
  const [expandedArray, setExpandedArray] = useState([]);

  const FAQsData = [
    {
      title: "How to create account?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      title: "How to login?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      title: "Forgot password?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      title: "How to check ongoing, upcoming and past bookings?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      title: "How to check Cancelled / Refund policy? ",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      title: "How to raise a complaint?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
    {
      title: "How to write review and rating to helpers?",
      description:
        "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
    },
  ];

  return (
    <div className="FAQs-page-wrapper">
      <section className="FAQs-top-container w-100">
        <div className="container-sm">
          <div className="about-mud-text">
            <h1>Frequently asked questions</h1>
            <p>
              It is a long established fact that a reader will be <br></br>{" "}
              distracted by the readable content of a page when <br></br>
              looking at its layout.
            </p>
          </div>
        </div>
      </section>
      <section style={{ marginTop: "48px" }}>
        <div className="container-sm">
          <ul>
            {FAQsData.length > 0 &&
              FAQsData.map((data, key) => {
                return (
                  <li key={`FAQ_${key}`} className="card position-relative">
                    <div className="d-flex justify-content-between">
                      <p className="FAQ-title" style={{ fontWeight: "bold" }}>
                        {data.title}
                      </p>
                      <button
                        className="faq-expand-btn position-relative"
                        onClick={() => {
                          if (expandedArray.includes(key)) {
                            let arr = [...expandedArray];
                            let index = expandedArray.indexOf(key);
                            arr.splice(index, 1);
                            setExpandedArray(arr);
                          } else {
                            let arr = [...expandedArray];
                            arr.push(key);
                            setExpandedArray(arr);
                          }
                        }}
                      >
                        <div className="plus-sign-animation position-absolute"></div>
                        <div
                          className={`plus-sign-animation position-absolute ${
                            expandedArray.includes(key) ? "" : "verticle"
                          }`}
                        ></div>
                      </button>
                    </div>
                    {expandedArray.includes(key) ? (
                      <p className="FAQ-description text-grey">
                        {data.description}
                      </p>
                    ) : (
                      ""
                    )}
                  </li>
                );
              })}
          </ul>
        </div>
      </section>
    </div>
  );
}
