import axios from "axios";

export const getUserProfile = async (token) => {
  return await axios.get(`https://svc-not-e.herokuapp.com/v1/user/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
