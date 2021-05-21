import React, { useState } from "react";

import { Helmet } from "react-helmet";
import { loginUser, useAuthDispatch } from "../../hook";
import Swal from "sweetalert2";
import NavWithBack from "../NavWithBack";

const EditProfile = (props) => {
  const [data, setData] = useState({
    fullName: "",
    contactNumber: "",
    addressDetail: "",
    password: "",
    newPassword: "",
  });
  const [loading, setLoading] = useState("change");
  const { fullName, contactNumber, addressDetail, password, newPassword } =
    data;

  const dispatch = useAuthDispatch();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    try {
      const res = await loginUser(dispatch, {
        fullName,
        contactNumber,
        addressDetail,
        password,
        newPassword,
      });

      if (res) {
        Swal.fire({
          icon: "success",
          text: "login success",
          confirmButtonText: "ok",
        });
        props.history.push("/user");
      } else {
        Swal.fire({
          icon: "error",
          text: "email/password invalid",
          confirmButtonText: "ok",
        });
      }
      setLoading("change");
    } catch (error) {
      setLoading("change");
      console.log(error);
    }
  };

  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Edit Profile</title>
      </Helmet>

      <NavWithBack />
      <h4 className="text-muted text-center mt-10 mb-2">Edit Profile</h4>
      <div className="py-2 px-1 lg:w-2/5 mx-auto">
        <form className="text-center" onSubmit={handleSubmit}>
          <div className="mt-4">
            <h1>Full name</h1>
            <input
              className="p-2 bg-green-400 w-full"
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
              className="p-2 bg-green-400 w-full"
              type="name"
              name="addressDetail"
              value={addressDetail}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <h1>Contact Number</h1>
            <input
              className="p-2 bg-green-400 w-full"
              type="number"
              name="contactNumber"
              value={contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <h1>Old Password</h1>
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
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
