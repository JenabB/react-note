import NavWithBack from "../../NavWithBack";
import FloatingAddProductButton from "./FloatingAddProductButton";
import GetShopProduct from "./GetShopProduct";
import { motion } from "framer-motion";

const Product = () => {
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
      <GetShopProduct />
      <FloatingAddProductButton />
    </motion.div>
  );
};

export default Product;
