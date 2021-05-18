import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { registerUser, useAuthDispatch } from "../../hook";

import Swal from "sweetalert2";

const Register = (props) => {
  const [data, setData] = useState({
    email: "",
    password: "",
    fullName: "",
    contactNumber: "",
  });

  const dispatch = useAuthDispatch();

  const { email, password, fullName, contactNumber } = data;
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
        props.history.push("/user/login");
      } else {
        Swal.fire({
          icon: "warning",
          text: res.message,
          confirmButtonText: "ok",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        text: error.response.data.message,
        confirmButtonText: "ok",
      });
    }
  };

  return (
    <div className="h-screen">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Register</title>
      </Helmet>
      <div className="mt-10 w-2/3 mx-auto">
        <h4 className="mt-10 text-muted text-center mb-2">Create an account</h4>
        <div className="card py-2 px-1 lg:w-2/5 mx-auto">
          <form className="text-center">
            <div className="mt-4">
              <h1>Email</h1>
              <input
                className="p-2 bg-blue-100 w-full"
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
                className="p-2 bg-blue-100 focus:border-blue-300 w-full"
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
                className="bg-green-200 p-2 w-full"
                type="name"
                name="fullName"
                value={fullName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mt-4">
              <h1>contactNumber</h1>
              <input
                className="bg-green-200 p-2 w-full"
                type="name"
                name="contactNumber"
                value={contactNumber}
                onChange={handleChange}
                required
              />
            </div>

            <div className="text-center my-5">
              <button
                className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
                onClick={handleSubmit}
              >
                Register
              </button>
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
    </div>
  );
};

export default Register;
