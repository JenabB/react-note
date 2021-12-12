import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//context
import { useAuthState, useAuthDispatch } from "../hook";

//lib
import { motion } from "framer-motion";

//components
import OwnerShopList from "../components/shop/shop/OwnerShopList";
import FloatingCreateShopButton from "../components/shop/shop/FloatingCreateShopButton";

import { getUserProfile } from "../components/home/actions";
import UserIformation from "../components/home/UserIformation";
import { formatRp } from "../utils/formatRp";
import moment from "moment";
import LatestProduct from "../components/home/LatestProduct";
const Home = () => {
  const user = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    getUserProfile(user.token).then((result) => {
      dispatch({ type: "GET_USER_PROFILE", payload: result.data.data });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={{
        hidden: {
          scale: 0.8,
          opacity: 0,
        },
        visible: {
          scale: 1,
          opacity: 1,
          transition: {
            delay: 0.9,
          },
        },
      }}
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>{user.userProfile.fullName}</title>
      </Helmet>

      <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
        <div></div>
        <div>
          <Link to="/home" className="text-2xl font-bold">
            Home
          </Link>
        </div>
        <div>
          <Link to="/setting">
            <span class="material-icons">settings</span>
          </Link>
        </div>
      </nav>

      <UserIformation name={user.userProfile.fullName} />

      <div
        className="bg-white shadow-lg z-10 absolute w-3/4 p-4 mx-auto rounded-lg"
        style={{
          top: "170px",
          marginLeft: "auto",
          marginRight: "auto",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <div className="flex justify-between">
          <div className="py-2">
            <h1 className="text-xs text-gray-400 mb-2">Account Create At</h1>
            <h1 className="text-sm">
              {moment(user.userProfile.createAt).format("YYYY MMM DD")}
            </h1>
          </div>

          <div className="bg-gray-200 rounded-xl p-4">
            <h1 className="text-xs">Total Transaction</h1>
            <h1 className="text-xl font-bold">{formatRp(3232323)}</h1>
          </div>
        </div>
      </div>

      <div className="mt-24 lg:w-3/5 mx-auto">
        <h1 className="mt-2 ml-4 font-bold mb-4">Your Shop</h1>
        <OwnerShopList />
        <LatestProduct />
      </div>

      <FloatingCreateShopButton />
    </motion.div>
  );
};

export default Home;
