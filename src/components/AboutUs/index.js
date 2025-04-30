import "./style.scss";
import Team_Bevan from "../../assets/images/Team_Bevan.png";
import Team_Charu from "../../assets/images/Team_Charu.png";
import Team_Pradeep from "../../assets/images/Team_Pradeep.png";
import Team_Thaire from "../../assets/images/Team_Thaire.png";
import Team_Rajesh from "../../assets/images/Team_Rajesh.png";
import Team_Rishav from "../../assets/images/Team_Rishav.png";
import Team_Afreen from "../../assets/images/Team_Afreen.png";
import Team_Seema from "../../assets/images/Team_Seema.png";
import Team_Zeeshan from "../../assets/images/Team_Zeeshan.png";
import Team_Christina from "../../assets/images/Team_Christina.png";
import Team_Pooja from "../../assets/images/Team_Pooja.png";
import Team_Anjana from "../../assets/images/Team_Anjana.png";
import Team_Razia from "../../assets/images/Team_Razia.png";
import Team_Farha from "../../assets/images/Team_Farha.png";
import ReadMore from "../../app/ReadMoreText";

export default function AboutUsPage() {
  const leaders = [
    {
      name: "BEVAN MARIO HOGG",
      designation: "CEO & Founder",
      title: "#The Visionary",
      img: Team_Bevan,
      description: `
        Founder of B H & Company and UrSmartSpoc.com.  Bevan has been into hospitality industry for last 14 years and well-connected in his field domain. The dream of UrSmartSpoc began in his Hubli apartment and took its shape in Bangalore from Dreams to reality. A Great planner, quick in thought process & decision making and an entrepreneur from an early age. He has a great strategic vision & a zeal for customer service and client relationship. Bevan strongly believes in putting right people in to right place to make things happen for better. He had remarkably set up initial operations for one of the critical alternate revenue stream by ensure online booking strategy for trading partner and the member enrollment on line module and setting up the payment gateways on online business structure and development. He strongly believes in Quality and has been in various quality process in his career.
Worked in different roles from Customer service, quality, Customer retention, operations@ Accenture, @ Hutchinson India Ltd – Dial An Exchange Bangalore, @ RCI and @ Club Mahindra Holidays India Ltd Bangalore.
Bevan has never been afraid to try on different hats. He started UrSmartSpoc with three friends, and did everything from designing the Website to handling the smallest issues of company. A True Go Getter.
        `,
    },
    {
      name: "CHARU GUPTA",
      designation: "CFO & Co-Founder",
      title: "#The Strategist | The Implementation Expert",
      description:
        "Co-Founder of UrSmartSpoc, Charu is a technically competent professional with core strengths in handling Customer relationship, bringing customer view in the organization, people management skills and to steer business goals by devising appropriate team strategy and creating win-win situation. A master in managing client relationship Customer Acquisition, Business development and Marketing.  In the course of her association with leading institutions, she is equipped with presentation and people management skills. She manages new business development and major market coverage. Charu carries an experience in setting up various travel companies and its process. Along with managing the teams of Clients and Suppliers needs and necessity. Charu believes in simplicity and hard work that can create history along with experience. ",
      img: Team_Charu,
    },
  ];

  const makersTeam = [
    {
      name: "PRADEEP",
      title: "The Quota Crusher",
      img: Team_Pradeep,
      description: `The go-getter who smashes targets and makes things happen!`,
    },
    {
      name: "THAIRE",
      title: "The Adaptable",
      description:
        "Throw a curveball, and Thaire will hit it out of the park. Flexibility is his superpower!",
      img: Team_Thaire,
    },
  ];

  const strengthTeam = [
    {
      name: "RAJESH",
      title: "The Binder",
      img: Team_Rajesh,
      description: `The glue that keeps everything (and everyone) together!`,
    },
    {
      name: "RISHAV",
      title: "The Workaholic",
      description:
        "Work never stops, and neither does Rishav. If there’s a job to be done, he’s on it!",
      img: Team_Rishav,
    },

    {
      name: "AFREEN",
      title: "The Smarter",
      description: "Brains, strategy, and efficiency—all rolled into one!",
      img: Team_Afreen,
    },

    {
      name: "SEEMA",
      title: "The Dependable",
      description:
        "The one you can always count on. Seema delivers, no matter what!",
      img: Team_Seema,
    },

    {
      name: "ZEESHAN",
      title: "The Dreamer",
      description:
        "Big ideas, bold visions—Zeeshan is always thinking beyond the horizon!",
      img: Team_Zeeshan,
    },

    {
      name: "CHRISTINA",
      title: "The Quick Learner",
      description:
        "Throw a challenge her way, and she’ll master it in no time!",
      img: Team_Christina,
    },
  ];

  const moneyTeam = [
    {
      name: "POOJA",
      title: "The Accountable",
      img: Team_Pooja,
      description: `Balancing the books and keeping things in check with precision.`,
    },
  ];

  const facilityTeam = [
    {
      name: "FARHA",
      title: "Tele Dynamo (Sales)",
      img: Team_Farha,
      description: `Igniting every conversation into a sales opportunity.`,
    },
  ];

  return (
    <div className="about-page-wrapper bg-light-grey">
      <section className="bg-primary text-white py-5 w-100">
        <div className="container">
          <div className="about-mud-text">
            <h1 className="text-center text-uppercase font-bolder mb-0">
              Welcome to UrSmartSpoc – Where Travel Meets Passion!
            </h1>
            <h3 className="mb-1 text-center">
              “अतिथि देवो भव:” – Atithi Devo Bhava
            </h3>
            <p className="text-center font-24 mt-5">
              (We truly believe in treating our guests like gods!)
            </p>
          </div>
        </div>
      </section>

      <section className="text-section" style={{ marginTop: "60px" }}>
        <div className="container">
          <h3 className="text-center font-30 mb-4">What we do?</h3>
          <p className="font-20 text-center">
            At <strong>UrSmartSpoc</strong>, we don’t just plan trips—we craft
            experiences, fuel adventures, and turn your dreams into reality!
            With a combined <strong>30+ years of experience</strong>, our team
            of travel enthusiasts is on a mission to redefine hospitality and
            make every journey, event, and getaway extraordinary.
          </p>
        </div>
      </section>

      <section className="text-section" style={{ marginTop: "60px" }}>
        <div className="container">
          <h3 className="text-center font-30 mb-4">
            Your One-Stop Travel Gurus
          </h3>
          <p className="font-20 text-center">
            From luxury getaways to business conferences, dreamy weddings to
            seamless corporate bookings, we are your{" "}
            <strong>single point of contact</strong> for all things travel,
            hospitality, and events. Think of us as your
            <strong> 24/7/365 personal travel concierge</strong>—always on
            standby to make sure your plans unfold with perfection.
          </p>
        </div>
      </section>

      <section className="text-section" style={{ marginTop: "60px" }}>
        <div className="container">
          <h3 className="text-center font-30 mb-4">Why UrSmartSpoc?</h3>
          <ul className="d-flex justify-content-center gap-4 flex-wrap">
            <li className="font-18 text-white rounded-3 bg-primary text-center p-2">
              100,000+ hotel inventories worldwide – From budget stays to 5-star
              extravagance!
            </li>

            <li className="font-18 text-white rounded-3 bg-primary text-center p-2">
              10,000+ events organized – Big fat Indian weddings, corporate
              MICE, and everything in between!
            </li>
            <li className="font-18 text-white rounded-3 bg-primary text-center p-2">
              Global presence, local expertise – With a stronghold across India
              and Dubai, we’re always within reach.
            </li>
            <li className="font-18 text-white rounded-3 bg-primary text-center p-2">
              Tailor-made experiences – No cookie-cutter plans here! We
              customize every detail to fit your vision.
            </li>
            <li className="font-18 text-white rounded-3 bg-primary text-center p-2">
              Customer-first approach – Your satisfaction is our success. We
              don’t just aim to meet expectations—we exceed them!
            </li>
          </ul>
        </div>
      </section>

      <section className="text-section" style={{ marginTop: "60px" }}>
        <div className="container">
          <h3 className="text-center font-30 mb-4">Meet the Dream Team!</h3>
          <p className="font-20 text-center">
            Our <strong>team isn’t just working a job</strong>—we’re living our
            passion! Based in cities across{" "}
            <strong>
              Bangalore, Mumbai, Delhi, Hyderabad, Gurgaon, Aligarh, Hubli,
              Chennai, Lucknow, and Dubai
            </strong>
            , we hustle around the clock to make sure your travel is smooth,
            your events are spectacular, and your memories are unforgettable.
          </p>
          <p className="font-20">
            So, whether you need a{" "}
            <strong>
              last-minute booking, an exotic vacation, a seamless business trip,
              or an event that wows
            </strong>
            —we’ve got you covered
          </p>
        </div>
      </section>

      <section className="text-section" style={{ marginTop: "60px" }}>
        <div className="container">
          <h3 className="text-center font-30 mb-4">One Team, One Mission</h3>
          <p className="font-20 text-center">
            Together, we are on a mission to{" "}
            <strong>redefine travel and hospitality</strong>—delivering seamless
            experiences, exceeding expectations, and making every journey
            unforgettable. At <strong>UrSmartSpoc</strong>, our passion drives
            us, our expertise defines us, and our commitment to customer delight
            sets us apart.
          </p>
        </div>
      </section>

      <section className="meet-team-section">
        <div className="container">
          <div className="d-flex justify-content-center">
            <h3 className="d-inline-block">Meet Our Leadership Team</h3>
          </div>
          <div>
            <ul className="mt-3 flex-md-row flex-column d-flex align-items-start justify-content-center" style={{gap:"100px"}}>
              {leaders.length > 0 &&
                leaders.map((member, key) => {
                  return (
                    <li className="w-100 w-md-50 mb-5 leadership-li" key={`Leadership_${key}`}>
                      <div
                        className="d-flex justify-content-center align-items-center flex-column"
                      >
                        <img
                          src={member.img}
                          className="w-100 h-100 flex-wrap"
                        />
                        <div className="">
                          <p className="mb-3 font-22 font-bold mt-4 text-center">{member.name}</p>
                          <p className="font-20 mb-3 text-center">
                            {member.designation}
                          </p>

                          <p className="text-uppercase mb-5 text-primary text-center">{member.title}</p>

                          <ReadMore text={member.description} textClasses="text-center" btnClasses="mt-3"/>

                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>

      <section className="meet-team-section">
        <div className="container">
          <h3 className="mb-4 text-center">Meet Our Miracle Makers</h3>

          <p className="text-center">
            These are the superheroes making travel magic happen—no challenge
            too big, no request too small!
          </p>
          <div>
            <ul className="d-flex mt-3 justify-content-center miracle-makers flex-wrap align-items-start">
              {makersTeam.length > 0 &&
                makersTeam.map((member, key) => {
                  return (
                    <li
                      className="d-flex align-items-center py-3 flex-column"
                      key={`Miracle_${key}`}
                    >
                      <img
                        src={member.img}
                        className="card-img-top"
                        alt={member.title}
                      />
                      <div className="">
                        <h5 className="font-22 text-center mb-2 mt-4">
                          {member.name}
                        </h5>
                        <p className="font-20 text-center mb-2">
                          {member.title}
                        </p>

                        <p className="card-text text-center text-primary font-bold">
                          {member.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>

      <section className="meet-team-section">
        <div className="container">
          <h3 className="mb-3 text-center">Meet Our Strengths</h3>

          <p className="text-center">
            The backbone of UrSmartSpoc, this team keeps the engine running
            smoothly.
          </p>
          <div>
            <ul className="d-flex gap-5 mt-3 justify-content-center strengths flex-wrap">
              {strengthTeam.length > 0 &&
                strengthTeam.map((member, key) => {
                  return (
                    <li
                      className="d-flex align-items-center py-3 flex-column"
                      key={`Strengths_${key}`}
                    >
                      <img
                        src={member.img}
                        className="card-img-top"
                        alt={member.title}
                      />
                      <div className="">
                        <h5 className="font-22 text-center mb-2 mt-4">
                          {member.name}
                        </h5>
                        <p className="font-20 text-center mb-2">
                          {member.title}
                        </p>

                        <p className="card-text text-center">
                          {member.description}
                        </p>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>

      <div className="d-flex gap-5 justify-content-center">
        <section className="meet-team-section" style={{ maxWidth: "390px" }}>
          <div className="container">
            <h3 className="mb-3 text-center">The Money Ninjas</h3>

            <p className="text-center">
              Because every great adventure needs solid financial planning!
            </p>
            <div>
              <ul className="d-flex gap-5 mt-3 justify-content-center  flex-wrap">
                {moneyTeam.length > 0 &&
                  moneyTeam.map((member, key) => {
                    return (
                      <li
                        className="d-flex align-items-center py-3 flex-column"
                        key={`financial_${key}`}
                      >
                        <img
                          src={member.img}
                          className="card-img-top"
                          alt={member.title}
                        />
                        <div className="">
                          <h5 className="font-22 text-center mb-2 mt-4">
                            {member.name}
                          </h5>
                          <p className="font-20 text-center mb-2">
                            {member.title}
                          </p>

                          <p className="card-text text-center">
                            {member.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </section>

        <section className="meet-team-section" style={{ maxWidth: "450px" }}>
          <div className="container">
            <h3 className="mb-3 text-center">The Facility Powerhouse</h3>
            <p className="text-center">
              The voice, the planner, and the one making sure everything runs
              like clockwork!
            </p>
            <div>
              <ul className="d-flex gap-5 mt-3 justify-content-center flex-wrap">
                {facilityTeam.length > 0 &&
                  facilityTeam.map((member, key) => {
                    return (
                      <li
                        className="d-flex align-items-center py-3 flex-column"
                        key={`Facility_${key}`}
                      >
                        <img
                          src={member.img}
                          className="card-img-top"
                          alt={member.title}
                        />
                        <div className="">
                          <h5 className="font-22 text-center mb-2 mt-4">
                            {member.name}
                          </h5>
                          <p className="font-20 text-center mb-2">
                            {member.title}
                          </p>

                          <p className="card-text text-center">
                            {member.description}
                          </p>
                        </div>
                      </li>
                    );
                  })}
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
