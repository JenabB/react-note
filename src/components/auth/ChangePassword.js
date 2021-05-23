import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { logout, useAuthDispatch, useAuthState } from "../../hook";
import Swal from "sweetalert2";
import NavWithBack from "../NavWithBack";
import axios from "axios";
import { useHistory } from "react-router-dom";

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
      await axios
        .put(`https://svc-not-e.herokuapp.com/v1/user/change-password/owner`, {
          email: user.emailUser,
          password: password,
          newPassword: newPassword,
        })
        .then((result) => {
          logout(dispatch);
          history.push("/user");
          Swal.fire({
            icon: "success",
            text: result.data.message,
            confirmButtonText: "ok",
          });
        });

      setLoading("change");
    } catch (error) {
      setLoading("change");
      Swal.fire({
        icon: "error",
        text: "email/password invalid",
        confirmButtonText: "ok",
      });
    }
  };

  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Change Password</title>
      </Helmet>

      <NavWithBack />
      <h4 className="text-muted text-center mt-10 mb-2">Change Password</h4>
      <div className="py-2 px-1 lg:w-2/5 mx-auto">
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="mt-4">
            <h1>Email</h1>
            <input
              className="p-2 bg-green-400 w-full"
              type="email"
              name="email"
              defaultValue={user.userProfile.email}
              placeholder={user.userProfile.email}
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

          <div className="mt-4">
            <h1>New Password</h1>
            <input
              className="p-2 bg-green-400 w-full"
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
    </div>
  );
};

export default ChangePassword;
