import axios from "axios";

const host = "https://svc-not-e.herokuapp.com/v1";
const token = JSON.parse(localStorage.getItem("token"));

export const getInvoices = async (shopId) => {
  return axios.get(`${host}/shop/${shopId}/invoice`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const getOneInvoice = async (shopId, invoiceId) => {
  return axios.get(`${host}/shop/${shopId}/invoice/${invoiceId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const deleteInvoice = async (shopId, invoiceId) => {
  return await axios.delete(`${host}/shop/${shopId}/invoice/${invoiceId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
