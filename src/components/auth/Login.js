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
        Swal.fire({
          icon: "success",
          text: "login success",
          confirmButtonText: "ok",
        });
        props.history.push("/user");
      }
    } catch (error) {
      setLoading("login");
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
            <button className="font-bold text-blue-700 mx-2">
              <Link to="/user/register">Register</Link>
            </button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
