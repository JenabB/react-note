import React, { useState } from "react";
import { useAuthState } from "../../../hook";
import { editProduct } from "./actions";
import NavWithBack from "../../NavWithBack";
import { useNavigate } from "react-router-dom";

import { handleSuccess, handleError } from "../../../utils/responseHandler";
import { formInput } from "../../../theme/formInput";

const EditProductModal = ({ open, handleEditClose }) => {
  const user = useAuthState();
  const [productName, setProductName] = useState(
    user.selectedProduct.productName
  );
  const [productPrice, setProductPrice] = useState(
    user.selectedProduct.productPrice
  );
  let navigate = useNavigate();

  const handleNameChange = (e) => {
    setProductName(e.target.value);
  };

  const handlePriceChange = (e) => {
    setProductPrice(e.target.value);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const res = await editProduct(
        productName,
        productPrice,
        user.shopId,
        user.selectedProduct.productId,
        user.token
      );

      handleSuccess(res);
      handleEditClose();
    } catch (error) {
      if (error.response.data.status === 401) {
        handleError(error);
      } else {
        handleError(error);
      }
    }
  };

  return (
    <>
      {open && (
        <div className="modal absolute bg-white shadow-lg p-4 rounded-l">
          <div className="text-right">
            <button
              className="bg-red-400 px-3 py-1 rounded-lg text-white"
              onClick={handleEditClose}
            >
              X
            </button>
          </div>
          <div className="mt-10 text-center">
            <h1>Edit Product</h1>
            <form className="mt-10" onSubmit={handleUpdate}>
              <h1>Product Name</h1>
              <input
                type="text"
                className={formInput}
                value={productName}
                onChange={handleNameChange}
                required
              />
              <h1>Product Price</h1>
              <input
                type="number"
                className={formInput}
                value={productPrice}
                onChange={handlePriceChange}
                required
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
      )}
    </>
  );
};

export default EditProductModal;
