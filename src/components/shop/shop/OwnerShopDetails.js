import React, { useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
import { NavLink, Link, useParams, Outlet } from "react-router-dom";

import { useAuthState, useAuthDispatch } from "../../../hook";

import { motion } from "framer-motion";

import AppBar from "../../common/AppBar";

const OwnerShopDetails = () => {
  let activeStyle = {
    textDecoration: "underline",
  };

  const { id } = useParams();

  const dispatch = useAuthDispatch();
  const user = useAuthState();

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/shop/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      })
      .then((result) => {
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
      <AppBar title="Shop Details" />

      <div class="container mx-auto ">
        <div class="flex flex-row flex-wrap py-4 ">
          <aside class="w-full sm:w-1/3 bg-blue-400 h-screen md:w-1/4 px-2">
            <div class="sticky top-0 p-4 w-full">
              <div className=" text-white items-center grid-cols-1 ">
                <NavLink
                  to=""
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="flex items-center m-2"
                >
                  <div className="material-icons mx-2">dashboard</div>
                  Dashboard
                </NavLink>

                <NavLink
                  to="products"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="flex items-center m-2"
                >
                  <div className="material-icons mx-2">inventory_2</div>
                  Products
                </NavLink>
                <NavLink
                  to="invoices"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="flex items-center m-2"
                >
                  <div className="material-icons mx-2">receipt</div>
                  Invoice
                </NavLink>
                <NavLink
                  to="update-shop"
                  style={({ isActive }) => (isActive ? activeStyle : undefined)}
                  className="flex items-center m-2"
                >
                  <div className="material-icons mx-2">settings</div>
                  Update
                </NavLink>
              </div>
            </div>
          </aside>
          <main role="main" class="w-full sm:w-2/3 md:w-3/4 pt-1 px-2">
            <Outlet />
          </main>
        </div>
      </div>
    </motion.div>
  );
};

export default OwnerShopDetails;
