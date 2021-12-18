import React, { useState, useEffect } from "react";
import axios from "axios";

// eslint-disable-next-line no-unused-vars
import { NavLink, Link, useParams, Outlet } from "react-router-dom";

import { useAuthState, useAuthDispatch } from "../../../hook";

import { motion } from "framer-motion";
import Detail from "./ShopDetail/Detail";
import AppBar from "../../common/AppBar";

const OwnerShopDetails = () => {
  const [detail, setDetail] = useState([]);
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
      <AppBar />

      <Detail user={user} detail={detail} />

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
