import Banner from "../../assets/images/easy-support.png"
import Lines from "../../assets/images/lines-bg.svg"
export default function Index() {

    return (
        <section className="easy-support-container">
            <div className="container bg-secondary">
                <img className="position-absolute top-0 h-100 w-100 start-0" src={Lines}/>
                <h3 className="h3-heading">Easy Support</h3>
                <div className="d-flex gap-5 mt-5 flex-lg-row flex-column">
                    <p>At UrSmartSpoc, we believe great travel experiences start with great support.
                        Our 24×7 live chat, call, and email assistance ensures help is always just a tap away — no waiting, no hassle.
                        Whether it’s a booking change, travel query, or last-minute request, our expert team is ready to resolve it instantly.
                        We go beyond problem-solving — we guide, assist, and make your journey effortless from start to finish.
                        Because with UrSmartSpoc, you’re never traveling alone.</p>
                    <img className="easy-support-banner" src={Banner} height={400} />
                </div>
            </div>
        </section>
    );
}
