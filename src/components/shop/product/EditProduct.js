import React, { useState } from "react";
import { useAuthState } from "../../../hook";
import axios from "axios";
import NavWithBack from "../../NavWithBack";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";

const EditProduct = () => {
  const user = useAuthState();
  const [productName, setProductName] = useState(
    user.selectedProduct.productName
  );
  const [productPrice, setProductPrice] = useState(
    user.selectedProduct.productPrice
  );
  let history = useHistory();

  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.put(
        `https://svc-not-e.herokuapp.com/v1/shop/${user.shopId}/product/${user.selectedProduct.productId}`,
        {
          productName: productName,
          productPrice: productPrice,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        }
      );

      Swal.fire({
        icon: "success",
        text: res.data.message,
        confirmButtonText: "ok",
      });
      history.goBack();
    } catch (error) {
      if (error.response.data.status === 401) {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
      } else {
        Swal.fire({
          icon: "error",
          text: error.response.data.message,
          confirmButtonText: "ok",
        });
      }
    }
  };

  return (
    <div>
      <NavWithBack />
      <div className="mt-10 text-center">
        <h1>Edit Product</h1>
        <form className="mt-10" onSubmit={handleUpdate}>
          <h1>Product Name</h1>
          <input
            type="text"
            className="bg-gray-100 px-2 py-1 rounded-lg mt-4 mb-8"
            value={productName}
            onChange={handleNameChange}
          />
          <h1>Product Price</h1>
          <input
            type="number"
            className="bg-gray-100 px-2 py-1 rounded-lg mb-8 mt-4"
            value={productPrice}
            onChange={handlePriceChange}
          />
          <br />
          <button
            type="submit"
            className="bg-blue-600 px-3 py-2 rounded-lg text-white"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProduct;
