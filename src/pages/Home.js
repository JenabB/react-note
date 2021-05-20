import CreateShop from "../components/shop/CreateShop";
import OwnerShopList from "../components/shop/OwnerShopList";
import { Helmet } from "react-helmet";
import { useAuthState } from "../hook";
import home from "../images/home.png";
import { Link } from "react-router-dom";
import gear from "../images/icons/setting.png";

const Home = (props) => {
  const user = useAuthState();

  if (!user.token) {
    props.history.push("/user/login");
  }

  return (
    <div className="mx-auto sm:w-full h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>{user.user.fullName}</title>
      </Helmet>

      <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
        <div></div>
        <div>
          <Link to="/user">Home</Link>
        </div>
        <div>
          <Link to="/user/setting">
            <img src={gear} alt="setting" width="28px" />
          </Link>
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

      <div className="mt-4 lg:w-3/5 mx-auto">
        <h1 className="mt-2 ml-4 font-bold">Your Shop</h1>
        <OwnerShopList />
      </div>
    </div>
  );
};

export default Home;
