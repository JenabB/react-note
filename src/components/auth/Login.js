import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

//utils
import { handleSuccess } from "../../utils/responseHandler";

//lib
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";

//context
import { loginUser, useAuthDispatch } from "../../hook";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const [loading, setLoading] = useState("login");
  const { email, password } = data;

  const dispatch = useAuthDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    try {
      const res = await loginUser(dispatch, { email, password });
      setLoading("login");
      if (res.status === 200) {
        handleSuccess(res);
        navigate("/home");
      }
    } catch (error) {
      setLoading("login");
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
        <title>Login</title>
      </Helmet>
      <div className="mt-24 lg:w-2/4 w-full mx-auto">
        <h1 className="text-center text-2xl text-blue-500 font-bold mb-2">
          Login
        </h1>
        <div className="py-2 px-8 lg:w-3/5 mx-auto">
          <form className="text-center" onSubmit={handleSubmit}>
            <div className="mt-4">
              <h1>Email</h1>
              <input
                className="p-2 bg-blue-400 w-full"
                type="email"
                name="email"
                value={email}
                onChange={handleChange}
                required
              />
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

            <div className="my-5">
              <input
                type="submit"
                value={loading}
                className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
              />
            </div>
            <p className="mt-3 text-center">
              Dont have an account?
              <button className="font-bold text-blue-600 mx-2">
                <Link to="register">Register</Link>
              </button>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Login;
