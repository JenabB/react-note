import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useAuthState } from "../../hook";
// import Swal from "sweetalert2";
import NavWithBack from "../NavWithBack";
import axios from "axios";
import Modal from "react-modal";

const UpdateProfile = (props) => {
  const [data, setData] = useState({
    fullName: "",
    contactNumber: "",
  });

  const [loading, setLoading] = useState("change");
  const { fullName, contactNumber } = data;
  const [isOpen, setIsOpen] = useState(false);

  const user = useAuthState();

  console.log(user);
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading("loading...");
    try {
      await axios
        .put(`https://svc-not-e.herokuapp.com/v1/user/change-password/owner`, {
          fullName: fullName,
          contactNumber: contactNumber,
        })
        .then((result) => {
          console.log("result", result);
          localStorage.removeItem("token");
          props.history.push("/user/login");
        });

      // if (res) {
      //   Swal.fire({
      //     icon: "success",
      //     text: "login success",
      //     confirmButtonText: "ok",
      //   });
      //   props.history.push("/user");
      // } else {
      //   Swal.fire({
      //     icon: "error",
      //     text: "email/password invalid",
      //     confirmButtonText: "ok",
      //   });
      // }
      setLoading("change");
    } catch (error) {
      setLoading("change");
      console.log(error.response);
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
              className="p-2 placeholder-black bg-green-400 w-full"
              type="name"
              placeholder={` old: ${user.user.fullName}`}
              name="fullName"
              value={fullName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mt-4">
            <h1>Contact Number</h1>
            <input
              className="p-2 placeholder-black bg-green-400 w-full"
              type="number"
              placeholder={` old: ${user.user.contactNumber}`}
              name="contactNumber"
              value={contactNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="my-5">
            <button
              onClick={openModal}
              className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
            >
              Change
            </button>
          </div>

          <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <div className="py-20">
              <h1 className="text-center text-2xl py-8">Change Password</h1>
              <div className="flex justify-center">
                <input
                  type="submit"
                  value={loading}
                  className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
                />
                <button
                  className="shadow-lg bg-gray-200 px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  No
                </button>
              </div>
            </div>
          </Modal>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
