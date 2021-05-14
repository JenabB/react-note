import React from "react";
import { Helmet } from "react-helmet";
import Service1 from "../images/icons/001-email.png";
import Service2 from "../images/icons/002-hosting.png";
import Service3 from "../images/icons/003-browser.png";

import Footer from "../components/Footer";

const LandingPage = () => {
  return (
    <div className="lg:w-3/5 mx-auto sm:w-full bg-white">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Landing Page</title>
      </Helmet>
      <div className="landing-header">
        <div className="text-center text-white py-32">
          <h1 className="text-5xl">NOTE</h1>
          <h2>Create Shop and invoice</h2>
        </div>
      </div>

      <div className="py-20 mx-auto">
        <h1 className="text-center mb-10">Our Services</h1>
        <div className="grid grid-cols-3 text-center lg:w-3/5 w-4/5 mx-auto">
          <div className="mx-2">
            <img
              className="mx-auto"
              src={Service1}
              alt="service 1"
              width="120px"
            />
            <h1>Service 1</h1>
            <p>Ini service pertama</p>
          </div>
          <div className="mx-2">
            <img
              className="mx-auto"
              src={Service2}
              alt="service 2"
              width="120px"
            />
            <h1>Service 2</h1>
            <p>Ini service kedua</p>
          </div>
          <div className="mx-2">
            <img
              className="mx-auto"
              src={Service3}
              alt="service 3"
              width="120px"
            />
            <h1>Service 3</h1>
            <p>Ini service ketiga</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
