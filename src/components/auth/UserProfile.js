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
      <h1 className="text-center font-bold">{user.userProfile.fullName}</h1>
      <div className="w-3/4 mx-auto">
        <h2>Contact number: {user.userProfile.contactNumber}</h2>
        <h2>Address: {user.userProfile.address}</h2>
      </div>
    </div>
  );
};

export default UserProfile;
