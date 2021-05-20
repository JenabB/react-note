import React from "react";
import { logout, useAuthDispatch, useAuthState } from "../hook";
import { useHistory } from "react-router-dom";
import back from "../images/icons/back.png";
import profile from "../images/profile.jpg";
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
        <div className="text-center">
          <img src={profile} alt="profile" className="w-screen" />
        </div>
        <h1 className="text-center font-bold">{user.user.fullName}</h1>
        <h2>Contact number: {user.user.contactNumber}</h2>
        <h2>
          Address: {user.user.Address ? user.user.Address : <h1>empty</h1>}
        </h2>
      </div>

      <button>Change Password</button>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Setting;
