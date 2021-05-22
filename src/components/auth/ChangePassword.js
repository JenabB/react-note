import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { logout, useAuthDispatch, useAuthState } from "../../hook";
import Swal from "sweetalert2";
import NavWithBack from "../NavWithBack";
import axios from "axios";
// import Modal from "react-modal";
import { useHistory } from "react-router-dom";

const ChangePassword = (props) => {
  const [data, setData] = useState({
    password: "",
    newPassword: "",
  });

  const [loading, setLoading] = useState("change");
  const { password, newPassword } = data;
  console.log("data", data);
  // const [isOpen, setIsOpen] = useState(false);

  const dispatch = useAuthDispatch();
  const user = useAuthState();

  let history = useHistory();

  // function goBack() {
  //   history.goBack(-3);
  // }
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  // const openModal = () => {
  //   setIsOpen(true);
  // };

  // const closeModal = () => {
  //   setIsOpen(false);
  // };

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
          console.log("result", result);
          logout(dispatch);
          history.push("/user");
          Swal.fire({
            icon: "success",
            text: result.data.message,
            confirmButtonText: "ok",
          });
        });

      // if (res) {

      //   props.history.push("/user");
      // } else {

      // }
      setLoading("change");
    } catch (error) {
      console.log(error.response);
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
              defaultValue={user.emailUser}
              placeholder={user.emailUser}
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

          <input type="submit" value={loading} />
          {/* <div className="my-5">
            <button
              onClick={openModal}
              className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg"
            >
              Change
            </button>
          </div> */}

          {/* <Modal isOpen={isOpen} onRequestClose={closeModal}>
            <div className="py-20">
              <h1 className="text-center text-2xl py-8">Change Password</h1>
              <div className="flex justify-center">
                <button className="text-white bg-blue-700 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 px-3 py-1 rounded-lg">
                  {loading}
                </button>
                <button
                  className="shadow-lg bg-gray-200 px-4 py-2 rounded"
                  onClick={closeModal}
                >
                  No
                </button>
              </div>
            </div>
          </Modal> */}
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
