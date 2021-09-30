import { useEffect } from "react";
import axios from "axios";
import { useAuthDispatch, useAuthState } from "../../hook";

const UserProfile = () => {
  const dispatch = useAuthDispatch();
  const user = useAuthState();

  useEffect(() => {
    axios
      .get(`https://svc-not-e.herokuapp.com/v1/user/profile`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      })
      .then((result) => {
        dispatch({ type: "GET_USER_PROFILE", payload: result.data.data });
      });
  });

  return (
    <div>
      <h1 className="text-center text-2xl text-blue-600 mb-8 font-bold">
        {user.userProfile.fullName}
      </h1>
      <div className="w-3/4 mx-auto">
        <h1>Contact number</h1>
        <p className="text-gray-400">{user.userProfile.contactNumber}</p>
        <h1 className="mt-4">Address</h1>
        <p className="text-gray-400">{user.userProfile.address}</p>
      </div>
    </div>
  );
};

export default UserProfile;
