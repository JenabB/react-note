import CreateShop from "../components/shop/CreateShop";
import OwnerShopList from "../components/shop/OwnerShopList";
import { Helmet } from "react-helmet";
import { useAuthState } from "../hook";

const Home = (props) => {
  const userDetails = useAuthState();

  if (!userDetails.token) {
    props.history.push("/user/login");
  }
  return (
    <div>
      <Helmet>
        <meta charSet="utf-8" />
        <title>{userDetails.user.fullName}</title>
      </Helmet>

      <div className="jumbotron py-20">
        <div className="text-center text-white">
          <h1 className="text-lg">
            Welcome <b>{userDetails.user.fullName}</b>
          </h1>
          <h2>Create Shop, Inovice & More</h2>
          <CreateShop />
        </div>
      </div>

      <div className="mt-4">
        <h1 className="mt-2 ml-4 font-bold">Your Shop</h1>
        <OwnerShopList />
      </div>
    </div>
  );
};

export default Home;
