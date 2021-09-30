import { Link, useHistory } from "react-router-dom";
//components
import profile from "../images/ziva.jpeg";
import NavWithBack from "../components/NavWithBack";
import UserProfile from "../components/auth/UserProfile";

//lib
import Swal from "sweetalert2";

//context
import { logout, useAuthDispatch } from "../hook";

const Setting = () => {
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
            className="bg-red-600 py-2 px-4 rounded-lg text-white"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Setting;
