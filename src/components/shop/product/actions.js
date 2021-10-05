import axios from "axios";

export const addProduct = async (productName, productPrice, shopId, token) => {
  await axios.post(
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
