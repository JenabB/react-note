import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate } from "react-router-dom";

//utils
import { useAuthState } from "../../hook";
import { handleSuccess, handleError } from "../../utils/responseHandler";
import { motion } from "framer-motion";
import { updateProfile } from "./actions";

//components
import NavWithBack from "../NavWithBack";

const UpdateProfile = () => {
  const user = useAuthState();
  const [data, setData] = useState({
    fullName: user.userProfile.fullName,
    contactNumber: user.userProfile.contactNumber,
    address: user.userProfile.address,
  });

  let navigate = useNavigate();
  function goBack() {
    navigate(-1);
  }

  const [loading, setLoading] = useState("update");
  const { fullName, contactNumber, address } = data;

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    try {
      await updateProfile(fullName, contactNumber, address, user.token).then(
        (result) => {
          handleSuccess(result);
          goBack();
        }
      );
      setLoading("update");
    } catch (error) {
      setLoading("update");
      if (error.response.data.status === 401) {
        handleError(error);
        navigate("login");
      } else {
        handleError(error);
      }
    }
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
    >
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update Profile</title>
      </Helmet>

      <NavWithBack />
      <h4 className="text-muted text-center mt-10 mb-2">Update Profile</h4>
      <div className="py-2 px-1 lg:w-2/5 w-5/6 mx-auto">
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="mt-4">
            <h1>Full name</h1>
            <input
              className="p-2 placeholder-black bg-blue-400 w-full"
              type="name"
              name="fullName"
              value={fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <h1>Address Detail</h1>
            <input
              className="p-2 placeholder-black bg-blue-400 w-full"
              type="field"
              name="address"
              value={address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <h1>Contact Number</h1>
            <input
              className="p-2 placeholder-black bg-blue-400 w-full"
              type="number"
              name="contactNumber"
              value={contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <input
              type="submit"
              value={loading}
              className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default UpdateProfile;
