//lib
import { useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";

//components
import NavWithBack from "../../NavWithBack";
import Header from "./Header";
import FloatingAddProductButton from "./FloatingAddProductButton";
import GetShopProduct from "./GetShopProduct";
import { useAuthState, useAuthDispatch } from "../../../hook";

const Product = () => {
  const user = useAuthState();
  const dispatch = useAuthDispatch();

  useEffect(() => {
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
  });

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
      <NavWithBack />
      <Header />
      <GetShopProduct />
      <FloatingAddProductButton />
    </motion.div>
  );
};

export default Product;
