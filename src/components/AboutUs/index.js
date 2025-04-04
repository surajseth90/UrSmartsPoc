import "./style.scss";

export default function AboutUsPage() {
  const teamData = [
    {
      name: "Akash Verma",
      jobTitle: "CEO",
      description:
        "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour Lorem Ipsum predefined...",
    },
    {
      name: "Priyanka Gupta",
      jobTitle: "Senior Manager, Strategic",
      description:
        "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour Lorem Ipsum predefined.",
    },
    {
      name: "Vipin Malhotra",
      jobTitle: "Senior Account Manager",
      description:
        "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour Lorem Ipsum predefined.",
    },
    {
      name: "Akash Verma",
      jobTitle: "CEO",
      description:
        "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour Lorem Ipsum predefined.",
    },
    {
      name: "Priyanka Gupta",
      jobTitle: "Senior Manager, Strategic",
      description:
        "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour Lorem Ipsum predefined.",
    },
    {
      name: "Vipin Malhotra",
      jobTitle: "Senior Account Manager",
      description:
        "Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. There are many variations of passages of available, but the majority have suffered alteration in some form, by injected humour Lorem Ipsum predefined.",
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

      <section className="text-section" style={{ marginTop: "64px" }}>
        <div className="container-sm">
          <h3>Who we are?</h3>
          <p className="text-grey">
            There are many variations of passages of Lorem Ipsum available, but
            the majority have suffered alteration in some form, by injected
            humour, or randomised words which don't look even slightly
            believable. If you are going to use a passage of Lorem Ipsum, you
            need to be sure there isn't anything embarrassing hidden in the
            middle of text. All the Lorem Ipsum generators on the Internet tend
            to repeat predefined chunks as necessary, making this the first true
            generator on the Internet. Lorem Ipsum is simply dummy text of the
            printing and typesetting industry. Lorem Ipsum has been the
            industry's standard dummy text ever since the 1500s, when an unknown
            printer took a galley of type and scrambled it to make a type
            specimen book. It has survived not only five centuries, but also the
            leap into electronic typesetting, remaining essentially unchanged.
          </p>
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

      <section className="video-section" style={{ marginTop: "111px" }}>
        <div className="container-sm">
          <iframe
            width="100%"
            height="608"
            src="https://www.youtube.com/embed/HAnw168huqA?si=eUCe7tz8CXRMXHWG"
            title="YouTube video player"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowfullscreen
          ></iframe>
        </div>
      </section>

      <section style={{ marginTop: "111px" }} className="meet-team-section">
        <div className="container-sm">
          <div className="d-flex justify-content-center">
            <h3 className="d-inline-block">Meet the Team</h3>
          </div>
          <div>
            <ul className="card-list-wrapper d-grid">
              {teamData.length > 0 &&
                teamData.map((member, key) => {
                  return (
                    <li className="card-wrapper mb-5" key={`member_${key}`}>
                      <div className="card">
                        <div className="t-m-img"></div>
                        <p className="t-m-name">{member.name}</p>
                        <p className="t-m-title">{member.jobTitle}</p>

                        <div className="t-m-description">
                          <span className="text-grey">
                            {member.description}
                          </span>
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
