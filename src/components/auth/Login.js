import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { loginUser, useAuthDispatch } from "../../hook";

import Swal from "sweetalert2";

const Login = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = data;

  const dispatch = useAuthDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser(dispatch, { email, password });

      Swal.fire({
        icon: "success",
        text: "login success",
        confirmButtonText: "ok",
      });

      props.history.push("/user");
      window.location.reload();
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
        confirmButtonText: "ok",
      });
    }
  };

  return (
    <div className="mt-10 w-2/3 mx-auto h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>

      <h4 className="text-muted text-center mb-2">Login</h4>
      <div className="py-2 px-1 lg:w-2/5 mx-auto">
        <form className="text-center">
          <div className="mt-4">
            <h1>Email</h1>
            <input
              className="p-2 bg-green-400 w-full"
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
              className="p-2 bg-green-400 w-full"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="my-5">
            <button
              className="text-white bg-green-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
              onClick={handleSubmit}
            >
              Login
            </button>
          </div>
          <p className="mt-3 text-center">
            Dont have an account?
            <button className="font-bold text-green-600 mx-2">
              <Link to="/user/register">Register</Link>
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
