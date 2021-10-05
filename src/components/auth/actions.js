import axios from "axios";

export const userProfile = async (token) => {
  return await axios.get(`https://svc-not-e.herokuapp.com/v1/user/profile`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (
  fullName,
  contactNumber,
  address,
  token
) => {
  return await axios.put(
    `https://svc-not-e.herokuapp.com/v1/user/profile`,
    {
      fullName: fullName,
      contactNumber: contactNumber,
      address: address,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const changePassword = async (email, password, newPassword) => {
  return await axios.put(
    `https://svc-not-e.herokuapp.com/v1/user/change-password/owner`,
    {
      email: email,
      password: password,
      newPassword: newPassword,
    }
  );
};
