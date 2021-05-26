import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Service1 from "../images/icons/001-email.png";
import Service2 from "../images/icons/002-hosting.png";
import Service3 from "../images/icons/003-browser.png";
import { useAuthState } from "../hook";
import { Link } from "react-router-dom";
import Hero from "../images/landing.png";
import Footer from "../components/Footer";

const LandingPage = () => {
  const [isLogin, SetIsLogin] = useState(false);
  const user = useAuthState();

  useEffect(() => {
    let token = user.token;
    if (token) {
      SetIsLogin(true);
    } else {
      SetIsLogin(false);
    }
  }, [user.token]);

  return (
    <div className="mx-auto sm:w-full bg-white h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Landing Page</title>
      </Helmet>

      {isLogin ? (
        <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
          <div></div>
          <div>
            <Link to="/user">Home</Link>
          </div>
          <div></div>
        </nav>
      ) : (
        <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
          <div>
            <Link to="/">
              <h1 className="font-bold text-xl">NOT E</h1>
            </Link>
          </div>
          <div className="flex">
            <div className="mr-5">
              <Link to="/user/register">
                <h1 className="bg-white text-blue-600 px-1 rounded">
                  Register
                </h1>
              </Link>
            </div>
            <div>
              <Link to="/user/login">Login</Link>
            </div>
          </div>
        </nav>
      )}

      <div className="hero-landing grid lg:grid-cols-2 sm:grid-cols-1 py-8">
        <div className="w-full">
          <img src={Hero} alt="hero" />
        </div>
        <div className="text-center lg:py-32 sm:py-8 w-full">
          <h1 className="text-6xl font-bold text-blue-700">NOT E</h1>
          <p>Ini nama aplikasinya !E</p>
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
