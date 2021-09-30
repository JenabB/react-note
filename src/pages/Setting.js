import { useState } from "react";
import { logout, useAuthDispatch } from "../hook";
import { Link, useHistory } from "react-router-dom";
import profile from "../images/ziva.jpeg";
import Modal from "react-modal";
import Swal from "sweetalert2";
import NavWithBack from "../components/NavWithBack";
import UserProfile from "../components/auth/UserProfile";

const Setting = () => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useAuthDispatch();

  let history = useHistory();

  const handleLogout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        history.push("/");
        logout(dispatch);
      }
    });
  };

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };
  return (
    <div className="h-screen">
      <NavWithBack />

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
        <UserProfile />
      </div>
      <div className="bottom-0 w-screen">
        <div className="text-center">
          <Link to="/user/setting/update-profile">
            <button className="py-2 px-4 w-full">Update Profile</button>
          </Link>
        </div>
        <div className="text-center">
          <Link to="/user/setting/change-password">
            <button className="py-2 px-4 w-full">Change Password</button>
          </Link>
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
