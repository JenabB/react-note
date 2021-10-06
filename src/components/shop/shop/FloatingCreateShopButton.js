import { useState } from "react";
import CreateShopModal from "./CreateShopModal";
import { motion } from "framer-motion";

const FloatingCreateShopButton = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <motion.button
        whileHover={{
          scale: 1.2,
          transition: { duration: 1 },
        }}
        //efek ketika di tekan
        animate={{
          scale: [1, 2, 2, 1, 1],
          rotate: [0, 160, 270, 360, 0],
        }}
        transition={{ duration: 2 }}
        className="p-0 fixed bottom-10 right-10 w-16 h-16 bg-blue-500 rounded-full hover:bg-blue-700 active:shadow-lg mouse shadow transition ease-in duration-200 focus:outline-none"
        onClick={() => {
          setIsOpen(true);
        }}
      >
        <h1 className="material-icons text-white">add</h1>
      </motion.button>
      {isOpen && <CreateShopModal setIsOpen={setIsOpen} />}
    </div>
  );
};

export default FloatingCreateShopButton;
