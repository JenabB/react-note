import { useEffect } from "react";
import { motion } from "framer-motion";

//components
import FloatingAddProductButton from "./FloatingAddProductButton";
import GetShopProduct from "./GetShopProduct";
import { useAuthState, useAuthDispatch } from "../../../hook";
import { getProducts } from "./actions";

const Product = () => {
  const { shopId, token } = useAuthState();
  const dispatch = useAuthDispatch();
  const url = `https://svc-not-e.herokuapp.com/v1/shop/${shopId}/product`;

  useEffect(() => {
    let intervalId;

    const fetchData = async () => {
      getProducts(shopId, token).then((result) =>
        dispatch({ type: "GET_SHOP_PRODUCT", payload: result.data.data })
      );
      intervalId = setTimeout(fetchData, 4000);
    };

    fetchData();
    return () => {
      if (intervalId) {
        clearTimeout(intervalId);
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [url]);

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
      <GetShopProduct />
      <FloatingAddProductButton />
    </motion.div>
  );
};

export default Product;
