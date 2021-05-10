import React from "react";
import { Helmet } from "react-helmet";
import Footer from "../components/Footer";
const LandingPage = () => {
  return (
    <div>
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

      <div>
        <h1 className="text-center mt-12">Our Services</h1>
        <div className="grid lg:grid-cols-3 sm:grid-cols-1">
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LandingPage;
