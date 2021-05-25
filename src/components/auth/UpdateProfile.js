import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useHistory } from "react-router-dom";
import { useAuthState } from "../../hook";
import Swal from "sweetalert2";
import NavWithBack from "../NavWithBack";
import axios from "axios";

const UpdateProfile = () => {
  const user = useAuthState();
  const [data, setData] = useState({
    fullName: user.userProfile.fullName,
    contactNumber: user.userProfile.contactNumber,
    address: user.userProfile.address,
  });

  let history = useHistory();
  function goBack() {
    history.goBack();
  }

  const [loading, setLoading] = useState("update");
  const { fullName, contactNumber, address } = data;

 
console.log(data)
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    try {
      await axios
        .put(
          `https://svc-not-e.herokuapp.com/v1/user/profile`,
          {
            fullName: fullName,
            contactNumber: contactNumber,
            address: address,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
          }
        )
        .then((result) => {
          Swal.fire({
            icon: "success",
            text: result.data.message,
            confirmButtonText: "ok",
          });
          goBack();
        });
      setLoading("update");
    } catch (error) {
      setLoading("update");
      if (error.response.data.status === 401) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
        history.push("/user/login");
      } else {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
      }
    }
  };

  return (
    <div className="">
      <Helmet>
        <meta charSet="utf-8" />
        <title>Update Profile</title>
      </Helmet>

      <NavWithBack />
      <h4 className="text-muted text-center mt-10 mb-2">Update Profile</h4>
      <div className="py-2 px-1 lg:w-2/5 mx-auto">
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
              type="name"
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
    </div>
  );
};

export default UpdateProfile;
