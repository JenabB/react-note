import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { NavLink, Link, useParams, Outlet } from "react-router-dom";

import { useAuthState, useAuthDispatch } from "../../../hook";

import { motion } from "framer-motion";

const OwnerShopDetails = () => {
  const [detail, setDetail] = useState([]);
  let activeStyle = {
    textDecoration: "underline",
  };

  const { id } = useParams();

  const dispatch = useAuthDispatch();
  const user = useAuthState();

  let navigate = useNavigate();

  function goBack() {
    navigate(-1);
  }

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/shop/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((result) => {
        setDetail(result.data.data);
        dispatch({ type: "GET_SHOP_DETAIL", payload: result.data.data });
        dispatch({ type: "GET_SHOP_ID", payload: id });
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
  }, [dispatch, id, user.shopId, user.token]);

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
          <Link to="/home">Home</Link>
        </div>
        <div></div>
      </nav>

      <div className="">
        <div className="lg:p-10 sm:p-2 py-5 bg-blue-400">
          <div className="text-white m-4 lg:px-10 sm:px-0">
            <div className="">
              <div className="">
                <h1 className="font-bold text-lg">{detail.shopName}</h1>
                <Link to={`update-shop`}>
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

      <nav className=" w-full p-2 flex justify-evenly bg-white shadow-lg items-center">
        <div className="flex flex-col items-center">
          <div className="material-icons text-blue-900">inventory_2</div>
          <NavLink
            to=""
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Products
          </NavLink>
        </div>
        <div className="flex flex-col items-center">
          <div className="material-icons text-blue-900">receipt</div>
          <NavLink
            to="invoice"
            style={({ isActive }) => (isActive ? activeStyle : undefined)}
          >
            Invoice
          </NavLink>
        </div>
      </nav>

      <Outlet />
    </motion.div>
  );
};

export default OwnerShopDetails;
