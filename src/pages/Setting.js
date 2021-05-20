import { useState } from "react";
import { logout, useAuthDispatch, useAuthState } from "../hook";
import { useHistory } from "react-router-dom";
import back from "../images/icons/back.png";
import profile from "../images/ziva.jpeg";
import Modal from "react-modal";

const Setting = () => {
  const [isOpen, setIsOpen] = useState(false);
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

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="h-screen">
      <nav className="sticky top-0 z-10 shadow-lg flex justify-between bg-blue-700 text-white p-4">
        <div>
          <button onClick={goBack}>
            <img src={back} alt="back" width="18px" />
          </button>
        </div>
        <div></div>
        <div></div>
      </nav>

      <div className="pb-20">
        <div className="lg:grid grid-cols-3 ">
          <div></div>
          <div className="py-12 px-12">
            <img
              src={profile}
              alt="profile"
              height="100px"
              className="profile-picture"
            />
          </div>
          <div></div>
        </div>
        <h1 className="text-center font-bold">{user.user.fullName}</h1>
        <h2>Contact number: {user.user.contactNumber}</h2>
        <h2>
          Address: {user.user.Address ? user.user.Address : <h1>empty</h1>}
        </h2>
      </div>
      <div className="fixed bottom-0 w-screen">
        <div className="text-center">
          <button className="py-2 px-4 w-full">Change Password</button>
        </div>

        <div className="text-center">
          <button
            className="bg-red-600 py-2 px-4 w-full text-white"
            onClick={openModal}
          >
            Logout
          </button>
        </div>
      </div>

      <Modal isOpen={isOpen} onRequestClose={closeModal}>
        <div className="py-20">
          <h1 className="text-center text-2xl py-8">Logout?</h1>
          <div className="flex justify-center">
            <button
              className="bg-red-600 text-white mx-1 px-4 py-2 rounded"
              onClick={handleLogout}
            >
              Yes
            </button>
            <button
              className="shadow-lg bg-gray-200 px-4 py-2 rounded"
              onClick={closeModal}
            >
              No
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Setting;
