import { Link, useNavigate } from "react-router-dom";
//components
import NavWithBack from "../components/common/NavWithBack";
import UserProfile from "../components/auth/UserProfile";
import { motion } from "framer-motion";

//context
import { logout, useAuthDispatch } from "../hook";
import { handleAreYouSure } from "../utils/responseHandler";

const Setting = () => {
  const dispatch = useAuthDispatch();

  let navigate = useNavigate();

  const handleLogout = () => {
    handleAreYouSure().then((result) => {
      if (result.isConfirmed) {
        navigate("/login");
        logout(dispatch);
      }
    });
  };

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
      className="pb-10"
    >
      <NavWithBack title="Setting" />

      <div className="py-10">
        <UserProfile />
      </div>
      <div className="bottom-0 w-screen">
        <div className="text-center">
          <Link to="/update-profile">
            <button className="py-2 px-4 w-full">Update Profile</button>
          </Link>
        </div>
        <div className="text-center">
          <Link to="/change-password">
            <button className="py-2 px-4 w-full">Change Password</button>
          </Link>
        </div>

        <div className="text-center">
          <button
            className="bg-red-600 py-2 px-4 rounded-lg text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default Setting;
