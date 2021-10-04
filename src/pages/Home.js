import { useEffect } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

//context
import { useAuthState, useAuthDispatch } from "../hook";

//lib
import { motion } from "framer-motion";
import axios from "axios";

//components
import OwnerShopList from "../components/shop/shop/OwnerShopList";
import FloatingCreateShopButton from "../components/shop/shop/FloatingCreateShopButton";

import Products from "../components/shop/Products";

const Home = () => {
  const user = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        dispatch({ type: "GET_USER_PROFILE", payload: result.data.data });
      });
  }, [dispatch, user.token]);

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
          <Link to="/user" className="text-2xl font-bold">
            Home
          </Link>
        </div>
        <div>
          <Link to="/user/setting">
            <span class="material-icons">settings</span>
          </Link>
        </div>
      </nav>

      <div className=" py-8">
        <div className="px-4">
          <h1 className="text-lg">
            Hi,{" "}
            <span className="text-2xl font-bold text-blue-700">
              {user.userProfile.fullName}
            </span>
          </h1>
          <p>Have a nice day</p>
        </div>
      </div>

      <div className="mt-4 lg:w-3/5 mx-auto">
        <h1 className="mt-2 ml-4 font-bold mb-4">Your Shop</h1>
        <OwnerShopList />
        <Products products={user.shopProduct} />
      </div>

      <FloatingCreateShopButton />
    </motion.div>
  );
};

export default Home;
