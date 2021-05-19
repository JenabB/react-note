import { useState, useEffect } from "react";
import CreateShop from "../components/shop/CreateShop";
import OwnerShopList from "../components/shop/OwnerShopList";
import { Helmet } from "react-helmet";
import { logout, useAuthDispatch, useAuthState } from "../hook";
import home from "../images/home.png";
import { useHistory, Link } from "react-router-dom";

import back from "../images/icons/back.png";

const Home = (props) => {
  const user = useAuthState();
  const dispatch = useAuthDispatch();
  if (!user.token) {
    props.history.push("/user/login");
  }

  const history = useHistory();

  function goBack() {
    history.goBack();
  }

  const [isLogin, SetIsLogin] = useState(false);

  useEffect(() => {
    let token = user.token;
    if (token) {
      SetIsLogin(true);
    } else {
      SetIsLogin(false);
    }
  }, [user.token]);

  const handleLogout = () => {
    logout(dispatch);
    SetIsLogin(false);
  };
  return (
    <div className="mx-auto sm:w-full bg-white h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{user.user.fullName}</title>
      </Helmet>

      <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
        <div>
          <button onClick={goBack}>
            <img src={back} alt="back" width="30px" />
          </button>
        </div>
        <div>
          <Link to="/user">Home</Link>
        </div>
        <div>
          <h1 className="text-green-500"> A</h1>
        </div>
      </nav>

      <div className="hero-landing grid lg:grid-cols-2 sm:grid-cols-1 py-8">
        <div className="w-full">
          <img src={home} alt="hero" />
        </div>
        <div className="lg:row-start-1 text-center lg:py-32 sm:py-8 w-full">
          <h1 className="text-lg">
            Welcome
            <span className="text-4xl font-bold text-blue-700">
              {user.user.fullName}
            </span>
          </h1>
          <p>Ini nama aplikasinya !E</p>
          <CreateShop />
        </div>
      </div>

      <button onClick={handleLogout}>Logout</button>
      <div className="mt-4 lg:w-3/5 mx-auto">
        <h1 className="mt-2 ml-4 font-bold">Your Shop</h1>
        <OwnerShopList />
      </div>
    </div>
  );
};

export default Home;
