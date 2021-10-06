import axios from "axios";

export const addProduct = async (productName, productPrice, shopId, token) => {
  return await axios.post(
    `https://svc-not-e.herokuapp.com/v1/shop/${shopId}/product`,
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
    `https://svc-not-e.herokuapp.com/v1/shop/${shopId}/product/${productId}`,
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
  return await axios.delete(
    `https://svc-not-e.herokuapp.com/v1/shop/${shopId}/product/${productId}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }
  );
};
