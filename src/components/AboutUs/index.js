import "./style.scss";

export default function AboutUsPage() {
  const teamData = [
    {
      name: "Bevan Hogg",
      jobTitle: "CEO",
      description: `
        Founder of B H & Company and UrSmartSpoc.com.  Bevan has been into hospitality industry for last 14 years and well-connected in his field domain. The dream of UrSmartSpoc began in his Hubli apartment and took its shape in Bangalore from Dreams to reality. A Great planner, quick in thought process & decision making and an entrepreneur from an early age. He has a great strategic vision & a zeal for customer service and client relationship. Bevan strongly believes in putting right people in to right place to make things happen for better. He had remarkably set up initial operations for one of the critical alternate revenue stream by ensure online booking strategy for trading partner and the member enrollment on line module and setting up the payment gateways on online business structure and development. He strongly believes in Quality and has been in various quality process in his career.
<br />
Worked in different roles from Customer service, quality, Customer retention, operations@ Accenture, @ Hutchinson India Ltd – Dial An Exchange Bangalore, @ RCI and @ Club Mahindra Holidays India Ltd Bangalore.
<br />
Bevan has never been afraid to try on different hats. He started UrSmartSpoc with three friends, and did everything from designing the Website to handling the smallest issues of company. A True Go Getter.
        `,
    },
    {
      name: "Charu Gupta",
      jobTitle: "COO",
      description:
        "Co-Founder of UrSmartSpoc, Charu is a technically competent professional with core strengths in handling Customer relationship, bringing customer view in the organization, people management skills and to steer business goals by devising appropriate team strategy and creating win-win situation. A master in managing client relationship Customer Acquisition, Business development and Marketing.  In the course of her association with leading institutions, she is equipped with presentation and people management skills. She manages new business development and major market coverage. Charu carries an experience in setting up various travel companies and its process. Along with managing the teams of Clients and Suppliers needs and necessity. Charu believes in simplicity and hard work that can create history along with experience. ",
    },
  ];

  return (
    <div className="about-page-wrapper">
      <section className="about-top-container w-100">
        <div className="container-sm">
          <div className="about-mud-text">
            <h1>About UrSmartsPOC</h1>
            <p>
              It is a long established fact that a reader will be distracted by
              the readable content of a page when looking at its layout.
            </p>
          </div>
        </div>
      </section>

      <section className="text-section" style={{ marginTop: "88px" }}>
        <div className="container-sm">
          <h3>What we do?</h3>
          <p className="text-grey">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. There are many variations of passages of
            Lorem Ipsum available, but the majority have suffered alteration in
            some form.
          </p>
        </div>
      </section>

      <section style={{ marginTop: "111px" }} className="meet-team-section">
        <div className="container-sm">
          <div className="d-flex justify-content-center">
            <h3 className="d-inline-block">Meet the Team</h3>
          </div>
          <div>
            <ul className="card-list-wrapper">
              {teamData.length > 0 &&
                teamData.map((member, key) => {
                  return (
                    <li className="mb-5" key={`member_${key}`}>
                      <div className="d-flex" style={{ gap: "40px" }}>
                        <div className="t-m-img"></div>
                        <div className="w-75">
                          <p className="t-m-name">{member.name}</p>
                          <p className="t-m-title font-14 font-bold">
                            {member.jobTitle}
                          </p>

                          <p
                            className="text-grey font-14"
                            dangerouslySetInnerHTML={{
                              __html: member.description,
                            }}
                          ></p>
                        </div>
                      </div>
                    </li>
                  );
                })}
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
