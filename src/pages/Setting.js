import React from "react";
import { logout, useAuthDispatch, useAuthState } from "../hook";
import { useHistory } from "react-router-dom";
import back from "../images/icons/back.png";
import profile from "../images/ziva.jpeg";
const Setting = (props) => {
  const dispatch = useAuthDispatch();
  const user = useAuthState();
  console.log(user);

  let history = useHistory();

  function goBack() {
    history.goBack();
  }

  const handleLogout = () => {
    logout(dispatch);
    goBack();
  };
  return (
    <div className="h-screen">
      <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
        <div>
          <button onClick={goBack}>
            <img src={back} alt="back" width="30px" />
          </button>
        </div>
        <div></div>
        <div></div>
      </nav>

      <div>
        <div className="py-20">
          <div className="w-3/4 mx-auto">
            <img
              src={profile}
              alt="profile"
              // className="rounded-full h-44 w-44"
            />
          </div>
        </div>
        <h1 className="text-center font-bold">{user.user.fullName}</h1>
        <h2>Contact number: {user.user.contactNumber}</h2>
        <h2>
          Address: {user.user.Address ? user.user.Address : <h1>empty</h1>}
        </h2>
      </div>

      <div className="text-center">
        <button className="py-2 px-4 w-full">Change Password</button>
      </div>

      <div className="text-center">
        <button
          className="bg-red-600 py-2 px-4 w-full text-white"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Setting;
