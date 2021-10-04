import React, { useState, useEffect } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Route, Link, useRouteMatch } from "react-router-dom";

import { useAuthState, useAuthDispatch } from "../../hook";
import ShopDetailBottom from "./ShopDetailBottom";
import { motion } from "framer-motion";

const OwnerShopDetails = (props) => {
  const [detail, setDetail] = useState([]);
  const shopId = props.match.params.id;
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  let { url } = useRouteMatch();
  let history = useHistory();

  function goBack() {
    history.goBack();
  }

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/shop/${shopId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((result) => {
        setDetail(result.data.data);
        dispatch({ type: "GET_SHOP_DETAIL", payload: result.data.data });
        dispatch({ type: "GET_SHOP_ID", payload: shopId });
      });

    axios
      .get(`https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}/product`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        dispatch({ type: "GET_SHOP_PRODUCT", payload: result.data.data });
      });
  }, [dispatch, shopId, user.shopId, user.token]);

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
      <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
        <div>
          <button onClick={goBack}>
            <span class="material-icons">arrow_back</span>
          </button>
        </div>
        <div>
          <Link to="/user">Home</Link>
        </div>
        <div></div>
      </nav>

      <div className="">
        <div className="lg:p-10 sm:p-2 py-5 bg-blue-400">
          <div className="text-white m-4 lg:px-10 sm:px-0">
            <div className="">
              <div className="">
                <h1 className="font-bold text-lg">{detail.shopName}</h1>
                <Link to={`${url}/change`}>
                  <button className="bg-white text-blue-600 px-2 rounded-lg my-4">
                    Edit
                  </button>
                </Link>
                {detail.Country ? (
                  <div className="flex flex-wrap items-center">
                    <h2 className="mx-2">{detail.Country.niceName}</h2>
                    <h3 className="mx-1">{detail.Province.provinceName}</h3>
                    <h4 className="mx-2">{detail.Regency.regencyName}</h4>
                  </div>
                ) : (
                  <h1>Loading...</h1>
                )}
              </div>
            </div>

            <div>
              <div className=" inline-block rounded-lg p-2 text-center">
                <h1>Products</h1>
                {user.shopProduct ? (
                  <h2 className="text-blue-700 bg-white font-bold">
                    {user.shopProduct.length}
                  </h2>
                ) : (
                  <h2 className="text-blue-700 bg-white font-bold">0</h2>
                )}
              </div>

              <div className="inline-block rounded-xl p-2 text-center">
                <h1>Invoices</h1>
                {user.shopInvoice ? (
                  <h2 className="text-blue-700 bg-white font-bold">
                    {user.shopInvoice.length}
                  </h2>
                ) : (
                  <h2 className="text-blue-700 bg-white font-bold">0</h2>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* <div>
        <div className="bg-blue-400 p-4">
          <Link to={`${url}/products`}>Products</Link>
          <Link to={`${url}/invoice`}>Invoice</Link>
        </div>
        <Switch>
          <Route path={`${path}/products`}>
            <h1>Ini product</h1>
          </Route>
        </Switch>
      </div> */}

      <ShopDetailBottom />
    </motion.div>
  );
};

export default OwnerShopDetails;
