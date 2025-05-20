import Link from "next/link";
import Header from "@layouts/headers/Index";
import Footer from "@layouts/footers/Index";

const PaymentSuccessful = () => {
  return (
    <>
      {/* <Header layout={"default"} /> */}

      {/* dynamic content */}
      <div id="sb-dynamic-content" className="sb-transition-fade">
        {/* banner */}
        <section className="sb-banner">
          <div className="sb-bg-1">
            <div></div>
          </div>
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                {/* main title */}
                <div className="sb-main-title-frame">
                  <div className="sb-main-title">
                    <span className="sb-404">Thank You!</span>
                    <h1 className="sb-mb-30">
                      Your payment <br /> has been recieved
                    </h1>
                    {/* button */}
                    <Link href="/" className="sb-btn sb-btn-2">
                      <span className="sb-icon">
                        <img src="/img/ui/icons/arrow-2.svg" alt="icon" />
                      </span>
                      <span>Back to homepage</span>
                    </Link>
                    {/* button end */}
                  </div>
                </div>
                {/* main title end */}
              </div>
              <div className="col-lg-6">
                <div className="sb-illustration-1-404">
                  <img
                    src="/img/illustrations/girl.png"
                    alt="man"
                    className="sb-man"
                  />

                  <div className="sb-cirkle-1" />
                  <div className="sb-cirkle-2" />
                  <div className="sb-cirkle-3" />
                  <div className="sb-cirkle-4" />
                  <div className="sb-cirkle-5" />

                  <img
                    src="/img/illustrations/3.svg"
                    alt="phones"
                    className="sb-pik-1"
                  />
                  <img
                    src="/img/illustrations/1.svg"
                    alt="phones"
                    className="sb-pik-2"
                  />
                  <img
                    src="/img/illustrations/2.svg"
                    alt="phones"
                    className="sb-pik-3"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* banner end */}
      </div>
      {/* dynamic content end */}
    </>
  );
};
export default PaymentSuccessful;
