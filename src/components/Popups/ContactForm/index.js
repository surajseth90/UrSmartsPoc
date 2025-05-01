// import React, { useEffect, useState } from "react";
// import emailjs from "@emailjs/browser";
// import { useDispatch } from "react-redux";
// import { setSnakeBarContent } from "../../../action";
// import "./style.scss";

// export default function ContentPopup({ onClose }) {
//   const [loading, setLoading] = useState(false);
//   const dispatch = useDispatch();
//   useEffect(() => {
//     document.body.scrollY = "hidden";

//     return () => {
//       document.body.scrollY = "auto";
//     };
//   }, []);

//   const submitHandler = async (e) => {
//     e.preventDefault();
//     setLoading(true);

//     await emailjs
//       .sendForm(
//         process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
//         process.env.REACT_APP_EMAIL_TEMPLATE_ID,
//         e.target,
//         {
//           publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY,
//         }
//       )
//       .then(
//         (res) => {
//           setLoading(false);
//           dispatch(setSnakeBarContent("Message Sent Successfully"));
//           onClose();
//         },
//         (error) => {
//           setLoading(false);
//           dispatch(
//             setSnakeBarContent(
//               "There is some issue on sending message, please try again later!"
//             )
//           );
//           onClose();
//           console.log("FAILED...", error.text);
//         }
//       );
//   };

//   return (
//     <div className="contact-form-popup-wrapper position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3">
//       <div className="overlay"></div>

//       <div className="contact-form-popup-container bg-white w-100 d-flex position-relative">
//         <button
//           onClick={onClose}
//           className="position-absolute close-btn"
//           title="close"
//           aria-label="close"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="23"
//             height="24"
//             viewBox="0 0 23 24"
//             fill="none"
//           >
//             <path
//               d="M1.94417 23.2692L0 21.325L9.5275 11.7971L0 2.2692L1.94417 0.325035L11.4721 9.85254L21 0.325035L22.9442 2.2692L13.4167 11.7971L22.9442 21.325L21 23.2692L11.4721 13.7417L1.94417 23.2692Z"
//               fill="white"
//             />
//           </svg>
//         </button>

//         <div className="w-100 d-flex flex-column align-items-center">
//           <h3>Contact Us</h3>
//           <form onSubmit={submitHandler} className="w-100">
//             <div className="w-100">
//               <input
//                 type="text"
//                 placeholder="Name"
//                 className="px-2 mb-3 rounded-3 w-100 mt-3"
//                 name="user_name"
//                 id="user_name"
//                 required
//               />
//             </div>

//             <div className="w-100">
//               <input
//                 type="email"
//                 placeholder="Email"
//                 className="px-2 mb-3 rounded-3 w-100"
//                 name="user_email"
//                 id="user_email"
//                 required
//               />
//             </div>

//             <div className="w-100">
//               <input
//                 type="text"
//                 placeholder="Phone"
//                 className="px-2 mb-3 rounded-3 w-100"
//                 name="user_phone"
//                 id="user_phone"
//                 required
//               />
//             </div>

//             <div className="w-100">
//               <input
//                 type="text"
//                 placeholder="Subject"
//                 className="px-2 mb-3 rounded-3 w-100"
//                 name="message_subject"
//                 id="message_subject"
//                 required
//               />
//             </div>

//             <div className="w-100">
//               <textarea
//                 placeholder="Message"
//                 style={{ height: "100px" }}
//                 className="px-2 mb-3 rounded-3 w-100"
//                 name="message_body"
//                 id="message_body"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="btn-primary w-100 d-flex justify-content-center mt-5"
//               disabled={loading}
//             >
//               {loading ? <div className="btn-loader-white"></div> : `Submit`}
//             </button>
//           </form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React, { useEffect, useState } from "react";
import emailjs from "@emailjs/browser";
import { useDispatch } from "react-redux";
import { setSnakeBarContent } from "../../../action";
import ContactUsFormImg from "../../../assets/images/ContactUsFormImg.jpg";
import "./style.scss";
import { mobileNumberValidator } from "../../../data";

export default function ContentPopup({ onClose }) {
  const [loading, setLoading] = useState(false);
  const [mobile, setMobile] = useState("")

  const dispatch = useDispatch();
  useEffect(() => {
    document.body.scrollY = "hidden";

    return () => {
      document.body.scrollY = "auto";
    };
  }, []);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);

    await emailjs
      .sendForm(
        process.env.REACT_APP_EMAIL_JS_SERVICE_ID,
        process.env.REACT_APP_EMAIL_TEMPLATE_ID,
        e.target,
        {
          publicKey: process.env.REACT_APP_EMAIL_PUBLIC_KEY,
        }
      )
      .then(
        (res) => {
          setLoading(false);
          dispatch(setSnakeBarContent("Message Sent Successfully"));
          onClose();
        },
        (error) => {
          setLoading(false);
          dispatch(
            setSnakeBarContent(
              "There is some issue on sending message, please try again later!"
            )
          );
          onClose();
          console.log("FAILED...", error.text);
        }
      );
  };

  return (
    <div className="contact-form-popup-wrapper position-fixed top-0 start-0 w-100 h-100 d-flex justify-content-center align-items-center p-3">
      <div className="overlay"></div>
      <div className="container h-100">
        <div className="contact-form-popup-container h-100 bg-white w-100 d-flex position-relative">
          <button
            onClick={onClose}
            className="position-absolute close-btn"
            title="close"
            aria-label="close"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="23"
              height="24"
              viewBox="0 0 23 24"
              fill="none"
            >
              <path
                d="M1.94417 23.2692L0 21.325L9.5275 11.7971L0 2.2692L1.94417 0.325035L11.4721 9.85254L21 0.325035L22.9442 2.2692L13.4167 11.7971L22.9442 21.325L21 23.2692L11.4721 13.7417L1.94417 23.2692Z"
                fill="white"
              />
            </svg>
          </button>

          <div className="d-flex w-100 gap-5 flex-column flex-md-row overflow-auto">
            <img src={ContactUsFormImg} alt="contact us" className="img-fluid w-md-50"/>
            <div className="d-flex flex-column align-items-center w-100">
              <form onSubmit={submitHandler} className="w-100">
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Name"
                    className="px-2 mb-4 w-100 mt-3"
                    name="user_name"
                    id="user_name"
                    required
                  />
                </div>

                <div className="w-100">
                  <input
                    type="email"
                    placeholder="Email"
                    className="px-2 mb-4 w-100"
                    name="user_email"
                    id="user_email"
                    required
                  />
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Phone"
                    className="px-2 mb-4 w-100"
                    name="user_phone"
                    id="user_phone"
                    required
                    value={mobile}
                    onChange={(e)=>setMobile(mobileNumberValidator(e.target.value))}
                  />
                </div>

                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Subject"
                    className="px-2 mb-4 w-100"
                    name="message_subject"
                    id="message_subject"
                    required
                  />
                </div>

                <div className="w-100">
                  <textarea
                    placeholder="Message"
                    style={{ height: "100px" }}
                    className="px-2 mb-4 w-100"
                    name="message_body"
                    id="message_body"
                    required
                  />
                </div>

                <div className="w-100">
                  <input
                    type="date"
                    placeholder="Date"
                    className="px-2 mb-4 w-100"
                    name="booking_date"
                    id="booking_date"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary float-end rounded-pill d-flex justify-content-center mt-3 w-max rounded-5"
                  disabled={loading}
                  style={{minWidth: "160px"}}
                >
                  {loading ? (
                    <div className="btn-loader-white"></div>
                  ) : (
                    `Submit`
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
