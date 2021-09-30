import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { motion } from "framer-motion";
import { registerUser, useAuthDispatch } from "../../hook";

import Swal from "sweetalert2";

const Register = (props) => {
  //state
  const [data, setData] = useState({
    email: "",
    password: "",
    fullName: "",
    contactNumber: "",
  });
  const { email, password, fullName, contactNumber } = data;
  const [loading, setLoading] = useState("register");

  //dispatch
  const dispatch = useAuthDispatch();

  //action
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    try {
      const res = await registerUser(dispatch, {
        email: email,
        password: password,
        fullName: fullName,
        contactNumber: contactNumber,
      });

      if (res.status === 201) {
        Swal.fire({
          icon: "success",
          text: res.message,
          confirmButtonText: "ok",
        });
        setLoading("register");
        props.history.push("/user/login");
      } else {
        Swal.fire({
          icon: "warning",
          text: res.message,
          confirmButtonText: "ok",
        });
        setLoading("register");
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
        confirmButtonText: "ok",
      });
      setLoading("register");
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
        <title>Register</title>
      </Helmet>
      <div className="mt-24 lg:w-2/4 w-full mx-auto">
        <h4 className="text-center text-2xl text-blue-500 font-bold mb-2">
          Create an account
        </h4>
        <div className="card py-2 px-8 lg:w-3/5 mx-auto">
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
                className="p-2 bg-blue-400 focus:border-blue-300 w-full"
                type="password"
                name="password"
                value={password}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <h1>Name</h1>
              <input
                className="bg-blue-400 p-2 w-full"
                type="name"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <h1>Contact Number</h1>
              <input
                className="bg-blue-400 p-2 w-full"
                type="number"
                name="contactNumber"
                value={contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center my-5">
              <input
                type="submit"
                value={loading}
                className="text-white bg-blue-700 px-3 py-1 rounded-lg"
              />
            </div>
            <p className="mt-3 text-center">
              Already a user?{" "}
              <button>
                <Link to="/user/login">
                  <h1 className="text-blue-700 font-bold">Login</h1>
                </Link>
              </button>
            </p>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default Register;
