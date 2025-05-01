import { memo, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Navigation, Pagination } from "swiper/modules";
import { useSelector } from "react-redux";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import SwiperNavigation from "../../app/SwiperNavigation";
import ContentPopup from "../Popups/ContentPopup";
import BG from "../../assets/images/our_services_bg.svg"

function OurServicesSection() {
  const [dimension] = useSelector((state) => [state.dimension]);

  const [popupData, setPopupData] = useState(null);

  const services = [
    {
      title: "Meetings Incentives Conferences & Events (MICE)",
      img: "https://static.wixstatic.com/media/ffe6585db17945ceb809f43fc0fe4563.jpg/v1/fill/w_330,h_227,al_c,q_80,usm_0.66_1.00_0.01/ffe6585db17945ceb809f43fc0fe4563.jpg",
      description: `A corporate Industry word meant for organizing special events and Includes and involvement of various departments and for organizing special function or events in the corporate industry.<br />
Meetings: are organized by Corporate to recognize their staff  or for the lauch  of the new process or produts \or to have educational corporate trainings like Annual General Meetings, committee meetings or board meetings, sales & KICK OFF meetings, dealers meetings & press meets.
<br />

Incentives: Are the special drive given as a performance of an individual or a team on the achievements of the previous years. It’s a recognition,rewards  or recognition for the staff or an individual. <br />

Conference: A corporate gathering to discuss the proposals of target, services or the revenue projection and target discussions.  <br />

Exhibition: Group of companies or individual company. Gather to display their products, Projects or services, Corporate gifting they cater too`,
    },

    {
      title: "Event Management",
      img: "https://static.wixstatic.com/media/59c6e2cb6aa2414da2cc1c6a0794a772.jpg/v1/fill/w_330,h_227,al_c,q_80,usm_0.66_1.00_0.01/59c6e2cb6aa2414da2cc1c6a0794a772.jpg",
      description: `From the creation, direction and planning UrSmartSpoc excels in all type of Event Management Services. <br/>
        <ol>
        <li>Educational Tours</li>
        <li>Destination Weddings</li>
        <li>Team Buildings Activities</li>
        <li>Festivals  Events</li>
        <li>Fashion shows</li>
        <li>Sports events</li>
        <li>Concerts</li>
        <li>Product Launches</li>
        </ol>
`,
    },

    {
      title: "Corporate Travel & Stays",
      img: "https://static.wixstatic.com/media/4fdcc5e208e3422e9849d87782a32da3.jpg/v1/fill/w_330,h_227,al_c,q_80,usm_0.66_1.00_0.01/4fdcc5e208e3422e9849d87782a32da3.jpg",
      description: `We offer an extended help to travel at the cited designated  Managers / Executives of theWorld towards sourcing cost-effective, comfortable and secured appropriate accommodation in all business centres (hotels or home) across India and Overseas. Under our company, we manage all kinds of business. UrSmartSpoc has huge inventory of Hotels, Resorts, Service apartments and Homeacross India as well as overseas. Each category of businessoption are vetted by online application and property verification via phone interviews and visits before being added to our informative book and also selected according to location and needs of Business necessities.<br />

Categories Offered: Hotels, Boutique Hotels, Resorts, Theme Stays, Bed n Breakfast, Service Apartments, Home Stays.`,
    },

    {
      title: "Personal Travel & Stays",
      img: "https://static.wixstatic.com/media/431c1d457f4b73b2a924fa4620d8fbf8.jpg/v1/fill/w_330,h_227,al_c,q_80,usm_0.66_1.00_0.01/431c1d457f4b73b2a924fa4620d8fbf8.jpg",
      description: `UrSmartSpoc promises to guide your travel program -the Right way. We ensure that an individual receives personal care and attention from our Customer relationship team while on the travel. We also help you in customizing the itinerary to meet your needs and interests.<br />

FIT - Fully Independent Travelers or Tourists <br/>
A small number of travelers  ( less than 5 heads or couples) who take packaged tours at a time of their choice from UrSmartSpoc. <br />

GIT - Group Inclusive Tour <br />

A special tailor made group travel program as per the client needs and requirements in a budgeted amount.`,
    },
    {
      title: "Training",
      img: "https://static.wixstatic.com/media/afabc666b9fc4b6fb31316bc556eaf8d.jpg/v1/fill/w_330,h_227,al_c,q_80,usm_0.66_1.00_0.01/afabc666b9fc4b6fb31316bc556eaf8d.jpg",
      description: `We deliver training solutions to Corporates and Individuals, these learning modules cover the key competencies and management skills to handle business issues faced on daily basis.<br />

Our learning modules offer an ideal way to build knowledge and competencies with large numbers of employees at your organisation in an efficient and unobtrusive way.<br />

We delivered class-room sessions followed by sharing useful resources for continued learning! Along with worksheet to retain learning.
`,
    },
    {
      title: "Hospitality Consultancy Services",
      img: "https://static.wixstatic.com/media/1eb0b92eb55844d9b0a789551737e65e.jpg/v1/fill/w_330,h_227,al_c,q_80,usm_0.66_1.00_0.01/1eb0b92eb55844d9b0a789551737e65e.jpg",
      description: `UrSmartSpoc team will help you to convert your property into a Homestay, Serviced Apartment, Hotel, Resort, or a Condominium. <br />

The checklist of things which we do for you under our consultation:
<ol>
<li>Help, plan, organize and design your property for business goals. </li>
<li>Analyze the business prospects and revenue growth.</li>
<li>Target prospect for business and contracting.</li>
<li>Evaluate the competition which includes other hotels, home stays, resorts and service apartments. 
</li>
<li>Plan packages that will appeal to the target market.
</li>
<li>Calculate the costs of required property upgrades, remodeling and furnishings</li>
<li>Promote the sales and marketing of property through UrSmartSpoc
</li>

</ol>
`,
    },
    {
      title: "Timeshare Membership",
      img: "https://static.wixstatic.com/media/06c4e0b8cf09405cb6fe47d91b4ffda4.jpg/v1/fill/w_330,h_227,al_c,q_80,usm_0.66_1.00_0.01/06c4e0b8cf09405cb6fe47d91b4ffda4.jpg",
      description: `To plan a Vacation at a reasonable cost and effort free  ... All it requires is planning with your vacation consultant at UrSmartSpoc.
<br />
Timeshare membership is a holiday vacation membership and it’s an ownership of 25 years, each year getting 7 nights for a family holiday on the prepaid cost on various payment options. UrSmartSpoc is into selling of timeshare membership and you can avail domestic and international holidays. We are focused on providing the utmost in luxury, flexibility and service to our travelers. Buy a membership from us and save up to 70% off on future vacations. Explore with us renowned vacation destinations and can still get spacious suites, luxurious amenities, and upscale resort features for less than half of the retail developer price! So don’t hold back on your annual vacations and lack of comfort for your family. Buy a timeshare membership. Ursmartspoc is there to assist and you enjoy your dream vacation for years to come, without sacrificing your budget...`,
    },
  ];

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
    <section id="services" className="card-section our-services-section bg position-relative section-padding">
      <img src={BG} className="position-absolute top-0 start-0 h-100 our-services-section-bg w-100"/>
      <div className="container">
        <h3 className="text-center">BEST OF OUR SERVICES</h3>

        <div className="mt-50 d-flex justify-content-space-between">
          {services && services.length > 0 ? (
            <Swiper
              navigation={{
                prevEl: "#prev-service-btn",
                nextEl: "#next-service-btn",
              }}
              pagination={true}
              modules={[Pagination, Navigation]}
              spaceBetween={38}
              slidesPerView={getCardsCountInOneRow()}
            >
              {services.map((service, index) => {
                return (
                  <SwiperSlide key={`service-${index}`}>
                    <div className={`card w-100 h-100 bg-white`}>
                      <div className="card-body">
                        <img
                          className="service-img w-100"
                          src={service.img}
                          alt={service.header}
                        ></img>
                        <h4 className="mt-3">{service.title}</h4>
                      </div>
                      <div className="card-footer bg-transparent border-0">
                        <button
                          onClick={() => setPopupData(service)}
                          className="text-btn-primary"
                          aria-label="Read More"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="135"
                            height="40"
                            viewBox="0 0 135 40"
                            fill="none"
                          >
                            <path
                              d="M2.45837 25.03V13.7566H7.01306C7.82035 13.7566 8.51306 13.8998 9.09119 14.1863C9.66931 14.4727 10.112 14.8764 10.4193 15.3972C10.7266 15.9181 10.8802 16.5378 10.8802 17.2566V17.2722C10.8802 18.017 10.6927 18.6785 10.3177 19.2566C9.94796 19.8295 9.42973 20.2358 8.76306 20.4753L11.224 25.03H8.92712L6.70837 20.7878C6.69796 20.7878 6.68233 20.7878 6.6615 20.7878C6.64067 20.7878 6.62244 20.7878 6.60681 20.7878H4.474V25.03H2.45837ZM4.474 19.241H6.80212C7.44275 19.241 7.94014 19.0717 8.29431 18.7332C8.64848 18.3946 8.82556 17.9233 8.82556 17.3191V17.3035C8.82556 16.7149 8.64067 16.2488 8.27087 15.905C7.90629 15.5561 7.40369 15.3816 6.76306 15.3816H4.474V19.241ZM16.5209 25.2019C15.6719 25.2019 14.9427 25.0222 14.3334 24.6628C13.7292 24.3035 13.2631 23.7931 12.9349 23.1316C12.6068 22.4701 12.4427 21.6863 12.4427 20.78V20.7722C12.4427 19.8764 12.6042 19.0951 12.9271 18.4285C13.2552 17.7618 13.7188 17.2462 14.3177 16.8816C14.9167 16.5118 15.6198 16.3269 16.4271 16.3269C17.2396 16.3269 17.9375 16.5066 18.5209 16.866C19.1094 17.2201 19.5625 17.7175 19.8802 18.3582C20.198 18.9988 20.3568 19.7488 20.3568 20.6082V21.2488H13.4193V19.9441H19.4037L18.4818 21.1628V20.3894C18.4818 19.8217 18.3959 19.3503 18.224 18.9753C18.0521 18.6003 17.8125 18.3191 17.5052 18.1316C17.2032 17.9441 16.8516 17.8503 16.4506 17.8503C16.0495 17.8503 15.6927 17.9493 15.3802 18.1472C15.073 18.3399 14.8282 18.6264 14.6459 19.0066C14.4688 19.3816 14.3802 19.8425 14.3802 20.3894V21.1707C14.3802 21.6967 14.4688 22.1472 14.6459 22.5222C14.823 22.892 15.073 23.1785 15.3959 23.3816C15.724 23.5795 16.112 23.6785 16.5599 23.6785C16.9089 23.6785 17.2084 23.629 17.4584 23.53C17.7136 23.4259 17.9193 23.3035 18.0756 23.1628C18.2318 23.017 18.3412 22.879 18.4037 22.7488L18.4271 22.6941H20.2709L20.2552 22.7644C20.1875 23.0404 20.0625 23.3217 19.8802 23.6082C19.7032 23.8894 19.461 24.1524 19.1537 24.3972C18.8516 24.6368 18.4818 24.8321 18.0443 24.9832C17.6068 25.129 17.099 25.2019 16.5209 25.2019ZM24.6302 25.1707C24.0938 25.1707 23.612 25.0665 23.1849 24.8582C22.7631 24.6498 22.4297 24.3556 22.1849 23.9753C21.9454 23.5899 21.8256 23.1368 21.8256 22.616V22.6003C21.8256 22.0951 21.9506 21.6602 22.2006 21.2957C22.4506 20.9259 22.8177 20.6368 23.3021 20.4285C23.7865 20.2201 24.375 20.0977 25.0677 20.0613L28.224 19.866V21.1472L25.3412 21.3347C24.7943 21.366 24.3907 21.4806 24.1302 21.6785C23.8698 21.8764 23.7396 22.1524 23.7396 22.5066V22.5222C23.7396 22.8868 23.8776 23.1707 24.1537 23.3738C24.4349 23.5769 24.7917 23.6785 25.224 23.6785C25.6146 23.6785 25.9636 23.6003 26.2709 23.4441C26.5782 23.2878 26.8204 23.0769 26.9974 22.8113C27.1745 22.5404 27.2631 22.2358 27.2631 21.8972V19.1941C27.2631 18.767 27.1276 18.4415 26.8568 18.2175C26.586 17.9884 26.1849 17.8738 25.6537 17.8738C25.211 17.8738 24.849 17.9519 24.5677 18.1082C24.2865 18.2592 24.0964 18.4753 23.9974 18.7566L23.9896 18.7878H22.1537L22.1615 18.7175C22.224 18.2384 22.4115 17.8191 22.724 17.4597C23.0365 17.1003 23.4506 16.8217 23.9662 16.6238C24.4818 16.4259 25.0756 16.3269 25.7474 16.3269C26.487 16.3269 27.112 16.4415 27.6224 16.6707C28.1329 16.8946 28.5209 17.2227 28.7865 17.655C29.0521 18.0821 29.1849 18.5951 29.1849 19.1941V25.03H27.2631V23.8582H27.1302C26.974 24.129 26.7709 24.3634 26.5209 24.5613C26.2761 24.7592 25.9948 24.9102 25.6771 25.0144C25.3594 25.1186 25.0105 25.1707 24.6302 25.1707ZM34.599 25.1707C33.8907 25.1707 33.2735 24.9936 32.7474 24.6394C32.2214 24.28 31.8151 23.7696 31.5287 23.1082C31.2422 22.4467 31.099 21.6681 31.099 20.7722V20.7566C31.099 19.8503 31.2396 19.0691 31.5209 18.4128C31.8073 17.7514 32.211 17.2436 32.7318 16.8894C33.2579 16.53 33.8802 16.3503 34.599 16.3503C34.9896 16.3503 35.3542 16.4128 35.6927 16.5378C36.0313 16.6576 36.3282 16.8295 36.5834 17.0535C36.8438 17.2774 37.0469 17.5431 37.1927 17.8503H37.3334V13.1863H39.2709V25.03H37.3334V23.6941H37.1927C37.0365 24.0014 36.8308 24.267 36.5756 24.491C36.3256 24.7097 36.0339 24.879 35.7006 24.9988C35.3672 25.1134 35 25.1707 34.599 25.1707ZM35.2084 23.53C35.6511 23.53 36.0313 23.4207 36.349 23.2019C36.6719 22.9779 36.9193 22.6602 37.0912 22.2488C37.2683 21.8321 37.3568 21.3399 37.3568 20.7722V20.7566C37.3568 20.1837 37.2683 19.6915 37.0912 19.28C36.9193 18.8686 36.6719 18.5509 36.349 18.3269C36.0313 18.1029 35.6511 17.991 35.2084 17.991C34.7709 17.991 34.3907 18.1029 34.0677 18.3269C33.75 18.5457 33.5052 18.8634 33.3334 19.28C33.1615 19.6915 33.0756 20.1837 33.0756 20.7566V20.7722C33.0756 21.3451 33.1615 21.8373 33.3334 22.2488C33.5052 22.6602 33.75 22.9779 34.0677 23.2019C34.3855 23.4207 34.7657 23.53 35.2084 23.53ZM45.9896 25.03V16.491H47.9349V17.8191H48.0677C48.25 17.3451 48.5443 16.9779 48.9506 16.7175C49.362 16.4571 49.849 16.3269 50.4115 16.3269C50.7969 16.3269 51.1433 16.3894 51.4506 16.5144C51.7631 16.6394 52.0313 16.8165 52.2552 17.0457C52.4792 17.2748 52.6511 17.5483 52.7709 17.866H52.9115C53.0521 17.5587 53.2474 17.2904 53.4974 17.0613C53.7526 16.8269 54.0495 16.6472 54.3881 16.5222C54.7318 16.392 55.1016 16.3269 55.4974 16.3269C56.0704 16.3269 56.5599 16.4415 56.9662 16.6707C57.3776 16.8946 57.6927 17.2175 57.9115 17.6394C58.1355 18.0613 58.2474 18.5665 58.2474 19.155V25.03H56.3021V19.6316C56.3021 19.2566 56.2448 18.9467 56.1302 18.7019C56.0209 18.4571 55.8516 18.2722 55.6224 18.1472C55.3933 18.0222 55.1042 17.9597 54.7552 17.9597C54.4167 17.9597 54.1224 18.0378 53.8724 18.1941C53.6224 18.3451 53.4271 18.5509 53.2865 18.8113C53.1511 19.0717 53.0834 19.366 53.0834 19.6941V25.03H51.1381V19.491C51.1381 19.1733 51.0756 18.8998 50.9506 18.6707C50.8308 18.4415 50.6537 18.267 50.4193 18.1472C50.1901 18.0222 49.9167 17.9597 49.599 17.9597C49.2813 17.9597 48.9948 18.0431 48.7396 18.2097C48.4896 18.3712 48.2917 18.5951 48.1459 18.8816C48.0052 19.1628 47.9349 19.4806 47.9349 19.8347V25.03H45.9896ZM64.224 25.2019C63.375 25.2019 62.6433 25.0248 62.0287 24.6707C61.4141 24.3113 60.9401 23.8009 60.6068 23.1394C60.2787 22.4779 60.1146 21.6863 60.1146 20.7644V20.7488C60.1146 19.8373 60.2813 19.0509 60.6146 18.3894C60.948 17.7227 61.4193 17.2123 62.0287 16.8582C62.6433 16.504 63.375 16.3269 64.224 16.3269C65.073 16.3269 65.8021 16.504 66.4115 16.8582C67.0261 17.2123 67.5 17.7201 67.8334 18.3816C68.1667 19.0431 68.3334 19.8321 68.3334 20.7488V20.7644C68.3334 21.6863 68.1667 22.4779 67.8334 23.1394C67.5052 23.8009 67.0339 24.3113 66.4193 24.6707C65.8099 25.0248 65.0782 25.2019 64.224 25.2019ZM64.224 23.6238C64.6719 23.6238 65.0521 23.5118 65.3646 23.2878C65.6823 23.0587 65.9245 22.7332 66.0912 22.3113C66.2579 21.8842 66.3412 21.3712 66.3412 20.7722V20.7566C66.3412 20.1524 66.2579 19.6394 66.0912 19.2175C65.9245 18.7904 65.6823 18.4649 65.3646 18.241C65.0521 18.0118 64.6719 17.8972 64.224 17.8972C63.7761 17.8972 63.3933 18.0118 63.0756 18.241C62.7579 18.4649 62.5157 18.7904 62.349 19.2175C62.1823 19.6394 62.099 20.1524 62.099 20.7566V20.7722C62.099 21.3712 62.1823 21.8842 62.349 22.3113C62.5157 22.7384 62.7552 23.0639 63.0677 23.2878C63.3855 23.5118 63.7709 23.6238 64.224 23.6238ZM70.2865 25.03V16.491H72.2318V17.8035H72.3646C72.5105 17.3451 72.7709 16.9884 73.1459 16.7332C73.5261 16.4779 73.9974 16.3503 74.5599 16.3503C74.7058 16.3503 74.849 16.3608 74.9896 16.3816C75.1355 16.3972 75.2552 16.4181 75.349 16.4441V18.1863C75.1927 18.1498 75.0339 18.1238 74.8724 18.1082C74.7162 18.0873 74.5521 18.0769 74.3802 18.0769C73.948 18.0769 73.5704 18.1576 73.2474 18.3191C72.9245 18.4806 72.6745 18.7123 72.4974 19.0144C72.3204 19.3113 72.2318 19.6628 72.2318 20.0691V25.03H70.2865ZM80.3802 25.2019C79.5313 25.2019 78.8021 25.0222 78.1927 24.6628C77.5886 24.3035 77.1224 23.7931 76.7943 23.1316C76.4662 22.4701 76.3021 21.6863 76.3021 20.78V20.7722C76.3021 19.8764 76.4636 19.0951 76.7865 18.4285C77.1146 17.7618 77.5782 17.2462 78.1771 16.8816C78.7761 16.5118 79.4792 16.3269 80.2865 16.3269C81.099 16.3269 81.7969 16.5066 82.3802 16.866C82.9688 17.2201 83.4219 17.7175 83.7396 18.3582C84.0573 18.9988 84.2162 19.7488 84.2162 20.6082V21.2488H77.2787V19.9441H83.2631L82.3412 21.1628V20.3894C82.3412 19.8217 82.2552 19.3503 82.0834 18.9753C81.9115 18.6003 81.6719 18.3191 81.3646 18.1316C81.0625 17.9441 80.711 17.8503 80.3099 17.8503C79.9089 17.8503 79.5521 17.9493 79.2396 18.1472C78.9323 18.3399 78.6875 18.6264 78.5052 19.0066C78.3282 19.3816 78.2396 19.8425 78.2396 20.3894V21.1707C78.2396 21.6967 78.3282 22.1472 78.5052 22.5222C78.6823 22.892 78.9323 23.1785 79.2552 23.3816C79.5834 23.5795 79.9714 23.6785 80.4193 23.6785C80.7683 23.6785 81.0677 23.629 81.3177 23.53C81.573 23.4259 81.7787 23.3035 81.9349 23.1628C82.0912 23.017 82.2006 22.879 82.2631 22.7488L82.2865 22.6941H84.1302L84.1146 22.7644C84.0469 23.0404 83.9219 23.3217 83.7396 23.6082C83.5625 23.8894 83.3204 24.1524 83.0131 24.3972C82.711 24.6368 82.3412 24.8321 81.9037 24.9832C81.4662 25.129 80.9584 25.2019 80.3802 25.2019ZM98.7865 27.5378C97.6719 27.5378 96.6224 27.3243 95.6381 26.8972C94.6537 26.4753 93.7865 25.8894 93.0365 25.1394C92.2865 24.3894 91.698 23.5248 91.2709 22.5457C90.849 21.5613 90.6381 20.5092 90.6381 19.3894C90.6381 18.2748 90.849 17.2279 91.2709 16.2488C91.698 15.2644 92.2839 14.3972 93.0287 13.6472C93.7787 12.8972 94.6459 12.3113 95.6302 11.8894C96.6146 11.4623 97.6641 11.2488 98.7787 11.2488C99.8933 11.2488 100.943 11.4623 101.927 11.8894C102.917 12.3113 103.784 12.8972 104.529 13.6472C105.279 14.3972 105.867 15.2644 106.294 16.2488C106.721 17.2279 106.935 18.2748 106.935 19.3894C106.935 20.5092 106.721 21.5613 106.294 22.5457C105.867 23.5248 105.279 24.3894 104.529 25.1394C103.784 25.8894 102.919 26.4753 101.935 26.8972C100.951 27.3243 99.9011 27.5378 98.7865 27.5378ZM98.7865 25.7488C99.6667 25.7488 100.49 25.5847 101.255 25.2566C102.026 24.9285 102.703 24.4753 103.286 23.8972C103.87 23.3139 104.326 22.6394 104.654 21.8738C104.982 21.1029 105.146 20.2748 105.146 19.3894C105.146 18.5092 104.979 17.6863 104.646 16.9207C104.318 16.1498 103.862 15.4727 103.279 14.8894C102.701 14.3061 102.026 13.8503 101.255 13.5222C100.49 13.1941 99.6641 13.03 98.7787 13.03C97.8985 13.03 97.073 13.1941 96.3021 13.5222C95.5365 13.8503 94.862 14.3061 94.2787 14.8894C93.7006 15.4727 93.2474 16.1498 92.9193 16.9207C92.5964 17.6863 92.4349 18.5092 92.4349 19.3894C92.4349 20.2748 92.5964 21.1029 92.9193 21.8738C93.2474 22.6394 93.7032 23.3139 94.2865 23.8972C94.8698 24.4753 95.5443 24.9285 96.3099 25.2566C97.0808 25.5847 97.9063 25.7488 98.7865 25.7488ZM101.208 21.491C100.995 21.491 100.826 21.4233 100.701 21.2878C100.576 21.1472 100.513 20.9623 100.513 20.7332V19.5613L100.622 18.5066L99.6224 19.6082L96.9974 22.2332C96.836 22.3946 96.6407 22.4753 96.4115 22.4753C96.198 22.4753 96.0183 22.405 95.8724 22.2644C95.7266 22.1238 95.6537 21.9389 95.6537 21.7097C95.6537 21.5066 95.7344 21.3217 95.8959 21.155L98.5365 18.5222L99.6459 17.5144L98.6381 17.6394H97.3959C97.1667 17.6394 96.9818 17.5769 96.8412 17.4519C96.7006 17.3269 96.6302 17.1576 96.6302 16.9441C96.6302 16.7306 96.698 16.5613 96.8334 16.4363C96.974 16.3113 97.1615 16.2488 97.3959 16.2488H101.013C101.284 16.2488 101.497 16.3217 101.654 16.4675C101.815 16.6134 101.896 16.8347 101.896 17.1316V20.7253C101.896 20.9545 101.833 21.1394 101.708 21.28C101.583 21.4207 101.417 21.491 101.208 21.491Z"
                              fill="currentColor"
                            />
                          </svg>{" "}
                        </button>
                      </div>
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

        <SwiperNavigation
          containerClass="position-absolute bottom-0"
          prevId="prev-service-btn"
          nextId="next-service-btn"
        />
      </div>
      {popupData != null && (
        <ContentPopup
          img={popupData.img}
          title={popupData.title}
          description={popupData.description}
          onClose={() => setPopupData(null)}
        />
      )}
    </section>
  );
}

export default memo(OurServicesSection);
