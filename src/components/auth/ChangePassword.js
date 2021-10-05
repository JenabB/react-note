import { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";

//components
import NavWithBack from "../NavWithBack";

//lib
import { motion } from "framer-motion";

//util
import { changePassword } from "./actions";
import { logout, useAuthDispatch, useAuthState } from "../../hook";
import { handleSuccess, handleError } from "../../utils/responseHandler";

const ChangePassword = () => {
  const [data, setData] = useState({
    password: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState("change");
  const { password, newPassword } = data;

  const dispatch = useAuthDispatch();
  const user = useAuthState();

  let history = useHistory();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    try {
      await changePassword(user.userProfile.email, password, newPassword).then(
        (result) => {
          logout(dispatch);
          history.push("/user");
          handleSuccess(result);
        }
      );

      setLoading("change");
    } catch (error) {
      setLoading("change");
      handleError(error);
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
        <title>Change Password</title>
      </Helmet>

      <NavWithBack />
      <h4 className="text-muted text-center mt-10 mb-2">Change Password</h4>
      <div className="py-2 px-1 lg:w-2/5 w-5/6 mx-auto">
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="mt-4">
            <h1>Email</h1>
            <h1>{user.userProfile.email}</h1>
          </div>

          <div className="mt-4">
            <h1>Password</h1>
            <input
              className="p-2 bg-blue-400 w-full"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <h1>New Password</h1>
            <input
              className="p-2 bg-blue-400 w-full"
              type="password"
              name="newPassword"
              value={newPassword}
              onChange={handleChange}
              required
            />
          </div>

          <div className="my-5">
            <input
              type="submit"
              className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
              value={loading}
            />
          </div>
        </form>
      </div>
    </motion.div>
  );
};

export default ChangePassword;
