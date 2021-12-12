import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";

import { motion } from "framer-motion";

const LandingPage = () => {
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
      className="bg-blue-400 h-screen"
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Landing Page</title>
      </Helmet>

      <div className="hero-landing grid lg:grid-cols-2 sm:grid-cols-1 py-8">
        <div className=" lg:py-32 sm:py-8 px-6 w-full">
          <motion.h1
            initial={{ y: -100 }}
            animate={{ y: [-100, 0] }}
            transition={{ ease: "easeOut", duration: 2 }}
            className=" text-center text-6xl font-bold text-white"
          >
            NOTE
          </motion.h1>
          <p className="mt-6 text-white text-lg">
            management of your business is more when you are able to do neat
            records
          </p>
        </div>
      </div>

      <Link to="login">
        <motion.button
          initial={{ x: -100 }}
          animate={{ x: [-100, 13] }}
          transition={{ ease: "easeOut", duration: 2 }}
          className="fixed bottom-10 right-10 bg-white px-4 py-3 rounded-full"
        >
          <h1 className="material-icons text-blue-600">arrow_forward</h1>
        </motion.button>
      </Link>
    </motion.div>
  );
};

export default LandingPage;
