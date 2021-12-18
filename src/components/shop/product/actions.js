import axios from "axios";
const host = "https://svc-not-e.herokuapp.com/v1";

export const getProducts = async (shopId, token) => {
  const url = `https://svc-not-e.herokuapp.com/v1/shop/${shopId}/product`;
  return axios.get(url, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};

export const addProduct = async (productName, productPrice, shopId, token) => {
  return await axios.post(
    `${host}/shop/${shopId}/product`,
    {
      productName: productName,
      productPrice: productPrice,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const editProduct = async (
  productName,
  productPrice,
  shopId,
  productId,
  token
) => {
  return await axios.put(
    `${host}/shop/${shopId}/product/${productId}`,
    {
      productName: productName,
      productPrice: productPrice,
    },
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const deleteProduct = async (shopId, productId, token) => {
  return await axios.delete(`${host}/shop/${shopId}/product/${productId}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
};
