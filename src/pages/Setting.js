import { Link, useHistory } from "react-router-dom";
//components
import profile from "../images/ziva.jpeg";
import NavWithBack from "../components/NavWithBack";
import UserProfile from "../components/auth/UserProfile";

//lib
import Swal from "sweetalert2";
import { motion } from "framer-motion";

//context
import { logout, useAuthDispatch } from "../hook";

const Setting = () => {
  const dispatch = useAuthDispatch();

  let history = useHistory();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
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
      <NavWithBack />

      <div className="pb-10">
        <div className="flex justify-center my-10">
          <img src={profile} alt="profile" className="profile-picture" />
        </div>
        <UserProfile />
      </div>
      <div className="bottom-0 w-screen">
        <div className="text-center">
          <Link to="/user/setting/update-profile">
            <button className="py-2 px-4 w-full">Update Profile</button>
          </Link>
        </div>
        <div className="text-center">
          <Link to="/user/setting/change-password">
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
